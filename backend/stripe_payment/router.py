
from typing import Annotated
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException, Request, responses
import stripe
from authentication.schemas import UserOut
from authentication.validation import get_current_active_auth_user
from services.user_service import UserService, get_user_service
from database.models import Course, Payment, User
from course.schemas import CourseOutput
from database.database import session_getter
from services.course_service import CourseService, get_course_service
from config import BASE_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
from sqlalchemy.orm import selectinload
from stripe_payment.schemas import PaymentOutput
from authentication.custom_exceptions import not_enough_rights_exception


router = APIRouter(
    prefix="/stripe",
    tags=["Stripe Operations"],
)

stripe.api_key = STRIPE_SECRET_KEY


@router.get("/buy/course/{course_id}/")
async def buy_course(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    course_id: int,
    # user: Annotated[UserOut, Depends(get_current_active_auth_user)],
):
    course: Course = await session.get(Course, course_id)
    # course: CourseOutput = await course_service.get_course_by_id(
    #     session=session,
    #     course_id=course_id,
    #     user=user
    # )

    checkout_session = stripe.checkout.Session.create(
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": course.title,
                    },
                    "unit_amount": course.price * 100,
                },
                "quantity": 1,
            }
        ],
        # metadata={
        #     "user_id": user.id,
        #     "email": user.email,
        #     "course_id": course_id
        # },
        metadata={
            "user_id": 28,
            "email": "user1@example.com",
            "course_id": course_id
        },
        mode="payment",
        success_url=BASE_URL + "/success/",
        cancel_url=BASE_URL + "/cancel/",
        customer_email="user1@example.com"
    )

    return responses.RedirectResponse(checkout_session.url, status_code=303)

@router.post("/success/")
async def stripe_success(
    request: Request,
    session: Annotated[AsyncSession, Depends(session_getter)],
    course_service: Annotated[CourseService, Depends(get_course_service)],
    user_service: Annotated[UserService, Depends(get_user_service)],
):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        # Верификация Stripe события (замени на свой секретный ключ webhook)
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        # Недопустимый payload
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        # Недопустимая подпись
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Обработка события
    if event["type"] == "checkout.session.completed":
        checkout_session = event["data"]["object"]

        user_id = int(checkout_session["metadata"]["user_id"])
        user_email = checkout_session["metadata"]["email"]
        course_id = int(checkout_session["metadata"]["course_id"])
        order_id = checkout_session["id"]
        payment_intent = checkout_session["payment_intent"]

        # Получение курса по его ID
        course: Course = await session.get(
            Course, 
            course_id, 
            options=(
                selectinload(Course.students),
            )
        )

        if not course:
            raise HTTPException(status_code=404, detail="Course not found")

        # Получение пользователя
        user: User = await session.get(User, user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Добавление пользователя к курсу (ManyToMany связь)
        course.students.append(user)

        # Создание платежа в бд
        payment: Payment = Payment(
            user_id=user_id,
            email=user_email,
            course_id=course_id,
            order_id=order_id,
            intent=payment_intent,
        )
        session.add(payment)
        await session.commit()
        # TODO: send email in background task

    return {"status": "success", "message": "User added to course"}


@router.get("/all/payments/", response_model=list[PaymentOutput])
async def get_all_payments(
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
) -> list[PaymentOutput]:
    if not user.admin:
        raise not_enough_rights_exception
    stmt = select(Payment).order_by(Payment.id)
    payments: list[Payment] = await session.scalars(stmt)
    return payments
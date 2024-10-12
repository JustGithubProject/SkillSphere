import smtplib
import logging
from authentication.schemas import UserOut
from authentication.custom_exceptions import not_enough_rights_exception
from config import SMTP_USER, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT
from email.message import EmailMessage


async def check_is_user_a_course_staff(
    user: UserOut,
    instructors: list,
    creator_id: int
) -> bool:
    if not (
        user.admin  
        or user.id == creator_id  
        or user.id in [instructor.id for instructor in instructors]
    ):
        raise not_enough_rights_exception
    return True


def generate_email_template(subject: str, recipient_email: str, body: str) -> EmailMessage:
    email_message = EmailMessage()
    email_message['Subject'] = subject
    email_message['From'] = SMTP_USER
    email_message['To'] = recipient_email
    email_message.set_content(body, subtype='html')
    return email_message


def get_dashboard_email_body(code: str) -> str:
    return f'''
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <p>Спасибо за регистрацию в нашем приложении.</p>
            <p>Ваш код подтверждения регистрации:</p>
            <h2 style="color: #4CAF50;">{code}</h2>
            <p>Введите этот код, чтобы завершить процесс регистрации.</p>
            <p>Если вы не регистрировались у нас, просто проигнорируйте это письмо.</p>
            <br>
            <p>С уважением,<br>Команда SkillSphere</p>
        </div>
    '''


def get_thank_you_email_body(course_name: str) -> str:
    return f'''
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <p>Здравствуйте,</p>
            <p>Спасибо за покупку курса <strong>{course_name}</strong>!</p>
            <p>Мы рады, что вы выбрали наш образовательный продукт. Надеемся, что курс принесет вам много пользы и новых знаний.</p>
            <p>Если у вас возникнут вопросы или предложения, не стесняйтесь обращаться к нам.</p>
            <br>
            <p>С уважением,<br>Команда SkillSphere</p>
        </div>
    '''

def get_code_url_email_body(urL_code: str) -> str:
    return f'''
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <p>Здравствуйте,</p>
            <p>Перейдите по уникальной ссылке для сброса пароля <strong><a href="http://localhost:3000/change-password/{urL_code}">Сменить Пароль</a></strong>! Если вы не хотите сбрасывать свой пароль, просто проигнорируйте это письмо.</p>
            <p>Обратите внимание, что данная ссылка доступна 10 минут.</p>
            <p>Если у вас возникнут вопросы или предложения, не стесняйтесь обращаться к нам.</p>
            <br>
            <p>С уважением,<br>Команда SkillSphere</p>
        </div>
    '''


async def send_email(recipient_email: str, subject: str, body: str):
    email_message = generate_email_template(subject, recipient_email, body)
    try:
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(email_message)
        logging.info(f"Email sent to {recipient_email}")
    except Exception as e:
        logging.error(f"Failed to send email to {recipient_email}: {e}")


async def send_code(email: str, code: str):
    subject = "Подтверждение электронной почты"
    body = get_dashboard_email_body(code)
    await send_email(email, subject, body)


async def send_thank_you(email: str, course_name: str):
    subject = "Спасибо за покупку курса!"
    body = get_thank_you_email_body(course_name)
    await send_email(email, subject, body)


async def send_url_code(email: str, url_code: str):
    subject = "Cброс пароля"
    body = get_code_url_email_body(url_code)
    await send_email(email, subject, body)



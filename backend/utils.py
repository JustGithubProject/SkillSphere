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


def get_email_template_dashboard(email, code):
    email_message = EmailMessage()
    email_message['Subject'] = 'Подтверждение електронной почты'
    email_message['From'] = SMTP_USER
    email_message['TO'] = email

    email_message.set_content(
        f'''
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <p>Спасибо за регистрацию в нашем приложении.</p>
            <p>Ваш код подтверждения регистрации:</p>
            <h2 style="color: #4CAF50;">{code}</h2>
            <p>Введите этот код, чтобы завершить процесс регистрации.</p>
            <p>Если вы не регистрировались у нас, просто проигнорируйте это письмо.</p>
            <br>
            <p>С уважением,<br>Команда SkillSphere</p>
        </div>
        ''',
        subtype='html'
    )
    return email_message


async def send_code(email, code):
    # Логика отправки письма
    email_message = get_email_template_dashboard(email, code)
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(email_message)
    logging.info(f"Sending email to {email}")
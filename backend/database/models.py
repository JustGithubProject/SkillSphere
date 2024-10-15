from datetime import datetime
from sqlalchemy import (
    TIMESTAMP, 
    Boolean,
    CheckConstraint,
    ForeignKey,
    LargeBinary, 
    String,
    UniqueConstraint, 
    func,
    Text
)
from sqlalchemy.orm import (
    Mapped,
    DeclarativeBase,
    declared_attr,
    mapped_column,
    relationship,
)

from course.enums import Category
from course.enums import CourseLevel, Category

class Base(DeclarativeBase):
    __abstract__ = True

    id: Mapped[int] = mapped_column(primary_key=True)

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
    

class User(Base):
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password_hash: Mapped[bytes] = mapped_column(LargeBinary)
    first_name: Mapped[str]
    last_name: Mapped[str]
    admin: Mapped[bool] = mapped_column(Boolean, default=False, server_default='false')
    date_joined: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    last_login: Mapped[datetime] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now())
    active: Mapped[bool] = mapped_column(Boolean, default=True, server_default='true')
    
    courses_created = relationship('Course', back_populates='creator')
    courses_instructed = relationship(
        'Course',
        secondary='course_instructors',
        back_populates='instructors',
    )
    comments = relationship("Comment", back_populates="user")
    courses = relationship('Course', secondary='course_students', back_populates='students')

    __table_args__ = (
        UniqueConstraint("username", "first_name", "last_name", name="idx_unique_user_first_last_names"),
    )

class Course(Base):
    title: Mapped[str] = mapped_column(Text, unique=True)
    description: Mapped[str]
    video_url: Mapped[str | None]
    photo_url: Mapped[str | None]
    price: Mapped[int]
    level: Mapped["CourseLevel"] = mapped_column(default=CourseLevel.BEGINNER)
    category: Mapped["Category"]
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    is_published = mapped_column(Boolean, default=False, server_default='false')

    creator_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    creator = relationship('User', back_populates='courses_created')
    instructors = relationship(
        'User',
        secondary='course_instructors',
        back_populates='courses_instructed',
    )
    students = relationship('User', secondary='course_students', back_populates='courses')
    modules = relationship('Module', back_populates="course")
    comments = relationship('Comment', back_populates="course")

    __table_args__ = (
        CheckConstraint("price >= 0", name="check_positive_price"),
    )


# Таблица связи курсов и учащихся
class CourseStudents(Base):
    __tablename__ = 'course_students'
    
    course_id: Mapped[int] = mapped_column(ForeignKey('course.id'))
    student_id: Mapped[int] = mapped_column(ForeignKey('user.id'))


# Таблица связи курсов и инструкторов
class CourseInstructor(Base):
    __tablename__ = 'course_instructors'
    
    course_id: Mapped[int] = mapped_column(ForeignKey('course.id'))
    instructor_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    

class Module(Base):
    title: Mapped[str] = mapped_column(Text, unique=True)
    description: Mapped[str | None]
    course_id: Mapped[int] = mapped_column(ForeignKey('course.id'))

    course = relationship('Course', back_populates="modules")
    lessons: Mapped[list["Lesson"]] = relationship("Lesson", back_populates="module")


class Lesson(Base):
    title: Mapped[str] = mapped_column(unique=True)
    description: Mapped[str | None]
    module_id: Mapped[int] = mapped_column(ForeignKey('module.id'))

    module = relationship('Module', back_populates='lessons')
    steps = relationship('Step', back_populates="lesson")


class Step(Base):
    video_path: Mapped[str | None]
    text: Mapped[str]
    lesson_id: Mapped[int] = mapped_column(ForeignKey('lesson.id'))

    test = relationship('Test', back_populates="step", uselist=False)
    lesson = relationship('Lesson', back_populates='steps')


class Test(Base):
    count_correct_answers: Mapped[int] = mapped_column(default=1, server_default='1')
    step_id: Mapped[int] = mapped_column(ForeignKey('step.id'), unique=True)
    step = relationship('Step', back_populates='test')

    answers = relationship('Answer', back_populates="test")


class Answer(Base):
    text: Mapped[str]
    is_correct: Mapped[bool] = mapped_column(default=False, server_default="false")
    test_id: Mapped[int] = mapped_column(ForeignKey("test.id"))
    
    test = relationship('Test', back_populates='answers')


class ContactUs(Base):
    full_name: Mapped[str] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(String(30))
    message: Mapped[str] = mapped_column(String(200))
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    is_checked = mapped_column(Boolean, default=False, server_default='false')


class Comment(Base):    
    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(String(200))
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    course_id: Mapped[int] = mapped_column(ForeignKey('course.id'))
    parent_id: Mapped[int] = mapped_column(ForeignKey('comment.id'), nullable=True)  # Самоссылка на родительский комментарий
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    
    course = relationship("Course", back_populates="comments")
    user = relationship("User", back_populates="comments")
    # Самоссылочная связь: комментарий может иметь родителя
    # parent = relationship("Comment", remote_side=[id], backref=backref("replies", cascade="all, delete-orphan"))
    parent = relationship("Comment", remote_side=[id], back_populates="replies")
    replies = relationship("Comment", back_populates="parent", cascade="all, delete-orphan")


class Payment(Base):
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    email: Mapped[str]
    course_id: Mapped[int] = mapped_column(ForeignKey("course.id"))
    order_id: Mapped[str]
    intent: Mapped[str]
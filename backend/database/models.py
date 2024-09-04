from datetime import datetime
from sqlalchemy import (
    TIMESTAMP, 
    Boolean, 
    ForeignKey, 
    LargeBinary, 
    String, 
    UniqueConstraint, 
    func
)
from sqlalchemy.orm import (
    Mapped,
    DeclarativeBase,
    declared_attr,
    mapped_column,
    relationship,
)

from enums import CourseLevel, Role

class Base(DeclarativeBase):
    __abstract__ = True

    id: Mapped[int] = mapped_column(primary_key=True)

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
    

class User(Base):
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str]
    password_hash: Mapped[bytes] = mapped_column(LargeBinary)
    first_name: Mapped[str]
    last_name: Mapped[str]
    role: Mapped["Role"] = mapped_column(default=Role.GUEST)
    date_joined: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    last_login: Mapped[datetime]
    active: Mapped[bool] = mapped_column(Boolean, default=True, server_default='true')

    courses_created = relationship('Course', back_populates='creator')
    courses_instructed = relationship('Course', secondary='course_instructors', back_populates='instructors')

    __table_args__ = (
        UniqueConstraint("first_name", "last_name"),
    )

class Course(Base):
    title: Mapped[str] = mapped_column(String(50), unique=True)
    description: Mapped[str]
    price: Mapped[int]
    level: Mapped["CourseLevel"] = mapped_column(default=CourseLevel.BEGINNER)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    creator_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    creator = relationship('User', back_populates='courses_created')
    instructors = relationship('User', secondary='course_instructors', back_populates='courses_instructed')


# Таблица связи курсов и инструкторов
class CourseInstructor(Base):
    __tablename__ = 'course_instructors'
    
    course_id: Mapped[int] = ForeignKey('courses.id')
    instructor_id: Mapped[int] = ForeignKey('users.id')
    
    # Указываем обратные связи (не обязательно, но полезно)
    course = relationship('Course', back_populates='instructors')
    instructor = relationship('User', back_populates='courses_instructed')

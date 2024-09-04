from datetime import datetime
from sqlalchemy import TIMESTAMP, Boolean, LargeBinary, UniqueConstraint, func
from sqlalchemy.orm import (
    Mapped,
    DeclarativeBase,
    declared_attr,
    mapped_column,
)

from enums import Role

class Base(DeclarativeBase):
    __abstract__ = True

    id: Mapped[int] = mapped_column(primary_key=True)

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
    

class User(Base):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str]
    password_hash: Mapped[bytes] = mapped_column(LargeBinary)
    first_name: Mapped[str]
    last_name: Mapped[str]
    role: Mapped["Role"] = mapped_column(default=Role.GUEST)
    date_joined: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    last_login: Mapped[datetime]
    active: Mapped[bool] = mapped_column(Boolean, default=True, server_default='true')

    __table_args__ = (
        UniqueConstraint("first_name", "last_name"),
    )
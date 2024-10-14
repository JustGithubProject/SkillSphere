"""new field

Revision ID: 973b71f25d0f
Revises: 76693859f29c
Create Date: 2024-10-14 07:08:27.387461

"""

from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "973b71f25d0f"
down_revision: Union[str, None] = "76693859f29c"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### создание типа ENUM ###
    category_enum = sa.Enum(
        "WEB_DESIGN",
        "DEVELOPMENT",
        "GAME_DESIGN",
        "APPS_DESIGN",
        "MARKETING",
        "RESEARCH",
        "CONTENT_WRITING",
        "SEO",
        name="category"
    )
    category_enum.create(op.get_bind(), checkfirst=True)

    # ### создание таблицы course ###
    op.create_table(
        "course",
        sa.Column("title", sa.String(length=50), nullable=False),
        sa.Column("description", sa.String(), nullable=False),
        sa.Column("price", sa.Integer(), nullable=False),
        sa.Column(
            "level",
            sa.Enum("BEGINNER", "INTERMEDIATE", "ADVANCED", name="courselevel"),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.TIMESTAMP(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("creator_id", sa.Integer(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["creator_id"],
            ["user.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("title"),
    )

    # ### добавление колонки category ###
    op.add_column(
        "course",
        sa.Column("category", category_enum, nullable=False),
    )


def downgrade() -> None:
    # ### удаление колонки category ###
    op.drop_column("course", "category")

    # ### удаление типа ENUM ###
    category_enum = sa.Enum(
        "WEB_DESIGN",
        "DEVELOPMENT",
        "GAME_DESIGN",
        "APPS_DESIGN",
        "MARKETING",
        "RESEARCH",
        "CONTENT_WRITING",
        "SEO",
        name="category"
    )
    category_enum.drop(op.get_bind(), checkfirst=True)

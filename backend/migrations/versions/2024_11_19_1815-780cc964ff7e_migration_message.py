"""Migration message

Revision ID: 780cc964ff7e
Revises: 
Create Date: 2024-11-19 18:15:24.483220

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "780cc964ff7e"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.add_column('course', sa.Column('owner_paypal_email', sa.String(), nullable=True))


def downgrade():
    op.drop_column('course', 'owner_paypal_email')
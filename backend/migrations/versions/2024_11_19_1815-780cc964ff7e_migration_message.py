"""Migration message

Revision ID: 780cc964ff7e
Revises: 
Create Date: 2024-11-19 18:15:24.483220
"""

from typing import Sequence, Union
from datetime import datetime
from alembic import op
import sqlalchemy as sa
from sqlalchemy import (
    TIMESTAMP, 
    Boolean,
    CheckConstraint,
    ForeignKey,
    LargeBinary, 
    String,
    UniqueConstraint, 
    Text,
    Integer
)
from course.enums import Category
from course.enums import CourseLevel

# revision identifiers, used by Alembic.
revision: str = "780cc964ff7e"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Create User table
    op.create_table(
        'user',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('username', sa.String(), unique=True),
        sa.Column('email', sa.String(), unique=True),
        sa.Column('password_hash', sa.LargeBinary()),
        sa.Column('first_name', sa.String(), nullable=False),
        sa.Column('last_name', sa.String(), nullable=False),
        sa.Column('admin', sa.Boolean(), default=False, server_default='false'),
        sa.Column('date_joined', sa.TIMESTAMP(), server_default=sa.func.now()),
        sa.Column('last_login', sa.TIMESTAMP(), default=sa.func.now(), server_default=sa.func.now()),
        sa.Column('active', sa.Boolean(), default=True, server_default='true')
    )

    # Create Course table
    op.create_table(
        'course',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('title', sa.Text(), unique=True),
        sa.Column('description', sa.String(), nullable=False),
        sa.Column('video_url', sa.String(), nullable=True),
        sa.Column('photo_url', sa.String(), nullable=True),
        sa.Column('owner_paypal_email', sa.String(), nullable=True),
        sa.Column('price', sa.Integer(), nullable=False),
        sa.Column('level', sa.Enum(CourseLevel), default=CourseLevel.BEGINNER),
        sa.Column('category', sa.Enum(Category), nullable=False),
        sa.Column('created_at', sa.TIMESTAMP(), server_default=sa.func.now()),
        sa.Column('updated_at', sa.TIMESTAMP(), server_default=sa.func.now(), onupdate=sa.func.now()),
        sa.Column('is_published', sa.Boolean(), default=False, server_default='false'),
        sa.Column('creator_id', sa.Integer(), sa.ForeignKey('user.id')),
    )
    op.create_foreign_key('fk_course_user', 'course', 'user', ['creator_id'], ['id'])
    op.create_check_constraint("check_positive_price", 'course', sa.text('price >= 0'))

    # Create CourseStudents table
    op.create_table(
        'course_students',
        sa.Column('course_id', sa.Integer(), sa.ForeignKey('course.id')),
        sa.Column('student_id', sa.Integer(), sa.ForeignKey('user.id'))
    )

    # Create CourseInstructor table
    op.create_table(
        'course_instructors',
        sa.Column('course_id', sa.Integer(), sa.ForeignKey('course.id')),
        sa.Column('instructor_id', sa.Integer(), sa.ForeignKey('user.id'))
    )

    # Create Module table
    op.create_table(
        'module',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('title', sa.Text(), unique=True),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('course_id', sa.Integer(), sa.ForeignKey('course.id'))
    )

    # Create Lesson table
    op.create_table(
        'lesson',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('title', sa.String(), unique=True),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('module_id', sa.Integer(), sa.ForeignKey('module.id'))
    )

    # Create Step table
    op.create_table(
        'step',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('video_path', sa.String(), nullable=True),
        sa.Column('text', sa.String(), nullable=False),
        sa.Column('lesson_id', sa.Integer(), sa.ForeignKey('lesson.id'))
    )

    # Create Test table
    op.create_table(
        'test',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('count_correct_answers', sa.Integer(), default=0, server_default='0'),
        sa.Column('step_id', sa.Integer(), sa.ForeignKey('step.id'), unique=True)
    )
    op.create_check_constraint("check_positive_count_correct_answers", 'test', sa.text('count_correct_answers >= 0'))

    # Create Answer table
    op.create_table(
        'answer',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('text', sa.String(), nullable=False),
        sa.Column('is_correct', sa.Boolean(), default=False, server_default='false'),
        sa.Column('test_id', sa.Integer(), sa.ForeignKey('test.id'))
    )

    # Create ContactUs table
    op.create_table(
        'contact_us',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('full_name', sa.String(50), nullable=False),
        sa.Column('email', sa.String(30), nullable=False),
        sa.Column('message', sa.String(200), nullable=False),
        sa.Column('created_at', sa.TIMESTAMP(), server_default=sa.func.now()),
        sa.Column('is_checked', sa.Boolean(), default=False, server_default='false')
    )

    # Create Comment table
    op.create_table(
        'comment',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('content', sa.String(200), nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('user.id')),
        sa.Column('course_id', sa.Integer(), sa.ForeignKey('course.id')),
        sa.Column('parent_id', sa.Integer(), sa.ForeignKey('comment.id'), nullable=True),
        sa.Column('created_at', sa.TIMESTAMP(), server_default=sa.func.now()),
        sa.Column('updated_at', sa.TIMESTAMP(), server_default=sa.func.now(), onupdate=sa.func.now())
    )
    op.create_foreign_key('fk_comment_user', 'comment', 'user', ['user_id'], ['id'])
    op.create_foreign_key('fk_comment_course', 'comment', 'course', ['course_id'], ['id'])
    op.create_foreign_key('fk_comment_parent', 'comment', 'comment', ['parent_id'], ['id'])

    # Create Payment table
    op.create_table(
        'payment',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('user.id')),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('course_id', sa.Integer(), sa.ForeignKey('course.id')),
        sa.Column('order_id', sa.String(), nullable=False),
        sa.Column('intent', sa.String(), nullable=False)
    )


def downgrade():
    op.drop_table('payment')
    op.drop_table('comment')
    op.drop_table('contact_us')
    op.drop_table('answer')
    op.drop_table('test')
    op.drop_table('step')
    op.drop_table('lesson')
    op.drop_table('module')
    op.drop_table('course_instructors')
    op.drop_table('course_students')
    op.drop_table('course')
    op.drop_table('user')


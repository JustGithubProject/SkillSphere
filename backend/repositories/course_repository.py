from fastapi import HTTPException, status
from sqlalchemy import exists, select
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, or_, select
from course.schemas import CourseInput, CourseUpdate
from database.models import Course, Lesson, Module, Step, Test, User


class CourseRepository:
    async def search_courses(
        self,
        session: AsyncSession,
        is_free: bool = False,
        search: str | None = None
    ):
        # Начинаем построение запроса
        query = select(Course).options(
            selectinload(Course.instructors),  # Загрузка инструкторов
            selectinload(Course.creator),      # Загрузка создателя курса
            selectinload(Course.modules).selectinload(Module.lessons).selectinload(Lesson.steps).joinedload(Step.test).selectinload(Test.answers)       # Загрузка модулей курса
        )

        # Поиск по полю title и description
        if search:
            search_term = f"%{search.lower()}%"
            query = query.where(
                or_(
                    func.lower(Course.title).like(search_term),
                    func.lower(Course.description).like(search_term)
                )
            )

        # Фильтр по стоимости (если is_free=True, находим курсы с price = 0)
        if is_free:
            query = query.where(Course.price == 0)

        # Выполнение запроса и возврат результатов
        result = await session.execute(query)
        courses = result.scalars()
        return courses.all()

    async def check_is_course_exists(
        self,
        session: AsyncSession,
        course_id: int,
    ) -> Course:
        stmt = select(exists().where(Course.id == course_id))
        course = await session.execute(stmt)
        if course:
            return course
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
        
    async def get_course_by_id(
        self,
        session: AsyncSession,
        course_id: int
    ) -> Course:
        course = await session.scalar(
            select(Course).where(Course.id == course_id) 
            .options(
                joinedload(Course.creator),
                selectinload(Course.instructors),
                selectinload(Course.modules).selectinload(Module.lessons).selectinload(Lesson.steps).joinedload(Step.test).selectinload(Test.answers),
                selectinload(Course.comments),
                selectinload(Course.students)
            )
        )
        if course:
            return course
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    async def get_courses_by_category(
        self, 
        session: AsyncSession,
        course_category: str
    ):
        stmt = (
            select(Course).where(Course.category == course_category)
            .options(
                joinedload(Course.creator),
                selectinload(Course.instructors),
                selectinload(Course.modules).selectinload(Module.lessons).selectinload(Lesson.steps).joinedload(Step.test).selectinload(Test.answers),
                selectinload(Course.comments)
            )
            .order_by(Course.id)
        )
        
        result = await session.execute(stmt)
        courses: list[Course] = result.scalars().all()
        return courses

    async def get_all_courses(
        self, 
        session: AsyncSession, 
        skip: int,
        limit: int,
        is_admin: bool = False,
        **kwargs,
    ) -> list[Course]:
        stmt = (
            select(Course)
            .options(
                joinedload(Course.creator),
                selectinload(Course.instructors),
                selectinload(Course.modules).selectinload(Module.lessons).selectinload(Lesson.steps).joinedload(Step.test).selectinload(Test.answers),
                selectinload(Course.comments),
                selectinload(Course.students)
            )
            .offset(skip)
            .limit(limit)
            .order_by(Course.id)
        )
        if not is_admin:
            stmt = stmt.filter_by(is_published=True)
        for field, value in kwargs.items():
            if value is not None:
                stmt = stmt.filter(getattr(Course, field) == value)
        
        courses: list[Course] = await session.scalars(stmt)
        return courses.all()
    
    async def fetch_all_courses_no_auth(
        self,
        session: AsyncSession,
        limit: int
    ) -> list[Course]:
        stmt = (
            select(Course)
            .options(
                joinedload(Course.creator),
                selectinload(Course.instructors),
                selectinload(Course.modules).selectinload(Module.lessons).selectinload(Lesson.steps).joinedload(Step.test).selectinload(Test.answers),
                selectinload(Course.comments)
            )
            .limit(limit)
            .order_by(Course.id)
        )
        result = await session.execute(stmt)
        courses: list[Course] = result.scalars().all()
        return courses
        
    
    async def create_course(
        self,
        session: AsyncSession,
        course_input: CourseInput,
        creator_id: int
    ) -> Course:
        try:
            course_dict = course_input.model_dump()
            course_dict["creator_id"] = creator_id
            course: Course = Course(**course_dict)
            session.add(course)
            await session.commit()
            await session.refresh(course, attribute_names=["creator", "instructors", "modules", "students"])
            return course
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add course. Error: {e}"
            )
        
    async def update_course(
        self,
        session: AsyncSession,
        course_update: CourseUpdate,
        course: Course
    ) -> Course:
        try:
            for name, value in course_update.model_dump(exclude_none=True).items():
                setattr(course, name, value)
            await session.commit()
            await session.refresh(course, attribute_names=["creator", "instructors", "modules", "students", "updated_at"])
            return course
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not update course. Error: {e}"
            )
    
    async def delete_course(
        self,
        session: AsyncSession,
        course: Course
    ) -> None:
        try:
            await session.delete(course)
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not delete course. Error: {e}"
            )
        
    async def add_instructor(
        self,
        session: AsyncSession,
        instructor: User,
        course: Course,
    ) -> Course:
        try:
            course.instructors.append(instructor)
            await session.commit()
            await session.refresh(course, attribute_names=["creator", "instructors", "modules", "students"])
            return course
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add instructor. Error: {e}"
            )
    
    async def get_courses_created_by_user(
        self,
        session: AsyncSession,
        user_id: int
    ) -> list[Course]:
        stmt = (
            select(Course)
            .options(
                joinedload(Course.creator),
                selectinload(Course.instructors),
                selectinload(Course.modules).selectinload(Module.lessons).selectinload(Lesson.steps).joinedload(Step.test).selectinload(Test.answers),
                selectinload(Course.comments),
                selectinload(Course.students)
            )
            .filter(Course.creator_id == user_id)
        )
        
        result = await session.execute(stmt)
        return result.scalars().all()
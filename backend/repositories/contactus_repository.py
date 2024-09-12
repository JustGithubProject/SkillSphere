from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from contactus.schemas import ContactUsInput
from database.models import ContactUs


class ContactUsRepository:
    async def get_all_records(
        self, 
        session: AsyncSession, 
        skip: int,
        limit: int,
        is_checked: bool = False
    ) -> list[ContactUs]:
        stmt = (
            select(ContactUs)
            .filter_by(is_checked=is_checked)
            .offset(skip)
            .limit(limit)
            .order_by(ContactUs.id)
        )        
        records: list[ContactUs] = await session.scalars(stmt)
        return records.all()
    
    async def create_record(
        self,
        session: AsyncSession,
        contactus_input: ContactUsInput
    ) -> ContactUs:
        try:
            record: ContactUs = ContactUs(**contactus_input.model_dump())
            session.add(record)
            await session.commit()
            return record
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add contact us record. Error: {e}"
            )
        
    async def update_record(
        self,
        session: AsyncSession,
        record_id: int,
        is_checked: bool = True,
    ) -> ContactUs:
        try:
            record: ContactUs = await session.get(ContactUs, record_id)
            record.is_checked = is_checked
            await session.commit()
            await session.refresh(record)
            return record
        except Exception as e:
            await session.rollaback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not update contact us record. Error: {e}"
            )

    async def delete_record(
        self,
        session: AsyncSession,
        record_id: int
    ) -> None:
        try:
            record: ContactUs = await session.get(ContactUs, record_id)
            await session.delete(record)
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not delete contact us record. Error: {e}"
            )
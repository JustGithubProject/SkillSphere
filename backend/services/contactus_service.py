from authentication.schemas import UserOut
from sqlalchemy.ext.asyncio import AsyncSession
from repositories.contactus_repository import ContactUsRepository
from database.models import ContactUs
from contactus.schemas import ContactUsInput, ContactUsOutput
from authentication.custom_exceptions import not_enough_rights_exception


class ContactUsService:
    def __init__(self, contactus_repository: ContactUsRepository):
        self.contactus_repository = contactus_repository

    async def get_all_records(
        self,
        session: AsyncSession,
        limit: int,
        skip: int,
        user: UserOut,
        is_checked: bool = False
    ) -> list[ContactUsOutput]:
        if not user.admin:
            raise not_enough_rights_exception
        
        contactus_records: list[ContactUs] = await self.contactus_repository.get_all_records(
            session=session, 
            skip=skip,
            limit=limit,
            is_checked=is_checked
        )
        return [
            ContactUsOutput.model_validate(record, from_attributes=True) 
            for record in contactus_records
        ]
    
    async def create_record(
        self,
        contactus_input: ContactUsInput,
        session: AsyncSession,
    ) -> ContactUsOutput:
        record: ContactUs = await self.contactus_repository.create_record(
            session=session,
            contactus_input=contactus_input,
        )
        record_schema: ContactUsOutput = ContactUsOutput.model_validate(record, from_attributes=True)
        return record_schema

    async def update_record(
        self,
        session: AsyncSession,
        record_id: int,
        user: UserOut,
        is_checked: bool = True,
    ) -> ContactUsOutput:
        if not user.admin:
            raise not_enough_rights_exception
        
        record: ContactUs = await self.contactus_repository.update_record(
            session=session,
            is_checked=is_checked,
            record_id=record_id
        )
        record_schema: ContactUsOutput = ContactUsOutput.model_validate(record, from_attributes=True)
        return record_schema

    async def delete_record(
        self,
        record_id: int,
        user: UserOut,
        session: AsyncSession
    ) -> None:
        if not user.admin:
            raise not_enough_rights_exception
        return await self.contactus_repository.delete_record(
            record_id=record_id,
            session=session
        )

def get_contactus_service():
    return ContactUsService(ContactUsRepository())
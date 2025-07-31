from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

TaskStatus = Literal["To-Do", "In Progress", "Done"]

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus
    due_date: datetime

    class Config:
        allow_population_by_field_name = True

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    due_date: Optional[datetime] = None

    class Config:
        allow_population_by_field_name = True

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        by_alias = True

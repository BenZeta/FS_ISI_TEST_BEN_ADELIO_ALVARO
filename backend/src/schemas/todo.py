from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TodoBase(BaseModel):
    task: str

class TodoCreate(TodoBase):
    pass

class TodoUpdate(TodoBase):
    task: Optional[str] = None
    is_completed: Optional[bool] = None

class Todo(TodoBase):
    id: int
    is_completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
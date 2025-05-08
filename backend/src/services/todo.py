from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import desc, asc

from ..models.todo import Todo
from ..schemas.todo import TodoCreate, TodoUpdate

def get_todos(db: Session, skip: int = 0, limit: int = 100, completed: bool = False) -> List[Todo]:
    """
    Get todos based on completion status.
    Incomplete todos are sorted from oldest to newest.
    Complete todos are sorted from newest to oldest.
    """
    if completed:
        return db.query(Todo)\
            .filter(Todo.is_completed == True)\
            .order_by(desc(Todo.created_at))\
            .offset(skip)\
            .limit(limit)\
            .all()
    return db.query(Todo)\
        .filter(Todo.is_completed == False)\
        .order_by(asc(Todo.created_at))\
        .offset(skip)\
        .limit(limit)\
        .all()

def create_todo(db: Session, todo_data: TodoCreate) -> Todo:
    db_todo = Todo(**todo_data.model_dump())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_todo(db: Session, todo_id: int) -> Optional[Todo]:
    return db.query(Todo).filter(Todo.id == todo_id).first()

def update_todo(db: Session, todo_id: int, todo_data: TodoUpdate) -> Optional[Todo]:
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo:
        update_data = todo_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_todo, key, value)
        db.commit()
        db.refresh(db_todo)
    return db_todo

def delete_todo(db: Session, todo_id: int) -> Optional[Todo]:
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo:
        db.delete(db_todo)
        db.commit()
    return db_todo
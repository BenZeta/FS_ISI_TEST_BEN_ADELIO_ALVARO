from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database.database import get_db
from ..schemas.todo import Todo, TodoCreate, TodoUpdate
from ..services.todo import get_todos, create_todo, get_todo, update_todo, delete_todo

router = APIRouter(
    prefix="/todos",
    tags=["todos"]
)

@router.get("/", response_model=List[Todo])
def get_todos_route(completed: bool = False, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get all todos. Use query parameter completed=true to get completed todos,
    completed=false (default) to get incomplete todos.
    """
    todos = get_todos(db, skip=skip, limit=limit, completed=completed)
    return todos

@router.post("/", response_model=Todo)
def create_todo_route(todo: TodoCreate, db: Session = Depends(get_db)):
    """Create a new todo"""
    return create_todo(db=db, todo_data=todo)

@router.get("/{todo_id}", response_model=Todo)
def get_todo_route(todo_id: int, db: Session = Depends(get_db)):
    """Get a specific todo by ID"""
    db_todo = get_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.put("/{todo_id}", response_model=Todo)
def update_todo_route(todo_id: int, todo: TodoUpdate, db: Session = Depends(get_db)):
    """Update a todo"""
    db_todo = update_todo(db, todo_id=todo_id, todo_data=todo)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.delete("/{todo_id}", response_model=Todo)
def delete_todo_route(todo_id: int, db: Session = Depends(get_db)):
    """Delete a todo"""
    db_todo = delete_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo
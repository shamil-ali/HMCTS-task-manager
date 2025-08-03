from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas, crud
from app.database import SessionLocal
from sqlalchemy.exc import NoResultFound

router = APIRouter()

# Dependency to get DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# POST /tasks
@router.post("/tasks", response_model=schemas.Task, status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)

# GET /tasks
@router.get("/tasks", response_model=list[schemas.Task])
def read_tasks(db: Session = Depends(get_db)):
    return crud.get_all_tasks(db)

# GET /tasks/{id}
@router.get("/tasks/{task_id}", response_model=schemas.Task)
def read_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# PUT /tasks/{id}
@router.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    try:
        return crud.update_task(db, task_id, update)
    except NoResultFound:
        raise HTTPException(status_code=404, detail="Task not found")


# DELETE /tasks/{id}
@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    try:
        crud.delete_task(db, task_id)
        return None
    except NoResultFound:
        raise HTTPException(status_code=404, detail="Task not found")

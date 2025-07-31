from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from app import models, schemas

def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()

def get_all_tasks(db: Session):
    return db.query(models.Task).all()

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        status=task.status,
        due_date=task.due_date
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task_status(db: Session, task_id: int, new_status: str):
    task = get_task(db, task_id)
    if not task:
        raise NoResultFound(f"Task with ID {task_id} not found")
    task.status = new_status
    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = get_task(db, task_id)
    if not task:
        raise NoResultFound(f"Task with ID {task_id} not found")
    db.delete(task)
    db.commit()
    return task

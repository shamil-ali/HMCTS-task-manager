
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_task():
    response = client.post("/tasks", json={
        "title": "Test Task",
        "description": "Test Description",
        "status": "To-Do",
        "due_date": "2025-08-01T15:00:00"
    })
    assert response.status_code == 201
    assert response.json()["title"] == "Test Task"

def test_get_all_tasks():
    response = client.get("/tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_task_by_id():
    response = client.post("/tasks", json={
        "title": "Find Me",
        "status": "To-Do",
        "due_date": "2025-08-01T15:00:00"
    })
    task_id = response.json()["id"]
    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Find Me"

def test_update_task():
    response = client.post("/tasks", json={
        "title": "Update Me",
        "status": "To-Do",
        "due_date": "2025-08-01T15:00:00"
    })
    task_id = response.json()["id"]
    response = client.put(f"/tasks/{task_id}", json={
        "title": "Updated Task",
        "description": "Updated Description",
        "status": "In Progress",
        "due_date": "2025-08-02T15:00:00"
    })
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Task"

def test_delete_task():
    response = client.post("/tasks", json={
        "title": "Delete Me",
        "status": "To-Do",
        "due_date": "2025-08-01T15:00:00"
    })
    task_id = response.json()["id"]
    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 204

def test_get_nonexistent_task():
    response = client.get("/tasks/999999")
    assert response.status_code == 404

def test_delete_nonexistent_task():
    response = client.delete("/tasks/999999")
    assert response.status_code == 404

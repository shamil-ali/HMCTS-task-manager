# HMCTS Task Manager

This project is a submission for the HMCTS DTS Developer Technical Test. It is a full-stack task management system that allows caseworkers to efficiently create, update, and manage their tasks.

## 📝 Project Overview

The application consists of:

- **Backend:** A RESTful API built with FastAPI (Python), responsible for managing task data and handling CRUD operations.
- **Frontend:** A React application using TypeScript and Bootstrap that enables users to interact with the system through a clean and intuitive UI.

---

## 🔧 Features

### Backend API

- Create a task with:
  - `title` (required)
  - `description` (optional)
  - `status` (To-Do, In Progress, Done)
  - `due_date` (ISO 8601 string)
- Retrieve a task by its ID
- Retrieve all tasks
- Update the status or details of a task
- Delete a task
- Includes input validation and error handling
- Stores tasks in an SQLite database
- Fully documented with Swagger (FastAPI auto docs)

### Frontend App

- Display a list of all tasks with title, status, and due date
- View task details
- Create new tasks
- Edit tasks and update their status
- Delete tasks
- User-friendly interface using Bootstrap styling
- Error handling for form inputs

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- Python 3.11
- pip or virtualenv

---

## 📦 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload

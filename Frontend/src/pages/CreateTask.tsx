import './CreateTask.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTasks, type TaskStatus } from '../context/TaskContext'

function CreateTask() {
  const { addTask } = useTasks()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>('To-Do')
  const [due_date, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !due_date) {
      alert('Please fill in all required fields.')
      return
    }

    addTask({ title, description, status, due_date })
    navigate('/')
  }

  return (
    <div className="create-task-page">
      <h1>Create New Task</h1>

      <form className="create-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            className="form-control"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows={4}
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            className="form-control"
            value={status}
            onChange={e => setStatus(e.target.value as TaskStatus)}
          >
            <option value="To-Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="datetime-local"
            name="due_date"
            className="form-control"
            value={due_date}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">Create Task</button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask

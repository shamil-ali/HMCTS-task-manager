import './EditTask.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useTasks, type TaskStatus } from '../context/TaskContext'
import { useState, useEffect } from 'react'

function EditTask() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tasks, updateTask } = useTasks()

  const taskToEdit = tasks.find(task => task.id === Number(id))

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>('To-Do')
  const [due_date, setDue_date] = useState('')

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title)
      setDescription(taskToEdit.description || '')
      setStatus(taskToEdit.status)
      setDue_date(taskToEdit.due_date.slice(0, 16))
    }
  }, [taskToEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskToEdit) return

    const updatedDueDate = new Date(due_date).toISOString()

    await updateTask({
      ...taskToEdit,
      title,
      description,
      status,
      due_date: updatedDueDate
    })

    navigate('/')
  }

  if (!taskToEdit) {
    return <p>Task not found.</p>
  }

  return (
    <div className="edit-task-page">
      <h1>Edit Task</h1>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            className="form-control"
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            className="form-control"
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            className="form-control"
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
            value={due_date}
            className="form-control"
            onChange={e => setDue_date(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditTask

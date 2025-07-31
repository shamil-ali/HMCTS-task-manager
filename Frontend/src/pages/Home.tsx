import './Home.css'
import { useTasks } from '../context/TaskContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Home() {
  const { tasks, deleteTask } = useTasks()
  const navigate = useNavigate()

  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [sortedTasks, setSortedTasks] = useState(tasks)

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortCriteria, setSortCriteria] = useState('dueDate')

  const [searchId, setSearchId] = useState('')

  useEffect(() => {
    const sorted = [...filteredTasks].sort((a, b) => {
      if (sortCriteria === 'dueDate') {
        const dateA = new Date(a.dueDate).getTime()
        const dateB = new Date(b.dueDate).getTime()
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
      } return 0
    })
    setSortedTasks(sorted)
  }, [filteredTasks, sortCriteria, sortOrder])

  const filterTasks = (status: string) => {
    if (status === '') {
      setFilteredTasks(tasks)
    } else {
      const filtered = tasks.filter(task => task.status === status)
      setFilteredTasks(filtered)
    }
  }

  const handleSortChange = (value: string) => {
    if (value === 'dueDateAsc') {
      setSortOrder('asc')
      setSortCriteria('dueDate')
    } else if (value === 'dueDateDesc') {
      setSortOrder('desc')
      setSortCriteria('dueDate')
    }
  }

  const handleSearch = () => {
    const id = parseInt(searchId, 10)
    if (isNaN(id)) {
      alert('Please enter a valid task ID.')
      return
    }
    const task = tasks.find(task => task.id === id)
    if (task) {
      setFilteredTasks([task])
    } else {
      alert('Task not found.')
      setFilteredTasks([])
    }
  }

  return (
    <div className="home-page">
      <div className='sort-filter-controls'>
        <div className="sort-controls d-flex mb-3">
          <label className="me-2">Sort by:</label>
          <select className='form-select' onChange={(e) => handleSortChange(e.target.value)}>
            <option value="">Select...</option>
            <option value="dueDateAsc">Due Date Earliest - Latest</option>
            <option value="dueDateDesc">Due Date Latest - Earliest</option>
          </select>
        </div>

        <div className="filter-controls d-flex mb-3">
          <label className="me-2">Filter by Status:</label>
          <select className='form-select' onChange={(e) => filterTasks(e.target.value)}>
            <option value="">All</option>
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="search d-flex align-items-center mb-3 gap-2">
        <input type="text" className="form-control" placeholder="Search tasks by ID..." onChange={(e) => setSearchId(e.target.value)} />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>

      <div className="create-task-button">
        <button className='btn btn-primary' onClick={() => navigate('/create-task')}>Create New Task</button>
      </div>

      <div className="task-list row">
        {sortedTasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          sortedTasks.map(task => (
            <div className="col-md-4 mb-3" key={task.id}>
              <div className="task-card">
                <h5 className="task-id">Task ID: {task.id}</h5>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span className="task-due-date">Due: {new Date(task.dueDate).toLocaleString()}</span>
                <span className="task-status">Status: {task.status}</span>
                <div className="card-buttons mt-2 d-flex">
                  <button 
                    className="btn btn-warning w-50 me-1" 
                    onClick={() => navigate(`/edit-task/${task.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger w-50"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Task } from '../types'
import axios from 'axios'

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id'>) => void
  deleteTask: (id: number) => void
  updateTask: (updatedTask: Task) => void
  getTaskById: (id: number) => Task | undefined
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [nextId, setNextId] = useState(1)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('http://127.0.0.1:8000/tasks')
        setTasks(response.data)
        const maxId = Math.max(...response.data.map(t => t.id), 0)
        setNextId(maxId + 1)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }

    fetchTasks()
  }, [])

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const response = await axios.post<Task>('http://127.0.0.1:8000/tasks', task)
      setTasks(prev => [...prev, response.data])
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/${id}`)
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const updateTask = async (updatedTask: Task) => {
    try {
      const response = await axios.put<Task>(
        `http://127.0.0.1:8000/tasks/${updatedTask.id}`, updatedTask)
      setTasks(prev =>
        prev.map(task => (task.id === updatedTask.id ? response.data : task))
      )
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const getTaskById = (id: number): Task | undefined => {
    return tasks.find(task => task.id === id)
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask, getTaskById }}>
      {children}
    </TaskContext.Provider>
  )
}

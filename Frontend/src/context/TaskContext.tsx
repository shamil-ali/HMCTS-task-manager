import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Task } from '../types'
import { getTasks,
        createTask as createTaskAPI,
        updateTaskStatus as updateTaskStatusAPI,
        deleteTask as deleteTaskAPI } from '../api'

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id'>) => void
  deleteTask: (id: number) => void
  updateTask: (updatedTask: Task) => void
  getTaskById: (id: number) => Task | undefined
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Failed to fetch tasks:', err))
  }, [])


  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const res = await createTaskAPI(task)
      setTasks(prev => [...prev, res.data])
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskAPI(id)
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const updateTask = async (updatedTask: Task) => {
    try {
      const res = await updateTaskStatusAPI(updatedTask.id!, updatedTask.status)
      setTasks(prev =>
        prev.map(task => (task.id === updatedTask.id ? res.data : task))
      )
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const getTaskById = (id: number): Task | undefined => {
  return tasks.find((task) => task.id === id)
}

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask, getTaskById }}>
      {children}
    </TaskContext.Provider>
  )
}
  
export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}

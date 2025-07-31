import { createContext, useContext, useState, type ReactNode } from 'react'

export type TaskStatus = 'To-Do' | 'In Progress' | 'Done'

export interface Task {
  id: number
  title: string
  description?: string
  status: TaskStatus
  dueDate: string
}

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

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: nextId }
    setTasks(prev => [...prev, newTask])
    setNextId(prev => prev + 1)
  }

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    )
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

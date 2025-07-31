import axios from 'axios'
import type { Task } from './types'

const API_BASE = 'http://localhost:8000'

export const fetchTasks = () => axios.get<Task[]>(`${API_BASE}/tasks`)

export const fetchTaskById = (id: number) =>
  axios.get<Task>(`${API_BASE}/tasks/${id}`)

export const createTask = (task: Omit<Task, 'id'>) =>
  axios.post<Task>(`${API_BASE}/tasks`, task)

export const updateTaskStatus = (id: number, status: Task['status']) =>
  axios.put<Task>(`${API_BASE}/tasks/${id}/status`, { status })

export const deleteTask = (id: number) =>
  axios.delete<Task>(`${API_BASE}/tasks/${id}`)

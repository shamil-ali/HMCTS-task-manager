import axios from 'axios'
import type { Task } from './types'

const API_BASE = 'http://127.0.0.1:8000/tasks'

export const fetchTasks = () => axios.get<Task[]>(API_BASE)

export const fetchTaskById = (id: number) =>
  axios.get<Task>(`${API_BASE}/${id}`)

export const createTask = (task: Omit<Task, 'id'>) =>
  axios.post<Task>(API_BASE, task)

export const updateTaskStatus = (id: number, status: Task['status']) =>
  axios.put<Task>(`${API_BASE}/${id}/status`, { status })

export const deleteTask = (id: number) =>
  axios.delete<Task>(`${API_BASE}/${id}`)

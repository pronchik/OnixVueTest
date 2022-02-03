/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import tasks from './api'
import { TaskInterface } from '@/types/task.interface'

export function getTasks () {
  return tasks.get('tasks')
}
export function postTask (payload: TaskInterface) {
  return tasks.post('tasks', payload)
}
export function deleteTask (taskId: number) {
  return tasks.delete(`tasks/${taskId}`)
}
export function updateTask (task: TaskInterface) {
  return tasks.put(`tasks/${task.id}`, task)
}

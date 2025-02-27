export interface Task {
  id: number
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

export interface NewTask {
  text: string
  priority: 'low' | 'medium' | 'high'
}

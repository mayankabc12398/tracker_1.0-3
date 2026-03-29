export interface Habit {
  id: string
  name: string
  category: string
  frequency: 'daily' | 'weekly' | 'monthly'
  color: string
  icon: string
  completedToday: boolean
  streak: number
  completedDates: string[]
  createdAt: string
}

export interface Settings {
  notifications: boolean
  reminderTime: string
  weekStartsOn: 'sunday' | 'monday'
}

export interface Topic {
  id: string
  name: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  status: 'Active' | 'Archived' | 'Draft'
  updatedAt: string
  description: string
  content: string
}

export interface CompletionRecord {
  habitId: string
  date: string
  completed: boolean
}

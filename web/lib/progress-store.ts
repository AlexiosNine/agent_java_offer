import { create } from 'zustand'
import { TopicProgress } from './types'

interface ProgressState {
  progress: Record<string, TopicProgress>
  toggleRead: (slug: string) => void
  isRead: (slug: string) => boolean
  getReadCount: () => number
}

function loadProgress(): Record<string, TopicProgress> {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem('agent-offer-progress')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function saveProgress(progress: Record<string, TopicProgress>) {
  if (typeof window === 'undefined') return
  localStorage.setItem('agent-offer-progress', JSON.stringify(progress))
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: loadProgress(),
  toggleRead: (slug) => set((state) => {
    const current = state.progress[slug]
    const updated = {
      ...state.progress,
      [slug]: {
        read: !current?.read,
        readAt: !current?.read ? new Date().toISOString().split('T')[0] : undefined,
      },
    }
    saveProgress(updated)
    return { progress: updated }
  }),
  isRead: (slug) => get().progress[slug]?.read ?? false,
  getReadCount: () => Object.values(get().progress).filter(p => p.read).length,
}))

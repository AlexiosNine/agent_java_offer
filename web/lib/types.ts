export interface DocNode {
  slug: string
  title: string
  dirTitle: string
  children?: DocNode[]
  hasContent: boolean
}

export interface NavTree {
  directions: DocNode[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  references?: Reference[]
  timestamp: number
}

export interface Reference {
  reference_id: string
  file_path: string
  content?: string[]
}

export interface RAGResponse {
  response: string
  references?: Reference[]
}

export interface TopicProgress {
  read: boolean
  readAt?: string
}

export type Direction = '01_AI' | '02_后端' | '03_系统设计' | '04_算法' | '05_项目表达'

export type Difficulty = 'basic' | 'advanced' | 'comprehensive'

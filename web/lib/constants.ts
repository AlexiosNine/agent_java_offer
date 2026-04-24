import { Direction, Difficulty } from './types'

export const DIRECTIONS: { value: Direction; label: string }[] = [
  { value: '01_AI', label: 'AI' },
  { value: '02_后端', label: '后端' },
  { value: '03_系统设计', label: '系统设计' },
  { value: '04_算法', label: '算法' },
  { value: '05_项目表达', label: '项目表达' },
]

export const DIFFICULTIES: { value: Difficulty; label: string; description: string }[] = [
  { value: 'basic', label: '基础', description: '核心概念和定义' },
  { value: 'advanced', label: '进阶', description: '设计决策和工程实践' },
  { value: 'comprehensive', label: '综合', description: '跨主题追问和场景题' },
]

export const LIGHTRAG_URL = process.env.NEXT_PUBLIC_LIGHTRAG_URL || 'http://localhost:8020'

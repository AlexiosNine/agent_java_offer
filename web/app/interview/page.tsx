'use client'

import { useState, useEffect } from 'react'
import { ChatPanel } from '@/components/chat-panel'
import { InterviewSetup } from '@/components/interview-setup'
import { queryInterview } from '@/lib/lightrag'
import { useChatStore } from '@/lib/chat-store'
import { Direction, Difficulty, ChatMessage } from '@/lib/types'
import { DIRECTIONS, DIFFICULTIES, LIGHTRAG_URL } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export default function InterviewPage() {
  const [started, setStarted] = useState(false)
  const [direction, setDirection] = useState<Direction>('01_AI')
  const [difficulty, setDifficulty] = useState<Difficulty>('basic')
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null)
  const clearMessages = useChatStore((s) => s.clearMessages)
  const addMessage = useChatStore((s) => s.addMessage)

  useEffect(() => {
    fetch(`${LIGHTRAG_URL}/health`, { signal: AbortSignal.timeout(3000) })
      .then(() => setBackendAvailable(true))
      .catch(() => setBackendAvailable(false))
  }, [])

  function handleStart(dir: Direction, diff: Difficulty) {
    setDirection(dir)
    setDifficulty(diff)
    clearMessages()

    const dirLabel = DIRECTIONS.find(d => d.value === dir)?.label ?? dir
    const diffLabel = DIFFICULTIES.find(d => d.value === diff)?.label ?? diff

    addMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `你好，我是今天的${dirLabel}方向面试官。本次面试难度为「${diffLabel}」。\n\n准备好了吗？我们开始第一个问题。\n\n请先做一个简短的自我介绍，然后我会根据你的背景提出技术问题。`,
      timestamp: Date.now(),
    })

    setStarted(true)
  }

  async function handleSend(message: string, history: ChatMessage[]) {
    const dirLabel = DIRECTIONS.find(d => d.value === direction)?.label ?? direction
    const result = await queryInterview(message, dirLabel, history)
    return {
      content: result.response,
      references: result.references,
    }
  }

  function handleEnd() {
    setStarted(false)
    clearMessages()
  }

  if (backendAvailable === false) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-16 text-center">
        <h2 className="text-xl font-bold mb-4">模拟面试需要后端服务</h2>
        <p className="text-muted-foreground">
          此功能依赖 LightRAG 后端，静态部署版本暂不支持。
          请在本地启动后端服务后使用。
        </p>
      </div>
    )
  }

  if (!started) {
    return <InterviewSetup onStart={handleStart} />
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Button variant="outline" size="sm" onClick={handleEnd}>
          结束面试
        </Button>
      </div>
      <ChatPanel
        onSend={handleSend}
        placeholder="输入你的回答..."
      />
    </div>
  )
}

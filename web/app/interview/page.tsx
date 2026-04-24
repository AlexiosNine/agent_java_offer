'use client'

import { useState } from 'react'
import { ChatPanel } from '@/components/chat-panel'
import { InterviewSetup } from '@/components/interview-setup'
import { queryInterview } from '@/lib/lightrag'
import { useChatStore } from '@/lib/chat-store'
import { Direction, Difficulty, ChatMessage } from '@/lib/types'
import { DIRECTIONS, DIFFICULTIES } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export default function InterviewPage() {
  const [started, setStarted] = useState(false)
  const [direction, setDirection] = useState<Direction>('01_AI')
  const [difficulty, setDifficulty] = useState<Difficulty>('basic')
  const clearMessages = useChatStore((s) => s.clearMessages)
  const addMessage = useChatStore((s) => s.addMessage)

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

'use client'

import { useState, useEffect } from 'react'
import { ChatPanel } from '@/components/chat-panel'
import { queryRAG } from '@/lib/lightrag'
import { ChatMessage } from '@/lib/types'
import { LIGHTRAG_URL } from '@/lib/constants'

export default function ChatPage() {
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    fetch(`${LIGHTRAG_URL}/health`, { signal: AbortSignal.timeout(3000) })
      .then(() => setBackendAvailable(true))
      .catch(() => setBackendAvailable(false))
  }, [])

  async function handleSend(message: string, history: ChatMessage[]) {
    const result = await queryRAG(message, history)
    return {
      content: result.response,
      references: result.references,
    }
  }

  if (backendAvailable === false) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-16 text-center">
        <h2 className="text-xl font-bold mb-4">智能问答需要后端服务</h2>
        <p className="text-muted-foreground">
          此功能依赖 LightRAG 后端，静态部署版本暂不支持。
          请在本地启动后端服务后使用。
        </p>
      </div>
    )
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <ChatPanel
          onSend={handleSend}
          placeholder="输入你的问题，例如：RAG 是什么？Agent 怎么设计？"
        />
      </div>
    </div>
  )
}

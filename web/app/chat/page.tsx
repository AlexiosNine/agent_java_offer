'use client'

import { ChatPanel } from '@/components/chat-panel'
import { queryRAG } from '@/lib/lightrag'
import { ChatMessage } from '@/lib/types'

export default function ChatPage() {
  async function handleSend(message: string, history: ChatMessage[]) {
    const result = await queryRAG(message, history)
    return {
      content: result.response,
      references: result.references,
    }
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

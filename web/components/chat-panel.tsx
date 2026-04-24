'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatMessage } from './chat-message'
import { useChatStore } from '@/lib/chat-store'
import { ChatMessage as ChatMessageType } from '@/lib/types'

interface ChatPanelProps {
  onSend: (message: string, history: ChatMessageType[]) => Promise<{ content: string; references?: any[] }>
  placeholder?: string
}

export function ChatPanel({ onSend, placeholder = '输入你的问题...' }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const { messages, isLoading, addMessage, setLoading } = useChatStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: ChatMessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    }
    addMessage(userMsg)
    setInput('')
    setLoading(true)

    try {
      const result = await onSend(text, messages)
      const assistantMsg: ChatMessageType = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: result.content,
        references: result.references,
        timestamp: Date.now(),
      }
      addMessage(assistantMsg)
    } catch (err) {
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `请求失败：${err instanceof Error ? err.message : '未知错误'}。请确认 LightRAG 服务是否运行。`,
        timestamp: Date.now(),
      })
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <p className="text-lg mb-2">开始提问吧</p>
            <p className="text-sm">基于面试资料库的智能问答</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-muted rounded-lg px-4 py-3 text-sm text-muted-foreground">
              思考中...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[44px] max-h-[120px] resize-none"
            rows={1}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}

import { ChatMessage as ChatMessageType } from '@/lib/types'
import { MarkdownRender } from './markdown-render'
import Link from 'next/link'

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
        isUser
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted'
      }`}>
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        ) : (
          <MarkdownRender content={message.content} />
        )}

        {message.references && message.references.length > 0 && (
          <div className="mt-2 pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-1">来源：</p>
            {message.references.map((ref) => (
              <Link
                key={ref.reference_id}
                href={`/docs/${ref.file_path.replace(/\/01_核心问答\.md$/, '').replace(/^\//, '')}`}
                className="text-xs text-blue-500 hover:underline block"
              >
                {ref.file_path}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

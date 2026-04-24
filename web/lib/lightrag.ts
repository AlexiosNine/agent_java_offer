import { LIGHTRAG_URL } from './constants'
import { RAGResponse, ChatMessage } from './types'

export async function queryRAG(
  query: string,
  conversationHistory?: ChatMessage[]
): Promise<RAGResponse> {
  const history = conversationHistory?.map(m => ({
    role: m.role,
    content: m.content,
  }))

  const res = await fetch(`${LIGHTRAG_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      mode: 'hybrid',
      include_references: true,
      ...(history && history.length > 0 ? { conversation_history: history } : {}),
    }),
  })

  if (!res.ok) {
    throw new Error(`LightRAG query failed: ${res.status}`)
  }

  return res.json()
}

export async function queryInterview(
  query: string,
  direction: string,
  conversationHistory?: ChatMessage[]
): Promise<RAGResponse> {
  const systemPrompt = `你是一位资深的${direction}方向技术面试官。你的任务是：
1. 根据候选人的回答进行评价，指出优点和不足
2. 针对回答中的薄弱点进行追问
3. 评价维度：完整性、准确性、表达力、深度
4. 语气专业但友善，像真实面试一样`

  const history = conversationHistory?.map(m => ({
    role: m.role,
    content: m.content,
  }))

  const res = await fetch(`${LIGHTRAG_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `${systemPrompt}\n\n${query}`,
      mode: 'hybrid',
      include_references: true,
      ...(history && history.length > 0 ? { conversation_history: history } : {}),
    }),
  })

  if (!res.ok) {
    throw new Error(`LightRAG interview query failed: ${res.status}`)
  }

  return res.json()
}

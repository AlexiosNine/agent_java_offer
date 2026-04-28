import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const features = [
  {
    title: '文档浏览',
    description: '按方向和主题浏览面试资料，支持搜索和进度追踪',
    href: '/docs/01_AI/01_Agent基础',
  },
  {
    title: '智能问答',
    description: '输入问题，AI 从资料库中检索并生成答案',
    href: '/chat',
  },
  {
    title: '模拟面试',
    description: 'AI 面试官提问、追问、评价，模拟真实面试场景',
    href: '/interview',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Agent Offer</h1>
      <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10">
        后端转 AI Agent 面试资料库
      </p>

      <div className="grid gap-3 sm:gap-4">
        {features.map((f) => (
          <Link key={f.href} href={f.href}>
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">{f.title}</CardTitle>
                <CardDescription className="text-sm">{f.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

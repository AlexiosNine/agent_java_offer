import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { ProgressBadge } from './progress-badge'

export function TopNav({ totalTopics }: { totalTopics: number }) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center px-6 gap-6">
        <Link href="/" className="font-bold text-lg">Agent Offer</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/docs/01_AI/01_Agent基础" className="hover:text-foreground text-muted-foreground">文档</Link>
          <Link href="/chat" className="hover:text-foreground text-muted-foreground">问答</Link>
          <Link href="/interview" className="hover:text-foreground text-muted-foreground">模拟面试</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <ProgressBadge totalTopics={totalTopics} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

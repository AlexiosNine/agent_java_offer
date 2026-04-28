'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { ProgressBadge } from './progress-badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export function TopNav({ totalTopics }: { totalTopics: number }) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center px-4 sm:px-6 gap-3 sm:gap-6">
        <Link href="/" className="font-bold text-base sm:text-lg whitespace-nowrap">Agent Offer</Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex gap-4 text-sm">
          <Link href="/docs/01_AI/01_Agent基础" className="hover:text-foreground text-muted-foreground whitespace-nowrap">文档</Link>
          <Link href="/chat" className="hover:text-foreground text-muted-foreground whitespace-nowrap">问答</Link>
          <Link href="/interview" className="hover:text-foreground text-muted-foreground whitespace-nowrap">模拟面试</Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="sm:hidden">
            <Button variant="ghost" size="sm" className="px-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/docs/01_AI/01_Agent基础" className="text-lg hover:text-foreground text-muted-foreground">文档</Link>
              <Link href="/chat" className="text-lg hover:text-foreground text-muted-foreground">问答</Link>
              <Link href="/interview" className="text-lg hover:text-foreground text-muted-foreground">模拟面试</Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ProgressBadge totalTopics={totalTopics} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

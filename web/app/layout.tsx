import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TopNav } from '@/components/top-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agent Offer',
  description: '后端转 AI Agent 面试资料库',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <TopNav totalTopics={43} />
        <main>{children}</main>
      </body>
    </html>
  )
}

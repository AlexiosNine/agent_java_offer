'use client'

import { Button } from '@/components/ui/button'
import { useProgressStore } from '@/lib/progress-store'

export function ReadToggle({ slug }: { slug: string }) {
  const isRead = useProgressStore((s) => s.isRead(slug))
  const toggleRead = useProgressStore((s) => s.toggleRead)

  return (
    <Button
      variant={isRead ? 'secondary' : 'default'}
      onClick={() => toggleRead(slug)}
    >
      {isRead ? '✓ 已读' : '标记为已读'}
    </Button>
  )
}

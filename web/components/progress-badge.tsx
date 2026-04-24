'use client'

import { useProgressStore } from '@/lib/progress-store'

export function ProgressBadge({ totalTopics }: { totalTopics: number }) {
  const readCount = useProgressStore((s) => s.getReadCount())
  return (
    <span className="text-sm text-muted-foreground">
      {readCount}/{totalTopics}
    </span>
  )
}

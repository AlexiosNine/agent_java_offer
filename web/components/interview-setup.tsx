'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DIRECTIONS, DIFFICULTIES } from '@/lib/constants'
import { Direction, Difficulty } from '@/lib/types'

interface InterviewSetupProps {
  onStart: (direction: Direction, difficulty: Difficulty) => void
}

export function InterviewSetup({ onStart }: InterviewSetupProps) {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">模拟面试</h1>
      <p className="text-muted-foreground mb-8">选择方向和难度，AI 面试官将根据资料库内容向你提问</p>

      {DIRECTIONS.map((dir) => (
        <Card key={dir.value} className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">{dir.label}</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            {DIFFICULTIES.map((diff) => (
              <Button
                key={diff.value}
                variant="outline"
                onClick={() => onStart(dir.value, diff.value)}
              >
                {diff.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

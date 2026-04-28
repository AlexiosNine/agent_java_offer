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
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-2">模拟面试</h1>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">选择方向和难度，AI 面试官将根据资料库内容向你提问</p>

      {DIRECTIONS.map((dir) => (
        <Card key={dir.value} className="mb-3 sm:mb-4">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">{dir.label}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 p-4 sm:p-6 pt-0">
            {DIFFICULTIES.map((diff) => (
              <Button
                key={diff.value}
                variant="outline"
                size="sm"
                onClick={() => onStart(dir.value, diff.value)}
                className="text-xs sm:text-sm"
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

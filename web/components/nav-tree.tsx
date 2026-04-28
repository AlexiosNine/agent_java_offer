'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DocNode } from '@/lib/types'
import { useProgressStore } from '@/lib/progress-store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

function TreeNode({ node, depth = 0 }: { node: DocNode; depth?: number }) {
  const [expanded, setExpanded] = useState(true)
  const pathname = usePathname()
  const isRead = useProgressStore((s) => s.isRead(node.slug))
  const isActive = pathname === `/docs/${node.slug}`
  const hasChildren = node.children && node.children.length > 0

  return (
    <div>
      <div
        className={`flex items-center gap-1 py-1.5 px-2 rounded text-sm cursor-pointer hover:bg-accent ${
          isActive ? 'bg-accent font-medium' : ''
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-4 h-4 flex items-center justify-center text-muted-foreground"
          >
            {expanded ? '▾' : '▸'}
          </button>
        )}
        {!hasChildren && <span className="w-4" />}

        {node.hasContent ? (
          <Link href={`/docs/${node.slug}`} className="flex-1 truncate">
            {node.title}
          </Link>
        ) : (
          <span className="flex-1 truncate text-muted-foreground" onClick={() => setExpanded(!expanded)}>
            {node.title}
          </span>
        )}

        {isRead && <span className="text-green-500 text-xs">✓</span>}
      </div>

      {expanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode key={child.slug} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

function NavTreeContent({ tree }: { tree: DocNode[] }) {
  return (
    <div className="p-2">
      {tree.map((node) => (
        <TreeNode key={node.slug} node={node} />
      ))}
    </div>
  )
}

export function NavTree({ tree }: { tree: DocNode[] }) {
  return (
    <>
      {/* Desktop sidebar */}
      <ScrollArea className="hidden md:block h-[calc(100vh-3.5rem)] w-64 border-r shrink-0">
        <NavTreeContent tree={tree} />
      </ScrollArea>

      {/* Mobile floating button + drawer */}
      <div className="md:hidden fixed bottom-4 left-4 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="shadow-lg rounded-full px-3 h-10">
              <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              目录
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <ScrollArea className="h-full pt-8">
              <NavTreeContent tree={tree} />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

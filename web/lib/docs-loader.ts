import fs from 'fs'
import path from 'path'
import { DocNode, NavTree } from './types'

const DOCS_ROOT = path.join(process.cwd(), '..', 'docs', 'interview_prep')

function extractTitle(dirName: string): string {
  return dirName.replace(/^\d+_/, '')
}

function buildTree(dirPath: string, basePath: string = ''): DocNode[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('.') && e.name !== '00_导航')
    .sort((a, b) => a.name.localeCompare(b.name))

  return entries.map(entry => {
    const fullPath = path.join(dirPath, entry.name)
    const slug = basePath ? `${basePath}/${entry.name}` : entry.name
    const contentFile = path.join(fullPath, '01_核心问答.md')
    const hasContent = fs.existsSync(contentFile)
    const children = buildTree(fullPath, slug)

    return {
      slug,
      title: extractTitle(entry.name),
      dirTitle: extractTitle(entry.name),
      children: children.length > 0 ? children : undefined,
      hasContent,
    }
  })
}

export function getNavTree(): NavTree {
  return { directions: buildTree(DOCS_ROOT) }
}

export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = []

  function walk(dirPath: string, parts: string[]) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(e => e.isDirectory() && !e.name.startsWith('.') && e.name !== '00_导航')
      .sort()

    for (const entry of entries) {
      const newParts = [...parts, entry.name]
      const contentFile = path.join(dirPath, entry.name, '01_核心问答.md')
      if (fs.existsSync(contentFile)) {
        slugs.push(newParts)
      }
      walk(path.join(dirPath, entry.name), newParts)
    }
  }

  walk(DOCS_ROOT, [])
  return slugs
}

export function getDocContent(slugParts: string[]): string {
  const filePath = path.join(DOCS_ROOT, ...slugParts, '01_核心问答.md')
  if (!fs.existsSync(filePath)) {
    return '# 内容未找到'
  }
  return fs.readFileSync(filePath, 'utf-8')
}

export function getDocTitle(slugParts: string[]): string {
  const last = slugParts[slugParts.length - 1]
  return extractTitle(last)
}

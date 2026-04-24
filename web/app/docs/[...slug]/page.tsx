import { getNavTree, getAllDocSlugs, getDocContent, getDocTitle } from '@/lib/docs-loader'
import { NavTree } from '@/components/nav-tree'
import { MarkdownRender } from '@/components/markdown-render'
import { ReadToggle } from './read-toggle'

export async function generateStaticParams() {
  const slugs = getAllDocSlugs()
  return slugs.map((parts) => ({ slug: parts }))
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const navTree = getNavTree()
  const content = getDocContent(slug)
  const title = getDocTitle(slug)
  const slugStr = slug.join('/')

  return (
    <div className="flex">
      <NavTree tree={navTree.directions} />
      <div className="flex-1 overflow-auto">
        <article className="max-w-4xl mx-auto px-8 py-6">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          <MarkdownRender content={content} />
          <div className="mt-8 pt-4 border-t">
            <ReadToggle slug={slugStr} />
          </div>
        </article>
      </div>
    </div>
  )
}

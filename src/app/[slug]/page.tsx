import { tools } from '@/lib/navigation'
import { getToolConfig } from '@/lib/toolConfig'
import { notFound } from 'next/navigation'
import ToolClient from './ToolClient'

export function generateStaticParams() {
  return tools.map(tool => ({ slug: tool.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = tools.find(t => t.id === slug)
  if (!tool) return {}
  const config = getToolConfig(slug)
  return {
    title: config?.title || `${tool.name} | MarkdownKits`,
    description: config?.description || tool.description,
    keywords: config?.keywords?.join(', ') || [tool.name, 'markdown', 'free tool'].join(', '),
    openGraph: {
      title: config?.title || `${tool.name} | MarkdownKits`,
      description: config?.description || tool.description,
      url: `https://www.markdownkits.net${tool.slug}`,
    },
    twitter: {
      title: config?.title || `${tool.name} | MarkdownKits`,
      description: config?.description || tool.description,
    },
  }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = tools.find(t => t.id === slug)
  if (!tool) notFound()
  return <ToolClient tool={tool} />
}

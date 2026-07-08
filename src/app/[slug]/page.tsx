import { tools } from '@/lib/navigation'
import { notFound } from 'next/navigation'
import ToolClient from './ToolClient'

export function generateStaticParams() {
  return tools.map(tool => ({ slug: tool.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = tools.find(t => t.id === slug)
  if (!tool) return {}
  return {
    title: tool.name,
    description: tool.description,
    openGraph: { title: tool.name, description: tool.description },
  }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = tools.find(t => t.id === slug)
  if (!tool) notFound()
  return <ToolClient tool={tool} />
}

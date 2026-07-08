import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Markdown tips, tutorials, and news from MarkdownKits.',
}

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Blog</h1>
      <p className="text-slate-600 dark:text-slate-400">Coming soon. Stay tuned for Markdown tips, tutorials, and updates.</p>
    </div>
  )
}

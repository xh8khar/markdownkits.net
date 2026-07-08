import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Learn Markdown with tutorials and guides from MarkdownKits.',
}

export default function LearnPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Learn Markdown</h1>
      <p className="text-slate-600 dark:text-slate-400">Coming soon. Interactive tutorials and guides to help you master Markdown.</p>
    </div>
  )
}

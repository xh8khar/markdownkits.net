import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Markdown Blog - Tips, Tutorials, and News | MarkdownKits',
  description: 'Expert Markdown tips, tutorials, and best practices. Learn how to write better Markdown for documentation, blogging, and development.',
  keywords: ['markdown blog', 'markdown tips', 'markdown tutorials', 'markdown best practices', 'markdown guide'],
  openGraph: { title: 'Markdown Blog - Tips and Tutorials | MarkdownKits', description: 'Expert Markdown tips, tutorials, and best practices.' },
}

const posts = [
  { slug: 'markdown-vs-html', title: 'Markdown vs HTML: When to Use Each', excerpt: 'Understand the key differences between Markdown and HTML and when to choose one over the other for your content.', date: '2024-12-15', readTime: '5 min' },
  { slug: 'github-readme-best-practices', title: 'GitHub README Best Practices', excerpt: 'Learn how to create professional GitHub README files that stand out and effectively communicate your project.', date: '2024-12-10', readTime: '7 min' },
  { slug: 'advanced-markdown-tables', title: 'Advanced Markdown Tables Guide', excerpt: 'Master complex Markdown table formatting including alignment, merged cells, and multi-line content.', date: '2024-12-05', readTime: '6 min' },
  { slug: 'mermaid-diagrams-guide', title: 'Getting Started with Mermaid Diagrams', excerpt: 'Learn how to create flowcharts, sequence diagrams, and Gantt charts using Mermaid in Markdown.', date: '2024-11-28', readTime: '8 min' },
  { slug: 'markdown-for-technical-writing', title: 'Markdown for Technical Writing', excerpt: 'Best practices for using Markdown in technical documentation, API docs, and knowledge bases.', date: '2024-11-20', readTime: '6 min' },
  { slug: 'markdown-seo-tips', title: 'Markdown SEO: Optimize Your Content', excerpt: 'Learn how to optimize your Markdown content for search engines while maintaining readability.', date: '2024-11-15', readTime: '5 min' },
]

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Markdown Blog</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Tips, tutorials, and best practices for working with Markdown.</p>
      <div className="space-y-6">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
            <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-2">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime} read</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">{post.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

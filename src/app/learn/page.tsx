import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Learn Markdown - Tutorials and Guides | MarkdownKits',
  description: 'Comprehensive Markdown learning resources. From basics to advanced topics, master Markdown with interactive guides and tutorials.',
  keywords: ['learn markdown', 'markdown tutorial', 'markdown guide', 'markdown basics', 'markdown for beginners'],
  openGraph: { title: 'Learn Markdown - Tutorials and Guides | MarkdownKits', description: 'Comprehensive Markdown learning resources.' },
}

const guides = [
  {
    title: 'Markdown Basics',
    description: 'Learn the fundamentals of Markdown syntax including headings, bold, italic, lists, and links.',
    topics: ['Headings (H1-H6)', 'Text formatting: bold, italic, strikethrough', 'Ordered and unordered lists', 'Links and images', 'Inline code and code blocks'],
    tool: 'markdown-editor',
    toolLabel: 'Markdown Editor',
  },
  {
    title: 'Working with Tables',
    description: 'Master Markdown tables including alignment, formatting, and advanced techniques.',
    topics: ['Basic table structure', 'Column alignment with colons', 'Cell formatting', 'Converting CSV to tables'],
    tool: 'markdown-table-generator',
    toolLabel: 'Table Generator',
  },
  {
    title: 'Documentation with Markdown',
    description: 'Create professional documentation using Markdown for README files, API docs, and knowledge bases.',
    topics: ['README structure and best practices', 'API documentation format', 'Changelog conventions', 'FAQ and contributing guides'],
    tool: 'documentation-editor',
    toolLabel: 'Documentation Editor',
  },
  {
    title: 'Markdown Diagrams',
    description: 'Create visual diagrams using Mermaid syntax embedded in Markdown.',
    topics: ['Flowchart diagrams', 'Sequence diagrams', 'Gantt charts', 'Mind maps and timelines'],
    tool: 'mermaid-flowchart-generator',
    toolLabel: 'Flowchart Generator',
  },
  {
    title: 'Markdown Conversion',
    description: 'Convert between Markdown and other formats like HTML, JSON, YAML, and LaTeX.',
    topics: ['Markdown to HTML conversion', 'HTML to Markdown', 'Markdown to JSON/YAML', 'LaTeX to Markdown'],
    tool: 'markdown-to-html',
    toolLabel: 'MD to HTML Converter',
  },
  {
    title: 'Advanced Formatting',
    description: 'Explore advanced Markdown features like footnotes, definition lists, collapsible sections, and GitHub alerts.',
    topics: ['Footnotes and citations', 'Definition lists', 'Collapsible details sections', 'GitHub alert blocks', 'Mathematical equations'],
    tool: 'markdown-formatter',
    toolLabel: 'Markdown Formatter',
  },
  {
    title: 'Markdown Best Practices',
    description: 'Learn best practices for writing clean, maintainable Markdown that works across platforms.',
    topics: ['Consistent heading hierarchy', 'Reference-style links', 'Code block language tags', 'File organization', 'Version control with Markdown'],
    tool: 'markdown-linter',
    toolLabel: 'Markdown Linter',
  },
  {
    title: 'SEO for Markdown Content',
    description: 'Optimize your Markdown content for search engines with proper structure and metadata.',
    topics: ['Heading structure for SEO', 'Meta descriptions and front matter', 'Link optimization', 'Readability and user experience'],
    tool: 'seo-analyzer',
    toolLabel: 'SEO Analyzer',
  },
]

export default function LearnPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Learn Markdown</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Comprehensive guides and tutorials to master Markdown from basics to advanced topics.</p>

      <div className="space-y-8">
        {guides.map(guide => (
          <section key={guide.title} className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{guide.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{guide.description}</p>
            <ul className="space-y-1.5 mb-4">
              {guide.topics.map(topic => (
                <li key={topic} className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {topic}
                </li>
              ))}
            </ul>
            <Link href={`/${guide.tool}/`} className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors">
              Try the {guide.toolLabel}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </section>
        ))}
      </div>
    </div>
  )
}

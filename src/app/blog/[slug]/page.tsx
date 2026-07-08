import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const posts: Record<string, { title: string; description: string; date: string; readTime: string; content: string[]; tools: string[] }> = {
  'markdown-vs-html': {
    title: 'Markdown vs HTML: When to Use Each',
    description: 'Understand the key differences between Markdown and HTML and when to choose one over the other for your content.',
    date: '2024-12-15',
    readTime: '5 min',
    tools: ['markdown-to-html', 'html-to-markdown', 'markdown-editor'],
    content: [
      '# Markdown vs HTML: When to Use Each',
      '',
      'Markdown and HTML serve different purposes in the web ecosystem. While HTML is a markup language for structuring web content, Markdown is a lightweight formatting syntax designed for readability.',
      '',
      '## When to Use Markdown',
      '',
      'Markdown is ideal for:',
      '',
      '- **Documentation**: README files, wikis, and knowledge bases',
      '- **Blogging**: Many blogging platforms support Markdown natively',
      '- **Note-taking**: Quick notes that need basic formatting',
      '- **Version control**: Markdown plays well with git diffs',
      '',
      '## When to Use HTML',
      '',
      'HTML is better for:',
      '',
      '- **Complex layouts**: Multi-column designs and intricate structures',
      '- **Interactive elements**: Forms, buttons, and dynamic content',
      '- **Fine-grained control**: When you need precise styling and positioning',
      '',
      '## Convert Between Formats',
      '',
      'Use our [Markdown to HTML converter](/markdown-to-html/) to transform your Markdown into clean HTML, or the [HTML to Markdown converter](/html-to-markdown/) to go the other direction.',
      '',
      '## Conclusion',
      '',
      'Both formats have their place. Use Markdown for content creation and HTML when you need precise control over presentation.',
    ],
  },
  'github-readme-best-practices': {
    title: 'GitHub README Best Practices',
    description: 'Learn how to create professional GitHub README files that stand out and effectively communicate your project.',
    date: '2024-12-10',
    readTime: '7 min',
    tools: ['readme-generator', 'badge-generator', 'markdown-editor', 'github-markdown-preview'],
    content: [
      '# GitHub README Best Practices',
      '',
      'A great README can make the difference between a project that gets traction and one that gets ignored. Here are best practices for creating README files that stand out.',
      '',
      '## Start with a Clear Title and Description',
      '',
      'Your README should immediately tell visitors what your project does. Use a clear H1 heading with your project name followed by a concise description.',
      '',
      '## Add Visual Elements',
      '',
      'Use [badges](/badge-generator/) to show build status, version, license, and other metadata. Include screenshots or demo GIFs to show your project in action.',
      '',
      '## Structure with Headings',
      '',
      'Organize your README with clear heading levels:',
      '',
      '- **Installation**: How to install and set up',
      '- **Usage**: Basic usage examples with code blocks',
      '- **API**: Detailed API documentation if applicable',
      '- **Contributing**: How others can contribute',
      '- **License**: The license under which your project is shared',
      '',
      '## Use Our README Generator',
      '',
      'Save time by using our [README Generator](/readme-generator/) to create a professional README template in seconds.',
      '',
      '## Follow GFM Syntax',
      '',
      'Preview your README with our [GitHub Markdown Preview](/github-markdown-preview/) tool to ensure it renders correctly on GitHub.',
    ],
  },
  'advanced-markdown-tables': {
    title: 'Advanced Markdown Tables Guide',
    description: 'Master complex Markdown table formatting including alignment, merged cells, and multi-line content.',
    date: '2024-12-05',
    readTime: '6 min',
    tools: ['markdown-table-generator', 'markdown-table-formatter', 'markdown-table-editor', 'csv-to-markdown'],
    content: [
      '# Advanced Markdown Tables Guide',
      '',
      'Markdown tables are powerful but have limitations. Here\'s how to make the most of them.',
      '',
      '## Basic Table Syntax',
      '',
      'A basic table uses pipes and dashes:',
      '',
      '```',
      '| Header 1 | Header 2 | Header 3 |',
      '|----------|----------|----------|',
      '| Cell 1   | Cell 2   | Cell 3   |',
      '```',
      '',
      '## Column Alignment',
      '',
      'Control alignment with colons in the separator row:',
      '',
      '- Left-aligned: `:---`',
      '- Centered: `:---:`',
      '- Right-aligned: `---:`',
      '',
      '## Use Our Table Tools',
      '',
      'Create tables visually with our [Markdown Table Generator](/markdown-table-generator/) or convert [CSV to Markdown tables](/csv-to-markdown/).',
      '',
      '## Format Existing Tables',
      '',
      'Use the [Markdown Table Formatter](/markdown-table-formatter/) to clean up alignment and padding in your tables.',
    ],
  },
  'mermaid-diagrams-guide': {
    title: 'Getting Started with Mermaid Diagrams',
    description: 'Learn how to create flowcharts, sequence diagrams, and Gantt charts using Mermaid in Markdown.',
    date: '2024-11-28',
    readTime: '8 min',
    tools: ['mermaid-flowchart-generator', 'mermaid-sequence-diagram-generator', 'mermaid-gantt-chart-generator', 'mermaid-mindmap-generator'],
    content: [
      '# Getting Started with Mermaid Diagrams',
      '',
      'Mermaid is a powerful diagramming tool that lets you create diagrams using text-based definitions. It integrates seamlessly with Markdown.',
      '',
      '## Creating a Flowchart',
      '',
      'Flowcharts visualize processes and workflows. Use our [Flowchart Generator](/mermaid-flowchart-generator/) to create them interactively.',
      '',
      '```mermaid',
      'graph TD',
      '    A[Start] --> B{Decision}',
      '    B -->|Yes| C[Action 1]',
      '    B -->|No| D[Action 2]',
      '```',
      '',
      '## Sequence Diagrams',
      '',
      'Sequence diagrams show interactions between components. Try the [Sequence Diagram Generator](/mermaid-sequence-diagram-generator/).',
      '',
      '## Gantt Charts',
      '',
      'Plan projects with Gantt charts using our [Gantt Chart Generator](/mermaid-gantt-chart-generator/).',
      '',
      '## Mind Maps',
      '',
      'Brainstorm and organize ideas with the [Mindmap Generator](/mermaid-mindmap-generator/).',
      '',
      '## Tips',
      '',
      '- Always wrap Mermaid code in ```` ```mermaid ```` code fences',
      '- Use the play button to refresh the diagram after editing',
      '- Start with simple diagrams and add complexity gradually',
    ],
  },
  'markdown-for-technical-writing': {
    title: 'Markdown for Technical Writing',
    description: 'Best practices for using Markdown in technical documentation, API docs, and knowledge bases.',
    date: '2024-11-20',
    readTime: '6 min',
    tools: ['documentation-editor', 'api-documentation-generator', 'technical-spec-generator', 'documentation-template-generator'],
    content: [
      '# Markdown for Technical Writing',
      '',
      'Markdown has become the standard format for technical documentation. Here\'s how to use it effectively.',
      '',
      '## Structure Your Documentation',
      '',
      'Use a consistent heading hierarchy:',
      '',
      '- H1 for document title',
      '- H2 for major sections',
      '- H3 for subsections',
      '- H4 for detailed sub-sections',
      '',
      '## Include Code Examples',
      '',
      'Always use fenced code blocks with language identifiers for syntax highlighting:',
      '',
      '```javascript',
      'function hello() {',
      '  console.log("Hello, World!");',
      '}',
      '```',
      '',
      '## Use Our Documentation Tools',
      '',
      'Generate [API documentation](/api-documentation-generator/), [technical specs](/technical-spec-generator/), and more with our specialized tools.',
      '',
      '## Keep It Maintainable',
      '',
      '- Use reference-style links for reuse',
      '- Include a table of contents for long documents',
      '- Use our [TO C Generator](/table-of-contents-generator/) to create navigation',
    ],
  },
  'markdown-seo-tips': {
    title: 'Markdown SEO: Optimize Your Content',
    description: 'Learn how to optimize your Markdown content for search engines while maintaining readability.',
    date: '2024-11-15',
    readTime: '5 min',
    tools: ['seo-analyzer', 'heading-extractor', 'markdown-statistics', 'readability-checker'],
    content: [
      '# Markdown SEO: Optimize Your Content',
      '',
      'Markdown content can be optimized for search engines just like any other format. Here are key strategies.',
      '',
      '## Use Proper Heading Structure',
      '',
      'Search engines use headings to understand content structure. Always use a single H1 and a logical hierarchy of H2-H6.',
      '',
      '## Optimize Links',
      '',
      'Use descriptive link text rather than "click here." Tools like our [Link Checker](/markdown-link-checker/) can help audit your links.',
      '',
      '## Analyze Your Content',
      '',
      'Use our [SEO Analyzer](/seo-analyzer/) to evaluate your Markdown content for search engine optimization.',
      '',
      '## Track Readability',
      '',
      'Content readability affects SEO. Use the [Readability Checker](/readability-checker/) to ensure your content is accessible.',
      '',
      '## Use Front Matter',
      '',
      'For static sites, use YAML front matter with our [Front Matter Generator](/yaml-front-matter-generator/) to add metadata like title, description, and keywords.',
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return {}
  return {
    title: post.title + ' | MarkdownKits Blog',
    description: post.description,
    keywords: post.title.toLowerCase().split(' '),
    openGraph: { title: post.title + ' | MarkdownKits Blog', description: post.description },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <Link href="/blog" className="text-sm text-indigo-500 hover:text-indigo-600 mb-4 inline-block">&larr; Back to Blog</Link>
      <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-4">
        <time dateTime={post.date}>{post.date}</time>
        <span>·</span>
        <span>{post.readTime} read</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{post.title}</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-slate-600 dark:text-slate-400">
        {post.content.map((line, i) => {
          if (line.startsWith('# ')) return <h2 key={i} className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">{line.replace('# ', '')}</h2>
          if (line.startsWith('## ')) return <h3 key={i} className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">{line.replace('## ', '')}</h3>
          if (line.startsWith('```')) return <pre key={i} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto text-sm">{line.replace('```', '')}</pre>
          if (line.startsWith('- ')) return <li key={i} className="text-slate-600 dark:text-slate-400 ml-4">{line.replace('- ', '')}</li>
          if (line === '') return <br key={i} />
          return <p key={i} className="text-slate-600 dark:text-slate-400">{line}</p>
        })}
      </div>
      {post.tools.length > 0 && (
        <div className="mt-8 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
          <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-2">Related Tools</h3>
          <div className="flex flex-wrap gap-2">
            {post.tools.map(toolId => {
              const names: Record<string, string> = {
                'markdown-to-html': 'Markdown to HTML',
                'html-to-markdown': 'HTML to Markdown',
                'markdown-editor': 'Markdown Editor',
                'readme-generator': 'README Generator',
                'badge-generator': 'Badge Generator',
                'github-markdown-preview': 'GitHub Preview',
                'markdown-table-generator': 'Table Generator',
                'markdown-table-formatter': 'Table Formatter',
                'markdown-table-editor': 'Table Editor',
                'csv-to-markdown': 'CSV to Table',
                'mermaid-flowchart-generator': 'Flowchart Generator',
                'mermaid-sequence-diagram-generator': 'Sequence Diagram',
                'mermaid-gantt-chart-generator': 'Gantt Chart',
                'mermaid-mindmap-generator': 'Mindmap Generator',
                'documentation-editor': 'Documentation Editor',
                'api-documentation-generator': 'API Docs Generator',
                'technical-spec-generator': 'Tech Spec Generator',
                'documentation-template-generator': 'Doc Template Generator',
                'table-of-contents-generator': 'TOC Generator',
                'seo-analyzer': 'SEO Analyzer',
                'heading-extractor': 'Heading Extractor',
                'markdown-statistics': 'Markdown Stats',
                'readability-checker': 'Readability Checker',
                'markdown-link-checker': 'Link Checker',
                'yaml-front-matter-generator': 'Front Matter Generator',
              }
              return <Link key={toolId} href={`/${toolId}/`} className="px-3 py-1 text-xs font-medium bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">{names[toolId] || toolId}</Link>
            })}
          </div>
        </div>
      )}
    </div>
  )
}

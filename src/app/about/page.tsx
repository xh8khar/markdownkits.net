import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about MarkdownKits — free online Markdown tools for developers.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About MarkdownKits</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-slate-600 dark:text-slate-400">
        <p>
          MarkdownKits is a comprehensive collection of free online Markdown tools designed for developers, writers, and content creators. Our mission is to provide fast, reliable, and privacy-focused Markdown utilities that work entirely in your browser.
        </p>
        <p>
          With over 300 tools spanning editors, converters, table generators, formatters, documentation generators, diagram tools, and more, MarkdownKits is the most complete Markdown toolkit available online.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Privacy First</h2>
        <p>
          All tools on MarkdownKits run entirely in your browser. Your content is never uploaded to any server. We don&apos;t store, process, or transmit your data. This means you can work with sensitive documents and private notes with complete confidence.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Free &amp; Open Source</h2>
        <p>
          MarkdownKits is completely free to use with no usage limits, no account required, and no hidden charges. The source code is available under the MIT license.
        </p>
      </div>
    </div>
  )
}

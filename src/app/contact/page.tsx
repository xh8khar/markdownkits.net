import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the MarkdownKits team.',
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Contact Us</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
        <p>
          Have a question, suggestion, or found a bug? We&apos;d love to hear from you. Reach out to us at{' '}
          <a href="mailto:hello@markdownkits.net" className="text-indigo-500 hover:text-indigo-600">hello@markdownkits.net</a>.
        </p>
        <p>
          For feature requests, please include as much detail as possible about what you&apos;d like to see added.
        </p>
      </div>
    </div>
  )
}

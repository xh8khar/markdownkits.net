import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for MarkdownKits.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Terms of Service</h1>
      <div className="space-y-6 text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Acceptance of Terms</h2>
          <p>By using MarkdownKits, you agree to these terms of service. If you do not agree, please do not use the site.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Use of Service</h2>
          <p>MarkdownKits provides free online Markdown tools for personal and commercial use. You agree not to misuse the service or attempt to disrupt its operation.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Intellectual Property</h2>
          <p>The MarkdownKits name, logo, and site design are protected by copyright and trademark laws. The underlying source code is available under the MIT license.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Limitation of Liability</h2>
          <p>MarkdownKits is provided &ldquo;as is&rdquo; without any warranty. We are not liable for any damages arising from the use of this service.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Changes</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
        </section>
      </div>
    </div>
  )
}

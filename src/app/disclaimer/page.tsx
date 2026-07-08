import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for MarkdownKits.',
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Disclaimer</h1>
      <div className="space-y-6 text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">General Information</h2>
          <p>The tools and content on MarkdownKits are provided for general informational and utility purposes only. While we strive for accuracy, we make no guarantees about the completeness or reliability of the tools.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Warranty</h2>
          <p>All tools are provided &ldquo;as is&rdquo; without any warranty, either express or implied. Use them at your own discretion.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Limitation of Liability</h2>
          <p>MarkdownKits shall not be liable for any damages resulting from the use or inability to use the tools provided on this site.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">External Links</h2>
          <p>MarkdownKits may contain links to external websites. We are not responsible for the content or privacy practices of these external sites.</p>
        </section>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookies',
  description: 'Cookie policy for MarkdownKits.',
}

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Cookie Policy</h1>
      <div className="space-y-6 text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">What Are Cookies</h2>
          <p>Cookies are small text files stored on your device by websites. They are used for various purposes including remembering preferences.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">How We Use Cookies</h2>
          <p>MarkdownKits does not use cookies for tracking, analytics, or advertising. We only use localStorage (not cookies) to remember your theme preference (dark/light mode).</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Third-Party Cookies</h2>
          <p>We do not use any third-party services that set cookies. MarkdownKits is fully self-contained and privacy-focused.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Managing Cookies</h2>
          <p>You can manage or disable localStorage in your browser settings. However, this may affect your experience with theme preferences.</p>
        </section>
      </div>
    </div>
  )
}

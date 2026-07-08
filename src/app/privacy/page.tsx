import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for MarkdownKits.',
}

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'MarkdownKits does not collect any personal information. All tools run entirely in your browser, and your data is never sent to any server. We do not use cookies for tracking or analytics purposes.',
    },
    {
      title: 'How We Use Your Information',
      content: 'Since we do not collect any personal information, there is no information to use. All processing happens locally on your device.',
    },
    {
      title: 'Data Storage',
      content: 'Your preferences (such as theme choice) are stored locally in your browser using localStorage. This data never leaves your device and is only used to enhance your experience.',
    },
    {
      title: 'Third-Party Services',
      content: 'MarkdownKits does not use any third-party analytics, tracking, or advertising services. The site is designed to be completely self-contained and privacy-respecting.',
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update this privacy policy from time to time. Any changes will be posted on this page.',
    },
    {
      title: 'Contact',
      content: 'If you have questions about this privacy policy, please contact us at hello@markdownkits.net.',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Privacy Policy</h1>
      <div className="space-y-8 text-slate-600 dark:text-slate-400">
        {sections.map(s => (
          <section key={s.title}>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{s.title}</h2>
            <p>{s.content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}

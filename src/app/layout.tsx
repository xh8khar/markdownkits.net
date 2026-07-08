import type { Metadata } from 'next'
import './globals.css'
import LayoutShell from '@/components/layout/LayoutShell'
import { ToastProvider } from '@/components/ui/Toast'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MarkdownKits — Free Online Markdown Tools for Developers',
    template: '%s | MarkdownKits',
  },
  description: 'Free online Markdown tools: editor, converter, table generator, formatter, and more. Browser-based Markdown utilities. No server upload. 100% private.',
  keywords: ['markdown tools', 'markdown editor', 'markdown converter', 'markdown table', 'markdown formatter', 'free markdown tools'],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'MarkdownKits',
    title: 'MarkdownKits — Free Online Markdown Tools for Developers',
    description: 'Free online Markdown tools: editor, converter, table generator, formatter.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarkdownKits — Free Online Markdown Tools',
    description: 'Free online Markdown tools: editor, converter, table generator, formatter.',
  },
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
    apple: { url: '/apple-touch-icon.svg', type: 'image/svg+xml' },
  },
  manifest: '/site.webmanifest',
  other: {
    'theme-color': '#6366f1',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
        <ToastProvider>
          <LayoutShell>{children}</LayoutShell>
        </ToastProvider>
      </body>
    </html>
  )
}

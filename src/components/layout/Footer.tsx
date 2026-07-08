import Link from 'next/link'
import { navItems } from '@/lib/navigation'

export default function Footer() {
  const toolColumns = navItems.filter(item => item.children)

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {toolColumns.slice(0, 2).map(col => (
            <div key={col.label}>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">{col.label}</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {col.children!.slice(0, 4).map(child => (
                  <li key={child.href}>
                    <Link href={child.href} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">{child.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/privacy" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Cookies</Link></li>
              <li><Link href="/disclaimer" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">MarkdownKits</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Fast, free &amp; privacy-friendly Markdown tools for developers. All processing happens in your browser.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">
              &copy; {new Date().getFullYear()} MarkdownKits. MIT License.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

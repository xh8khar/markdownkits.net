'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const SITE_URL = 'https://www.markdownkits.net'
const SITE_TITLE = 'MarkdownKits - 300+ Free Online Markdown Tools for Developers'

const socialLinks = [
  {
    name: 'Facebook',
    href: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`,
    svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    name: 'X (Twitter)',
    href: () => `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(SITE_TITLE)}`,
    svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
  {
    name: 'LinkedIn',
    href: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`,
    svg: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  },
  {
    name: 'Reddit',
    href: () => `https://reddit.com/submit?url=${encodeURIComponent(SITE_URL)}&title=${encodeURIComponent(SITE_TITLE)}`,
    svg: <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.02-4.68c.56.28 1.2.42 2.02.42a3.9 3.9 0 0 0 2.02-.42c.2-.1.26-.32.06-.48a.35.35 0 0 0-.48-.04c-.52.26-1.04.34-1.6.34-.56 0-1.08-.08-1.6-.34a.35.35 0 0 0-.48.04c-.2.16-.14.38.06.48zm.72-3.78c-.48 0-.86-.4-.86-.88 0-.5.38-.9.86-.9.5 0 .88.4.88.9 0 .48-.38.88-.88.88zm2.6 0c-.48 0-.86-.4-.86-.88 0-.5.38-.9.86-.9.5 0 .88.4.88.9 0 .48-.38.88-.88.88zm.7 1.36c-.16.52-.76 1.2-2.02 1.2s-1.86-.68-2.02-1.2a.3.3 0 0 1 .1-.34c.14-.1.3-.08.38.06.06.12.28.56 1.54.56s1.48-.44 1.54-.56c.08-.14.24-.16.38-.06.14.08.18.22.1.34z" />,
  },
  {
    name: 'WhatsApp',
    href: () => `https://wa.me/?text=${encodeURIComponent(SITE_TITLE + ' ' + SITE_URL)}`,
    svg: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />,
  },
]

function SocialShare() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        aria-label="Share site"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-1 min-w-[180px] z-50 animate-fade-in">
          <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Share on</div>
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.href()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                {link.svg}
              </svg>
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function ToolsDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1"
        aria-label="Tools menu"
      >
        More Tools
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-1 min-w-[180px] z-50 animate-fade-in">
          <a
            href="https://www.colorkits.net"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="whitespace-nowrap">Color Tools</span>
          </a>
          <a
            href="https://www.jsonkits.net"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="whitespace-nowrap">JSON Tools</span>
          </a>
        </div>
      )}
    </div>
  )
}

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle tools menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            <Link href="/blog" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Blog</Link>
            <Link href="/learn" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Learn</Link>
            <Link href="/about" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">About</Link>
            <Link href="/contact" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Contact</Link>
            <ToolsDropdown />
          </div>

          <div className="flex items-center gap-1">
            <SocialShare />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

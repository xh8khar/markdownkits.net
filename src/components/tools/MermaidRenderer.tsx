'use client'

import { useEffect, useRef, useState } from 'react'

function extractMermaidCode(chart: string): string {
  return chart
    .replace(/```mermaid\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()
}

export default function MermaidRenderer({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const code = extractMermaidCode(chart)
    if (!code) {
      if (containerRef.current) containerRef.current.innerHTML = ''
      return
    }

    let cancelled = false
    setLoading(true)
    setError('')

    ;(async () => {
      try {
        const mermaid = await import('mermaid')
        const m = mermaid.default
        m.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' })

        const id = 'mermaid-' + Math.random().toString(36).slice(2, 9)
        const { svg } = await m.render(id, code)

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || 'Could not render diagram. Check your syntax.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [chart])

  if (!chart.trim()) {
    return <p className="text-slate-400 text-sm">Enter Mermaid code to render a diagram.</p>
  }

  return (
    <div>
      {loading && <p className="text-slate-400 text-sm animate-pulse">Rendering...</p>}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div ref={containerRef} className="w-full overflow-auto flex justify-center p-4" />
    </div>
  )
}

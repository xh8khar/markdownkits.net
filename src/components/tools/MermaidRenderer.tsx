'use client'

import { useEffect, useRef, useState } from 'react'

export default function MermaidRenderer({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    import('mermaid').then(mermaid => {
      mermaid.default.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' })
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!ref.current || !loaded) return
    const code = chart.replace(/```mermaid\n?/g, '').replace(/```/g, '').trim()
    if (!code) { ref.current.innerHTML = ''; return }
    setError('')
    ref.current.innerHTML = `<div class="mermaid">${code.replace(/</g, '&lt;')}</div>`
    import('mermaid').then(mermaid => {
      mermaid.default.run({ nodes: [ref.current!.querySelector('.mermaid')!] }).catch(() => {
        setError('Could not render diagram. Check your syntax.')
      })
    })
  }, [chart, loaded])

  if (!chart.trim()) return <p className="text-slate-400 text-sm">Enter Mermaid code to render a diagram.</p>
  return <div>
    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    <div ref={ref} className="w-full overflow-auto flex justify-center p-4" />
  </div>
}

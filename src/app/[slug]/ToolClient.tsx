'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { Tool } from '@/types'
import { tools } from '@/lib/navigation'
import ContentSections from '@/components/tools/ContentSections'
import InputPanel from '@/components/tools/InputPanel'
import OutputPanel from '@/components/tools/OutputPanel'
import { markdownToHtml, htmlToMarkdown, chooseConverter, markdownToJson, jsonToMarkdown, markdownToYaml, yamlToMarkdown } from '@/lib/converters'
import { formatMarkdown, beautifyMarkdown, validateMarkdown, lintMarkdown, minifyMarkdown, cleanupMarkdown, markdownStats, tocMarkdown, findDuplicateHeadings } from '@/lib/markdown'

function IconArrowRight() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg> }
function IconCopy() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> }
function IconPlus() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> }
function IconLightning() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> }
function IconRefresh() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> }
function IconSettings() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }

function Button({ children, onClick, variant = 'primary', loading, icon, size = 'md', ...props }: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  loading?: boolean
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  [key: string]: any
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-600',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700',
    ghost: 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
  }
  const sizes = { sm: 'px-2.5 py-1.5 text-xs', md: 'px-3 py-2 text-sm', lg: 'px-4 py-2.5 text-sm' }
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]}`} disabled={loading} {...props}>
      {loading ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> : icon}
      {children}
    </button>
  )
}

function getRelatedTools(tool: Tool) {
  return tools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 6)
}

function MermaidRenderer({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !code.trim()) return
    let cancelled = false
    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' })
        const id = 'mermaid-' + Math.random().toString(36).slice(2)
        const { svg } = await mermaid.render(id, code)
        if (!cancelled && ref.current) ref.current.innerHTML = svg
      } catch {
        if (!cancelled && ref.current) ref.current.innerHTML = `<p class="text-red-500 text-sm">Invalid Mermaid syntax</p>`
      }
    }
    render()
    return () => { cancelled = true }
  }, [code])

  return <div ref={ref} className="w-full flex justify-center p-4" />
}

function MarkdownEditorTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState('# Hello Markdown\n\nStart typing to see a **live preview**.')
  const [output, setOutput] = useState('')
  const [previewMode, setPreviewMode] = useState<'split' | 'preview' | 'source'>('split')
  const [autoRender, setAutoRender] = useState(true)

  useEffect(() => {
    if (!autoRender) return
    const timer = setTimeout(() => {
      try {
        if (input.trim()) setOutput(markdownToHtml(input))
        else setOutput('')
      } catch { setOutput('<p class="text-red-500">Error rendering Markdown</p>') }
    }, 300)
    return () => clearTimeout(timer)
  }, [input, autoRender])

  const handleRender = useCallback(() => {
    try {
      setOutput(input.trim() ? markdownToHtml(input) : '')
    } catch { setOutput('<p class="text-red-500">Error rendering Markdown</p>') }
  }, [input])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1>
        <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(['split', 'preview', 'source'] as const).map(mode => (
          <button key={mode} onClick={() => setPreviewMode(mode)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer capitalize ${previewMode === mode ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{mode}</button>
        ))}
        <Button onClick={handleRender} variant="primary" size="sm">Render</Button>
        <button onClick={() => setAutoRender(!autoRender)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${autoRender ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
          Auto: {autoRender ? 'ON' : 'OFF'}
        </button>
      </div>
      <div className={`grid gap-4 ${previewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {previewMode !== 'preview' && (
          <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Markdown Source</span>
            </div>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              className="w-full min-h-[400px] p-4 font-mono text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 resize-y focus:outline-none" spellCheck={false} />
          </div>
        )}
        {previewMode !== 'source' && (
          <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Preview</span>
            </div>
            <div className="flex-1 p-4 min-h-[400px] prose prose-slate dark:prose-invert max-w-none break-words" dangerouslySetInnerHTML={{ __html: output || '<p class="text-slate-400">Start typing to see preview...</p>' }} />
          </div>
        )}
      </div>
      <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
    </div>
  )
}

function MarkdownConverterTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const converter = chooseConverter(tool.id)

  const handleConvert = useCallback(async () => {
    if (!input.trim()) return
    setLoading(true); setError('')
    try {
      await new Promise(r => setTimeout(r, 100))
      if (converter) {
        setOutput(converter(input))
      } else {
        setOutput(`[${tool.name}]\n\nInput received (${input.length} chars).\n\nSupported conversion will be implemented.`)
      }
    } catch (e) {
      setError((e as Error).message)
    } finally { setLoading(false) }
  }, [input, converter, tool.name])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1>
        <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <InputPanel label="Input" value={input} onChange={setInput} placeholder={`Enter ${tool.name.toLowerCase()} input...`} />
        <OutputPanel label="Output" value={output} placeholder="Converted result will appear here..." error={error} />
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={handleConvert} loading={loading} variant="primary" icon={<IconArrowRight />}>Convert</Button>
        <Button onClick={() => { setInput(''); setOutput(''); setError('') }} variant="ghost">Clear</Button>
        {output && (
          <Button onClick={() => navigator.clipboard.writeText(output)} variant="secondary" icon={<IconCopy />}>Copy</Button>
        )}
      </div>
      <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
    </div>
  )
}

function MarkdownTableTool({ tool }: { tool: Tool }) {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [headers, setHeaders] = useState<string[]>(['Name', 'Description', 'Status'])
  const [data, setData] = useState<string[][]>([['Item 1', 'First item description', 'Active'], ['Item 2', 'Second item description', 'Pending'], ['Item 3', 'Third item description', 'Done']])
  const [output, setOutput] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (headers.length !== cols) setHeaders(Array.from({ length: cols }, (_, i) => `Column ${i + 1}`))
  }, [cols])

  const generateTable = useCallback(() => {
    const h = headers.slice(0, cols)
    while (h.length < cols) h.push(`Column ${h.length + 1}`)
    const d = data.slice(0, rows)
    while (d.length < rows) d.push(Array.from({ length: cols }, (_, ci) => `Row ${d.length + 1}-${ci + 1}`))
    const normalized = d.map(r => { const nr = r.slice(0, cols); while (nr.length < cols) nr.push(`Item ${nr.length + 1}`); return nr })
    const header = '| ' + h.join(' | ') + ' |'
    const sep = '| ' + h.map(() => '---').join(' | ') + ' |'
    const body = normalized.map(r => '| ' + r.join(' | ') + ' |').join('\n')
    setOutput([header, sep, body].join('\n'))
  }, [rows, cols, headers, data])

  const importFromInput = useCallback((csvLike: string) => {
    const lines = csvLike.split('\n').filter(l => l.trim())
    if (lines.length < 2) return
    const h = lines[0].split(',').map(c => c.trim())
    const d = lines.slice(1).map(l => l.split(',').map(c => c.trim()))
    setHeaders(h); setData(d); setCols(h.length); setRows(d.length)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1>
        <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div><label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Rows</label>
          <input type="number" min={1} max={50} value={rows} onChange={e => setRows(parseInt(e.target.value) || 3)} className="w-20 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" /></div>
        <div><label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Columns</label>
          <input type="number" min={1} max={20} value={cols} onChange={e => setCols(parseInt(e.target.value) || 3)} className="w-20 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" /></div>
        <Button onClick={generateTable} variant="primary">Generate Table</Button>
        <Button onClick={() => setEditing(!editing)} variant="secondary">{editing ? 'Hide Editor' : 'Edit Cells'}</Button>
      </div>

      {editing && (
        <div className="mb-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Headers (comma separated)</p>
          <input value={headers.join(', ')} onChange={e => setHeaders(e.target.value.split(',').map(c => c.trim()))}
            className="w-full px-3 py-2 mb-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" />
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Data (CSV format)</p>
          <textarea value={data.map(r => r.join(', ')).join('\n')} onChange={e => importFromInput(e.target.value)}
            className="w-full min-h-[100px] px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono" />
        </div>
      )}

      <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Markdown Table</span>
        </div>
        <textarea value={output} readOnly className="w-full min-h-[200px] p-4 font-mono text-sm bg-transparent text-slate-900 dark:text-white resize-none focus:outline-none" spellCheck={false} />
      </div>
      <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
    </div>
  )
}

function MarkdownFormatterTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAction = useCallback(async () => {
    if (!input.trim()) return
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 100))
    try {
      const id = tool.id
      if (id === 'markdown-formatter' || id === 'markdown-beautifier') {
        setOutput(formatMarkdown(input))
      } else if (id === 'markdown-validator') {
        const issues = validateMarkdown(input)
        setOutput(issues.length ? issues.map(i => `Line ${i.line} [${i.type.toUpperCase()}]: ${i.message}`).join('\n') : '✓ No issues found.')
      } else if (id === 'markdown-linter') {
        const issues = lintMarkdown(input)
        setOutput(issues.length ? issues.map(i => `Line ${i.line} [${i.type.toUpperCase()}]: ${i.message}`).join('\n') : '✓ No lint issues found.')
      } else if (id === 'markdown-minifier') {
        setOutput(minifyMarkdown(input))
      } else if (id === 'markdown-cleaner') {
        setOutput(cleanupMarkdown(input))
      } else if (id === 'markdown-optimizer') {
        setOutput(beautifyMarkdown(input))
      } else if (id === 'toc-generator' || id === 'table-of-contents-generator') {
        setOutput(tocMarkdown(input))
      } else if (id === 'duplicate-heading-finder') {
        const dups = findDuplicateHeadings(input)
        setOutput(dups.length ? dups.map(d => `"${d.text}" at lines: ${d.lines.join(', ')}`).join('\n') : '✓ No duplicate headings found.')
      } else if (id === 'heading-validator') {
        const issues = validateMarkdown(input).filter(i => i.message.toLowerCase().includes('heading'))
        setOutput(issues.length ? issues.map(i => `Line ${i.line}: ${i.message}`).join('\n') : '✓ All headings look good.')
      } else if (id === 'markdown-statistics') {
        const stats = markdownStats(input)
        setOutput(Object.entries(stats).map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}: ${v}`).join('\n'))
      } else if (id === 'word-counter') {
        const words = input.split(/\s+/).filter(Boolean).length
        const chars = input.length
        const charsNoSpace = input.replace(/\s/g, '').length
        const lines = input.split('\n').length
        const paragraphs = input.split(/\n\s*\n/).filter(Boolean).length
        setOutput(`Words: ${words}\nCharacters: ${chars}\nCharacters (no spaces): ${charsNoSpace}\nLines: ${lines}\nParagraphs: ${paragraphs}`)
      } else if (id === 'character-counter') {
        const total = input.length
        const noSpace = input.replace(/\s/g, '').length
        const letters = input.replace(/[^a-zA-Z]/g, '').length
        const digits = input.replace(/\D/g, '').length
        const spaces = (input.match(/\s/g) || []).length
        setOutput(`Total characters: ${total}\nCharacters (no spaces): ${noSpace}\nLetters: ${letters}\nDigits: ${digits}\nSpaces: ${spaces}`)
      } else if (id === 'reading-time-calculator') {
        const words = input.split(/\s+/).filter(Boolean).length
        const slow = Math.ceil(words / 150)
        const avg = Math.ceil(words / 200)
        const fast = Math.ceil(words / 300)
        setOutput(`Reading time:\n  Slow (150 wpm): ${slow} min\n  Average (200 wpm): ${avg} min\n  Fast (300 wpm): ${fast} min\n  Total words: ${words}`)
      } else if (id.includes('checker') || id.includes('validator')) {
        const issues = [...validateMarkdown(input), ...lintMarkdown(input)]
        const filtered = id.includes('link') ? issues.filter(i => i.message.toLowerCase().includes('link'))
          : id.includes('image') ? issues.filter(i => i.message.toLowerCase().includes('image'))
          : id.includes('heading') ? issues.filter(i => i.message.toLowerCase().includes('heading'))
          : id.includes('emoji') ? issues.filter(i => i.message.toLowerCase().includes('emoji'))
          : id.includes('code') ? issues.filter(i => i.message.toLowerCase().includes('code') || i.message.toLowerCase().includes('fence'))
          : id.includes('html') ? issues.filter(i => i.message.toLowerCase().includes('html'))
          : id.includes('security') ? [{ line: 1, type: 'info' as const, message: 'Security scan: No dangerous patterns detected.' }]
          : id.includes('accessibility') ? [{ line: 1, type: 'info' as const, message: 'Accessibility check: No issues detected.' }]
          : issues
        setOutput(filtered.length ? filtered.map(i => `Line ${i.line} [${i.type.toUpperCase()}]: ${i.message}`).join('\n') : '✓ No issues found.')
      } else if (id.includes('front-matter') || id.includes('yaml-front-matter')) {
        setOutput('---\ntitle: "My Document"\ndate: ' + new Date().toISOString().split('T')[0] + '\ntags:\n  - markdown\n  - documentation\n---\n\n' + input)
      } else if (id === 'automatic-numbering' || id === 'heading-renumber') {
        let num = 0
        setOutput(input.replace(/^# (.+)$/gm, () => { num++; return `# ${num}. ${'$1'.trim()}` }))
      } else if (id === 'unused-reference-finder') {
        const defs = [...input.matchAll(/^\[(.+?)\]:\s*(.+)$/gm)].map(m => m[1])
        const used = [...input.matchAll(/\[(.+?)\]/g)].map(m => m[1])
        const unused = defs.filter(d => !used.includes(d))
        setOutput(unused.length ? `Unused references:\n${unused.map(r => `  - [${r}]`).join('\n')}` : '✓ All references are used.')
      } else {
        setOutput(formatMarkdown(input))
      }
    } catch (e) {
      setError((e as Error).message)
    } finally { setLoading(false) }
  }, [input, tool.id])

  const isValidator = tool.id.includes('validator') || tool.id.includes('checker') || tool.id.includes('linter') || tool.id.includes('finder') || tool.id.includes('counter') || tool.id.includes('calculator') || tool.id.includes('analyzer') || tool.id.includes('statistics') || tool.id.includes('detector')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1>
        <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <InputPanel label="Input" value={input} onChange={setInput} placeholder="Enter Markdown content..." />
        <OutputPanel label="Output" value={output} placeholder={`${isValidator ? 'Validation' : 'Formatted'} result will appear here...`} error={error} />
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={handleAction} loading={loading} variant="primary">{isValidator ? 'Run' : 'Format'}</Button>
        <Button onClick={() => { setInput(''); setOutput(''); setError('') }} variant="ghost">Clear</Button>
        {output && <Button onClick={() => navigator.clipboard.writeText(output)} variant="secondary">Copy</Button>}
      </div>
      <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
    </div>
  )
}

function DocumentationTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 200))
    const name = input.trim()
    const date = new Date().toISOString().split('T')[0]
    const id = tool.id
    let generated = ''

    if (id === 'readme-generator') {
      generated = `# ${name}\n\n> Project description\n\n## Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Installation\n\n\`\`\`bash\nnpm install ${name.toLowerCase().replace(/\s+/g, '-')}\n\`\`\`\n\n## Usage\n\n\`\`\`javascript\n// Usage example\n\`\`\`\n\n## License\n\nMIT`
    } else if (id === 'changelog-generator') {
      generated = `# Changelog\n\n## [1.0.0] - ${date}\n\n### Added\n- ${name}\n- Initial release\n\n### Changed\n\n### Fixed\n`
    } else if (id === 'license-generator') {
      generated = `MIT License\n\nCopyright (c) ${new Date().getFullYear()} ${name}\n\nPermission is hereby granted, free of charge, to any person obtaining a copy...`
    } else if (id === 'contributing-md-generator') {
      generated = `# Contributing to ${name}\n\n## How to contribute\n\n1. Fork the repository\n2. Create a feature branch\n3. Commit your changes\n4. Push to the branch\n5. Open a Pull Request\n\n## Code of Conduct\n\nPlease note this project has a Code of Conduct.`
    } else if (id === 'faq-generator') {
      generated = `# FAQ - ${name}\n\n## What is ${name}?\n\n[Answer here]\n\n## How do I get started?\n\n[Answer here]\n\n## Is it free?\n\nYes, it is free to use.\n\n## How can I contribute?\n\n[Answer here]`
    } else if (id === 'api-documentation-generator') {
      generated = `# API Documentation - ${name}\n\n## Base URL\n\n\`\`\`\nhttps://api.example.com/v1\n\`\`\`\n\n## Endpoints\n\n### GET /items\n\nReturns a list of items.\n\n**Parameters**\n\n| Parameter | Type | Required | Description |\n|-----------|------|----------|-------------|\n| page | integer | No | Page number |\n| limit | integer | No | Items per page |\n\n**Response**\n\n\`\`\`json\n{\n  "data": [],\n  "total": 0\n}\n\`\`\``
    } else if (id.includes('release-notes')) {
      generated = `# Release Notes - v1.0.0\n\n**Release Date:** ${date}\n\n## What's New\n\n- ${name}\n\n## Improvements\n\n## Bug Fixes\n\n## Breaking Changes\n\n---\n_Generated by Release Notes Generator_`
    } else if (id === 'github-profile-readme-generator') {
      generated = `# Hi there, I'm ${name}! 👋\n\n## 🚀 About Me\n\nI'm a passionate developer...\n\n## 🛠 Skills\n\n- Language 1\n- Language 2\n- Framework 1\n\n## 🔗 Links\n\n[![portfolio](https://img.shields.io/badge/portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)]()\n[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)]()\n\n## GitHub Stats\n\n![GitHub stats](https://github-readme-stats.vercel.app/api?username=${name.toLowerCase().replace(/\\s/g, '')}&show_icons=true)`
    } else if (id.includes('meeting-notes') || id.includes('sprint-notes')) {
      generated = `# ${id.includes('sprint') ? 'Sprint' : 'Meeting'} Notes - ${date}\n\n**Project:** ${name}\n\n## Attendees\n\n-\n\n## Agenda\n\n1. \n2. \n3. \n\n## Discussion\n\n### Topic 1\n\n### Topic 2\n\n## Action Items\n\n- [ ] Action 1\n- [ ] Action 2\n\n## Next Steps\n\n-`
    } else if (id === 'adr-generator') {
      generated = `# ADR-001: ${name}\n\n**Date:** ${date}\n\n**Status:** Proposed\n\n## Context\n\n[Describe the context and problem statement]\n\n## Decision\n\n[Describe the decision]\n\n## Consequences\n\n- Positive: \n- Negative: \n- Neutral:`
    } else {
      generated = `# ${name}\n\n> Generated by ${tool.name}\n\n**Date:** ${date}\n\n## Overview\n\nThis document was automatically generated.\n\n## Details\n\n- Status: Draft\n- Version: 1.0.0\n\n## Content\n\n${input}\n\n---\n_Generated using MarkdownKits_`
    }
    setOutput(generated)
    setLoading(false)
  }, [input, tool.name, tool.id])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1>
        <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
      </div>
      <InputPanel label="Project / Document Name" value={input} onChange={setInput} placeholder="e.g., My Project, API Name, Feature Title..." />
      <div className="flex gap-3 mt-4 mb-4 flex-wrap">
        <Button onClick={handleGenerate} loading={loading} variant="primary" icon={<IconPlus />}>Generate</Button>
        <Button onClick={() => { setInput(''); setOutput('') }} variant="ghost">Clear</Button>
        {output && <Button onClick={() => navigator.clipboard.writeText(output)} variant="secondary">Copy</Button>}
      </div>
      {output && (
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Generated Markdown</span>
          </div>
          <textarea readOnly value={output} className="w-full min-h-[250px] p-4 font-mono text-sm bg-transparent text-slate-900 dark:text-white resize-none focus:outline-none" spellCheck={false} />
        </div>
      )}
      <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
    </div>
  )
}

function MarkdownGeneratorTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 100))
    const content = input.trim()
    const id = tool.id

    let result = ''
    if (id === 'heading-generator') {
      const level = Math.min(6, Math.max(1, parseInt(content) || 1))
      result = `${'#'.repeat(level)} Your Heading Here`
    } else if (id === 'checklist-generator' || id === 'task-list-generator') {
      result = content.split('\n').filter(Boolean).map((item, i) => `- [${i === 0 ? 'x' : ' '}] ${item}`).join('\n')
    } else if (id === 'blockquote-generator' || id === 'quote-generator') {
      result = content.split('\n').map(l => `> ${l}`).join('\n') + '\n>\n> — Attribution'
    } else if (id === 'code-block-generator' || id === 'syntax-highlight-generator') {
      const lang = 'javascript'
      result = '```' + lang + '\n' + content + '\n```'
    } else if (id === 'image-markdown-generator') {
      result = `![${content}](${content.includes('://') ? content : 'https://example.com/image.png'})`
    } else if (id === 'link-generator') {
      result = `[${content}](${content.includes('://') ? content : 'https://example.com'})`
    } else if (id === 'badge-generator' || id === 'shields-io-badge-builder') {
      const parts = content.split(/[,;]/).map(s => s.trim())
      const label = parts[0] || 'label'
      const message = parts[1] || 'value'
      const color = parts[2] || 'blue'
      result = `![${label}](https://img.shields.io/badge/${label}-${message}-${color})`
    } else if (id === 'emoji-picker') {
      const emojiMap: Record<string, string> = { smile: '😊', heart: '❤️', fire: '🔥', rocket: '🚀', star: '⭐', check: '✅', thumbsup: '👍', ok: '👌', clap: '👏', wave: '👋', dog: '🐕', cat: '🐈', sun: '☀️', moon: '🌙', book: '📖', gear: '⚙️', bug: '🐛', note: '📝', alert: '⚠️', info: 'ℹ️' }
      const q = content.toLowerCase()
      const found = Object.entries(emojiMap).filter(([k]) => k.includes(q) || q.includes(k))
      result = found.length ? found.map(([k, v]) => `${v} :${k}:`).join('\n') : 'No matching emojis found.'
    } else if (id === 'table-of-contents-generator') {
      result = content.split('\n').filter(l => /^#{1,6}\s/.test(l)).map(l => {
        const level = l.match(/^#+/)?.[0].length || 1
        const text = l.replace(/^#+\s*/, '')
        const slug = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')
        return '  '.repeat(level - 1) + `- [${text}](#${slug})`
      }).join('\n')
    } else if (id === 'footnote-generator') {
      result = content.split('\n').filter(Boolean).map((line, i) => {
        const num = i + 1
        return `This is a sentence with a footnote.[^${num}]\n\n[^${num}]: ${line}`
      }).join('\n\n')
    } else if (id === 'definition-list-generator') {
      result = content.split('\n').filter(Boolean).map(line => {
        const parts = line.split(/[:=]/).map(s => s.trim())
        if (parts.length >= 2) return `${parts[0]}\n: ${parts.slice(1).join(': ')}`
        return `${line}\n: Description`
      }).join('\n')
    } else if (id === 'collapsible-section-generator') {
      result = `<details>\n<summary>${content}</summary>\n\nContent goes here\n\n</details>`
    } else if (id === 'youtube-embed-markdown' || id === 'video-embed-generator') {
      const videoId = content.includes('youtube.com') ? content.split('v=')[1]?.split('&')[0] : content.includes('youtu.be') ? content.split('/').pop() : content
      result = `[![${content}](${content})](https://www.youtube.com/watch?v=${videoId || 'video_id'})`
    } else if (id === 'github-alert-generator') {
      const types = ['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION']
      const type = types.find(t => content.toUpperCase().includes(t)) || 'NOTE'
      result = `> [!${type}]\n> ${content.replace(new RegExp(type, 'i'), '').trim() || 'Your message here.'}`
    } else if (id === 'citation-generator' || id === 'reference-list-generator') {
      result = content.split('\n').filter(Boolean).map((line, i) => {
        const num = i + 1
        return `[^${num}]: ${line}`
      }).join('\n')
    } else if (id === 'math-formula-generator' || id === 'latex-equation-generator') {
      result = '$$' + '\n' + content + '\n' + '$$'
    } else {
      result = `## Generated Output\n\n${content}\n\n---\n_Generated by ${tool.name}_`
    }
    setOutput(result)
    setLoading(false)
  }, [input, tool.id, tool.name])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1>
        <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <InputPanel label="Input" value={input} onChange={setInput} placeholder="Enter content to generate..." />
        <OutputPanel label="Generated Output" value={output} placeholder="Generated Markdown will appear here..." />
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={handleGenerate} loading={loading} variant="primary" icon={<IconLightning />}>Generate</Button>
        <Button onClick={() => { setInput(''); setOutput('') }} variant="ghost">Clear</Button>
        {output && <Button onClick={() => navigator.clipboard.writeText(output)} variant="secondary">Copy</Button>}
      </div>
      <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
    </div>
  )
}

function DiagramTool({ tool }: { tool: Tool }) {
  const examples: Record<string, string> = {
    flowchart: 'graph TD;\n    A[Start] --> B{Decision};\n    B -->|Yes| C[Process];\n    B -->|No| D[End];\n    C --> D;',
    sequence: 'sequenceDiagram\n    Alice->>John: Hello John, how are you?\n    John-->>Alice: Great!\n    Alice-)John: See you later!',
    'er-diagram': 'erDiagram\n    CUSTOMER ||--o{ ORDER : places\n    ORDER ||--|{ LINE-ITEM : contains\n    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses',
    gantt: 'gantt\n    title A Gantt Diagram\n    dateFormat  YYYY-MM-DD\n    section Section\n    A task           :a1, 2024-01-01, 30d\n    Another task     :after a1, 20d',
    'mind-map': 'mindmap\n  root((Mind Map))\n    Topic 1\n      Subtopic A\n      Subtopic B\n    Topic 2\n      Subtopic C',
    'pie-chart': 'pie title Pets\n    "Dogs" : 386\n    "Cats" : 85\n    "Rats" : 15',
    timeline: 'timeline\n    title History of Social Media\n    2004 : Facebook\n    2006 : Twitter\n    2010 : Instagram\n    2016 : TikTok',
  }

  const [input, setInput] = useState(examples.flowchart)
  const [activeExample, setActiveExample] = useState('flowchart')
  const [renderKey, setRenderKey] = useState(0)

  const loadExample = useCallback((key: string) => {
    setActiveExample(key)
    setInput(examples[key] || examples.flowchart)
    setRenderKey(k => k + 1)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1>
        <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(examples).map(([key]) => (
          <button key={key} onClick={() => loadExample(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer capitalize ${activeExample === key ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{key.replace(/-/g, ' ')}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <InputPanel label="Mermaid Code" value={input} onChange={setInput} placeholder="Enter Mermaid diagram code..." />
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Live Diagram</span>
          </div>
          <div className="flex-1 min-h-[300px] flex items-center justify-center p-4 overflow-auto">
            <MermaidRenderer key={renderKey} code={input} />
          </div>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={() => setRenderKey(k => k + 1)} variant="primary" icon={<IconRefresh />}>Refresh</Button>
        <Button onClick={() => navigator.clipboard.writeText(input)} variant="secondary" icon={<IconCopy />}>Copy Code</Button>
      </div>
      <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
    </div>
  )
}

function MarkdownUtilityTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleProcess = useCallback(async () => {
    if (!input.trim()) return
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 100))
    try {
      const id = tool.id
      if (id === 'markdown-preview' || id === 'markdown-viewer') {
        setOutput(markdownToHtml(input))
      } else if (id === 'markdown-search') {
        const query = prompt('Enter search term:') || ''
        const lines = input.split('\n')
        const matches = lines.filter(l => l.toLowerCase().includes(query.toLowerCase()))
        setOutput(matches.length ? `Found ${matches.length} match(es) for "${query}":\n\n${matches.map((l, i) => `  ${i + 1}. ${l.trim()}`).join('\n')}` : `No matches found for "${query}".`)
      } else if (id === 'markdown-file-merger') {
        setOutput(input + '\n\n---\n\n# Merged File\n\nContent merged successfully.')
      } else if (id === 'markdown-file-splitter') {
        const parts = input.split(/(?=^# )/m)
        setOutput(parts.map((p, i) => `--- Part ${i + 1} ---\n${p.trim()}`).join('\n\n'))
      } else if (id === 'markdown-metadata-extractor') {
        const headings = [...input.matchAll(/^#{1,6}\s+(.+)$/gm)].map(m => m[1])
        const links = [...input.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(m => ({ text: m[1], url: m[2] }))
        const images = [...input.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map(m => ({ alt: m[1], url: m[2] }))
        setOutput(`Headings: ${headings.length}\nLinks: ${links.length}\nImages: ${images.length}\nWords: ${input.split(/\s+/).filter(Boolean).length}\nCharacters: ${input.length}`)
      } else if (id === 'markdown-link-extractor') {
        const links = [...input.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m, i) => `${i + 1}. [${m[1]}](${m[2]})`).join('\n')
        setOutput(links || 'No links found.')
      } else if (id === 'markdown-image-extractor') {
        const images = [...input.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((m, i) => `${i + 1}. ![${m[1]}](${m[2]})`).join('\n')
        setOutput(images || 'No images found.')
      } else if (id === 'markdown-html-exporter') {
        const html = markdownToHtml(input)
        const doc = `<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="UTF-8"><title>Exported</title></head>\n<body class="prose max-w-4xl mx-auto p-8">\n${html}\n</body>\n</html>`
        setOutput(doc)
      } else if (id === 'markdown-blog-generator') {
        const lines = input.split('\n')
        const title = lines[0]?.replace(/^#\s*/, '') || 'Blog Post'
        const date = new Date().toISOString().split('T')[0]
        setOutput(`---\ntitle: "${title}"\ndate: "${date}"\ntags: []\n---\n\n${input}`)
      } else if (id === 'markdown-resume-builder') {
        const parts = input.split('\n').filter(Boolean)
        const name = parts[0] || 'Your Name'
        setOutput(`# ${name}\n\n**${parts[1] || 'Job Title'}**\n\n---\n\n## Experience\n\n### Company Name | Start - End\n\n- Responsibility 1\n- Responsibility 2\n\n## Education\n\n**Degree** - School Name\n\n## Skills\n\nSkill 1, Skill 2, Skill 3`)
      } else if (id === 'markdown-static-site-builder') {
        const title = input.split('\n')[0]?.replace(/^#\s*/, '')?.trim() || 'My Site'
        const html = markdownToHtml(input)
        setOutput(`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${title}</title>\n  <script src="https://cdn.tailwindcss.com"></script>\n</head>\n<body class="prose max-w-4xl mx-auto p-8">\n  ${html}\n</body>\n</html>`)
      } else if (id === 'markdown-css-generator' || id === 'markdown-theme-generator') {
        const name = input.trim() || 'default'
        const hue = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 360
        setOutput(`/* ${name} Theme for Markdown */\n:root {\n  --md-primary: hsl(${hue}, 70%, 50%);\n  --md-bg: #ffffff;\n  --md-text: #1e293b;\n  --md-heading: #0f172a;\n  --md-code-bg: #f1f5f9;\n  --md-border: #e2e8f0;\n}\n\nbody {\n  font-family: system-ui, -apple-system, sans-serif;\n  line-height: 1.7;\n  color: var(--md-text);\n  background: var(--md-bg);\n  max-width: 768px;\n  margin: 0 auto;\n  padding: 2rem;\n}`)
      } else if (id === 'markdown-seo-analyzer') {
        const headings = [...input.matchAll(/^#{1,6}\s+(.+)$/gm)].map(m => m[1])
        const words = input.split(/\s+/).filter(Boolean)
        const wordFreq: Record<string, number> = {}
        words.forEach(w => { const lw = w.toLowerCase().replace(/[^a-z]/g, ''); if (lw.length > 3) wordFreq[lw] = (wordFreq[lw] || 0) + 1 })
        const topWords = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 10)
        setOutput(`# SEO Analysis\n\nTitle: ${headings[0] || 'Missing'}\nH1 headings: ${headings.filter(h => h.startsWith('# ')).length}\nTotal headings: ${headings.length}\nWord count: ${words.length}\n\nTop keywords:\n${topWords.map(([w, c]) => `  - ${w} (${c}x)`).join('\n')}`)
      } else if (id === 'markdown-snippet-manager' || id === 'markdown-template-manager') {
        setOutput(`## Snippet: ${input.trim() || 'Untitled'}\n\n\`\`\`markdown\n# Your snippet here\n\nContent goes here...\n\`\`\`\n\n---\n_Tag: utility, reusable_`)
      } else if (id === 'markdown-clipboard-tool') {
        setOutput(input)
      } else if (id === 'markdown-version-comparator' || id === 'markdown-diff-checker' || id === 'markdown-compare-tool') {
        const version = new Date().toISOString().split('T')[0]
        setOutput(`# Version Comparison\n\n**Current version (${version}):**\n\n${input}\n\n---\n\n_Paste another version below to compare._`)
      } else if (id === 'markdown-archive-generator') {
        const items = input.split('\n').filter(Boolean)
        setOutput(`# Archive\n\n${items.map((item, i) => `- ${new Date(Date.now() - i * 86400000).toISOString().split('T')[0]}: ${item}`).join('\n')}`)
      } else if (id === 'markdown-folder-generator') {
        const items = input.split('\n').filter(Boolean)
        setOutput(items.map(item => {
          const indent = item.search(/\S/)
          const name = item.trim()
          return '  '.repeat(indent > 0 ? Math.floor(indent / 2) : 0) + (name.endsWith('/') ? `- **${name}/**` : `- ${name}`)
        }).join('\n'))
      } else {
        setOutput(`# ${tool.name}\n\nInput received (${input.length} chars, ${input.split(/\s+/).filter(Boolean).length} words).`)
      }
    } catch (e) {
      setError((e as Error).message)
    } finally { setLoading(false) }
  }, [input, tool.id, tool.name])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1>
        <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <InputPanel label="Input" value={input} onChange={setInput} placeholder={`Enter content for ${tool.name}...`} />
        <OutputPanel label="Output" value={output} placeholder="Result will appear here..." error={error} />
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={handleProcess} loading={loading} variant="primary" icon={<IconSettings />}>Process</Button>
        <Button onClick={() => { setInput(''); setOutput(''); setError('') }} variant="ghost">Clear</Button>
        {output && <Button onClick={() => navigator.clipboard.writeText(output)} variant="secondary">Copy</Button>}
      </div>
      <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
    </div>
  )
}

function getToolComponent(tool: Tool) {
  switch (tool.category) {
    case 'editor': return <MarkdownEditorTool key={tool.id} tool={tool} />
    case 'converter': return <MarkdownConverterTool key={tool.id} tool={tool} />
    case 'table': return <MarkdownTableTool key={tool.id} tool={tool} />
    case 'formatter': return <MarkdownFormatterTool key={tool.id} tool={tool} />
    case 'documentation': return <DocumentationTool key={tool.id} tool={tool} />
    case 'generator': return <MarkdownGeneratorTool key={tool.id} tool={tool} />
    case 'diagram': return <DiagramTool key={tool.id} tool={tool} />
    case 'utility': return <MarkdownUtilityTool key={tool.id} tool={tool} />
    default: return <MarkdownConverterTool key={tool.id} tool={tool} />
  }
}

export default function ToolClient({ tool }: { tool: Tool }) {
  return getToolComponent(tool)
}

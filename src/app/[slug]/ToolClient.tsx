'use client'

import { useState, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { marked } from 'marked'
import type { Tool } from '@/types'
import { getToolConfig } from '@/lib/toolConfig'
import { tools as allTools } from '@/lib/navigation'
import { chooseConverter } from '@/lib/converters'
import ContentSections from '@/components/tools/ContentSections'
import InputPanel from '@/components/tools/InputPanel'
import OutputPanel from '@/components/tools/OutputPanel'

const MermaidRenderer = dynamic(() => import('@/components/tools/MermaidRenderer'), { ssr: false })

function inferLanguage(id: string | undefined, side: 'input' | 'output'): string {
  if (!id) return 'markdown'
  const parts = id.split('-to-')
  if (parts.length !== 2) return 'markdown'
  const fmt = side === 'input' ? parts[0] : parts[1]
  const map: Record<string, string> = {
    html: 'html', json: 'json', yaml: 'yaml', xml: 'xml', csv: 'plaintext', tsv: 'plaintext',
    javascript: 'javascript', jsx: 'javascript', typescript: 'typescript', vue: 'html',
    svelte: 'html', astro: 'html', mdx: 'markdown', latex: 'latex', bbcode: 'plaintext',
    textile: 'plaintext', mediawiki: 'plaintext', confluence: 'plaintext', slack: 'plaintext',
    discord: 'plaintext', whatsapp: 'plaintext', markdown: 'markdown', txt: 'plaintext',
    pdf: 'plaintext', docx: 'plaintext', odt: 'plaintext', rtf: 'plaintext',
    epub: 'plaintext', excel: 'plaintext', powerpoint: 'plaintext', jupyter: 'json',
    mermaid: 'plaintext', restructuredtext: 'plaintext', org: 'plaintext',
    docusaurus: 'markdown', mkdocs: 'markdown', hugo: 'markdown', jekyll: 'markdown',
    nextjs: 'markdown', asciidoc: 'plaintext',
  }
  return map[fmt] || 'markdown'
}

function Button({ children, onClick, variant = 'primary', loading, ...props }: {
  children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost'; loading?: boolean; [key: string]: any
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm'
  const variants = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-600',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700',
    ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
  }
  return <button onClick={onClick} className={`${base} ${variants[variant]}`} disabled={loading} {...props}>{loading ? <span className="animate-pulse">Processing...</span> : children}</button>
}

export default function ToolClient({ tool }: { tool: Tool }) {
  const config = getToolConfig(tool.id)
  const exampleInput = config?.componentProps.exampleInput || ''
  const [input, setInput] = useState(exampleInput)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { componentType, convertFn, converterId, inputLabel, outputLabel, editorMode, generatorType } = config?.componentProps || {}
  const inputLanguage = converterId ? inferLanguage(converterId, 'input') : 'markdown'
  const outputLanguage = converterId ? inferLanguage(converterId, 'output') : 'markdown'

  const renderedHtml = useMemo(() => {
    if (componentType === 'editor' && input.trim()) {
      try {
        return marked.parse(input, { async: false }) as string
      } catch { return '' }
    }
    return ''
  }, [input, componentType])

  const handleAction = useCallback(async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 100))
    try {
      const fn = convertFn || (converterId ? chooseConverter(converterId) : null)
      if (fn) {
        setOutput(fn(input))
      } else {
        setOutput(`Processing: ${input.substring(0, 100)}...`)
      }
    } catch (e: any) {
      setError(e?.message || 'An error occurred')
    }
    setLoading(false)
  }, [input, convertFn, converterId])

  const handleCopy = useCallback(() => { if (output) navigator.clipboard.writeText(output) }, [output])

  const getRelatedTools = useCallback((current: Tool) => {
    return allTools.filter(t => t.category === current.category && t.id !== current.id).slice(0, 6)
  }, [])

  if (componentType === 'diagram') {
    const inputValue = input
    const setInputValue = setInput
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-6"><h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1><p className="text-slate-600 dark:text-slate-400">{tool.description}</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <InputPanel label="Mermaid Code" value={inputValue} onChange={setInputValue} placeholder="Enter Mermaid diagram code..." language="plaintext" />
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Diagram Preview</span></div>
            <div className="p-4 min-h-[300px] flex items-center justify-center"><MermaidRenderer chart={inputValue} /></div>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap mb-8">
          <Button onClick={handleAction} loading={loading}>Render</Button>
          <Button onClick={() => setInputValue(exampleInput)} variant="ghost">Reset</Button>
          <Button onClick={handleCopy} variant="secondary">Copy Code</Button>
        </div>
        <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
      </div>
    )
  }

  if (componentType === 'editor') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-6"><h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1><p className="text-slate-600 dark:text-slate-400">{tool.description}</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <InputPanel label={inputLabel || 'Markdown Input'} value={input} onChange={setInput} placeholder="Enter Markdown..." language="markdown" useMonaco />
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Live Preview</span></div>
            <div className="p-4 min-h-[300px] prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
          </div>
        </div>
        <div className="flex gap-3 flex-wrap mb-8">
          <Button onClick={() => { setInput(exampleInput); setError('') }} variant="ghost">Reset</Button>
          {renderedHtml && <Button onClick={() => navigator.clipboard.writeText(renderedHtml)} variant="secondary">Copy HTML</Button>}
          <Button onClick={() => navigator.clipboard.writeText(input)} variant="secondary">Copy Markdown</Button>
        </div>
        <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6"><h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h1><p className="text-slate-600 dark:text-slate-400">{tool.description}</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <InputPanel label={inputLabel || 'Input'} value={input} onChange={setInput} placeholder={`Enter ${(inputLabel || 'Input').toLowerCase()}...`} />
        <OutputPanel label={outputLabel || 'Output'} value={output} placeholder={`${outputLabel || 'Output'} will appear here...`} error={error} />
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={handleAction} loading={loading}>{componentType === 'generator' || componentType === 'documentation' ? 'Generate' : componentType === 'formatter' ? 'Format' : 'Convert'}</Button>
        <Button onClick={() => { setInput(exampleInput); setOutput(''); setError('') }} variant="ghost">Reset</Button>
        {output && <Button onClick={handleCopy} variant="secondary">Copy</Button>}
      </div>
      <ContentSections tool={tool} relatedTools={getRelatedTools(tool)} />
    </div>
  )
}

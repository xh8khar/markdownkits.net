'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import type { Tool } from '@/types'
import { getToolConfig } from '@/lib/toolConfig'
import { tools as allTools } from '@/lib/navigation'
import ContentSections from '@/components/tools/ContentSections'
import InputPanel from '@/components/tools/InputPanel'
import OutputPanel from '@/components/tools/OutputPanel'

const MermaidRenderer = dynamic(() => import('@/components/tools/MermaidRenderer'), { ssr: false })

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
  const { componentType, convertFn, inputLabel, outputLabel, editorMode, generatorType } = config?.componentProps || {}

  const handleAction = useCallback(async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 100))
    try {
      if (convertFn) {
        setOutput(convertFn(input))
      } else {
        setOutput(`Processing: ${input.substring(0, 100)}...`)
      }
    } catch (e: any) {
      setError(e?.message || 'An error occurred')
    }
    setLoading(false)
  }, [input, convertFn])

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
          <InputPanel label="Mermaid Code" value={inputValue} onChange={setInputValue} placeholder="Enter Mermaid diagram code..." />
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

'use client'

import { useState, useCallback } from 'react'
import InputPanel from './InputPanel'
import OutputPanel from './OutputPanel'

interface ToolLayoutProps {
  title: string
  description: string
  exampleInput: string
  inputLabel?: string
  outputLabel?: string
  children?: (input: string, setOutput: (val: string) => void, setError: (val: string) => void, loading: boolean, setLoading: (val: boolean) => void) => React.ReactNode
}

export default function ToolLayout({ exampleInput, inputLabel = 'Input', outputLabel = 'Output', children }: ToolLayoutProps) {
  const [input, setInput] = useState(exampleInput)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCopy = useCallback(() => {
    if (output) navigator.clipboard.writeText(output)
  }, [output])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <InputPanel label={inputLabel} value={input} onChange={setInput} placeholder={`Enter ${inputLabel.toLowerCase()}...`} />
        <OutputPanel label={outputLabel} value={output} placeholder={`${outputLabel} will appear here...`} error={error} />
      </div>
      <div className="flex gap-3 flex-wrap">
        {children?.(input, setOutput, setError, loading, setLoading)}
        <button onClick={() => { setInput(exampleInput); setOutput(''); setError('') }} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">Clear</button>
        {output && (
          <button onClick={handleCopy} className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer">Copy</button>
        )}
      </div>
    </div>
  )
}

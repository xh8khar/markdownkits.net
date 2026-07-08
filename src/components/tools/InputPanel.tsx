'use client'

import { useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface InputPanelProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  language?: string
}

export default function InputPanel({ label, value, onChange, language = 'markdown' }: InputPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File | undefined) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      onChange(text)
    }
    reader.readAsText(file)
  }, [onChange])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0])
    e.target.value = ''
  }, [handleFile])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files?.[0])
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</span>
        <label className="cursor-pointer text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <input ref={fileInputRef} type="file" accept=".txt,.md,.css,.html,.json,.yaml,.yml,.csv,.xml" className="hidden" onChange={handleFileChange} />
          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Choose File
        </label>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative flex-1 min-h-[250px]"
      >
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
            <div className="text-center text-slate-300 dark:text-slate-600">
              <svg className="w-10 h-10 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-sm">Drop a file here or paste</p>
            </div>
          </div>
        )}
        <MonacoEditor
          height="400px"
          language={language}
          value={value}
          onChange={(v) => onChange(v || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            padding: { top: 8 },
          }}
        />
      </div>
    </div>
  )
}

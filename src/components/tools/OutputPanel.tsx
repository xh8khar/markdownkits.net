'use client'

import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface OutputPanelProps {
  label: string
  value: string
  placeholder?: string
  error?: string
  language?: string
}

export default function OutputPanel({ label, value, placeholder = '', error, language = 'markdown' }: OutputPanelProps) {
  if (error) {
    return (
      <div className="flex flex-col rounded-xl border border-red-400 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">{label}</span>
        </div>
        <div className="flex items-start gap-3 p-4 text-sm text-red-600 dark:text-red-400">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <pre className="whitespace-pre-wrap font-mono text-xs">{error}</pre>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
          {value && <span className="ml-2 font-normal text-slate-400">({value.length} chars)</span>}
        </span>
      </div>
      <div className="relative flex-1 min-h-[250px]">
        {!value && placeholder && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center">
              <svg className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-slate-400 dark:text-slate-500 text-sm">{placeholder}</p>
            </div>
          </div>
        )}
        <MonacoEditor
          height="400px"
          language={language}
          value={value}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            padding: { top: 8 },
            readOnly: true,
            domReadOnly: true,
          }}
        />
      </div>
    </div>
  )
}

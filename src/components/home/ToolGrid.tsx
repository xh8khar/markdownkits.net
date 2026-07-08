'use client'

import { useState } from 'react'
import ToolCard from './ToolCard'
import { tools } from '@/lib/navigation'
import type { ToolCategory } from '@/types'

const categories: { label: string; value: ToolCategory | 'all' }[] = [
  { label: 'All Tools', value: 'all' },
  { label: 'Editor', value: 'editor' },
  { label: 'Converter', value: 'converter' },
  { label: 'Table', value: 'table' },
  { label: 'Formatter', value: 'formatter' },
  { label: 'Documentation', value: 'documentation' },
  { label: 'Generator', value: 'generator' },
  { label: 'Diagram', value: 'diagram' },
  { label: 'Utility', value: 'utility' },
]

export default function ToolGrid({ searchQuery = '' }: { searchQuery?: string }) {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all')

  const filtered = tools.filter(t => {
    const matchCategory = activeCategory === 'all' || t.category === activeCategory
    const query = searchQuery.toLowerCase()
    const matchSearch = !query ||
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    return matchCategory && matchSearch
  })

  return (
    <section>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeCategory === cat.value
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-center py-12">
          No tools found{searchQuery ? ` for &ldquo;${searchQuery}&rdquo;` : ''} in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </section>
  )
}

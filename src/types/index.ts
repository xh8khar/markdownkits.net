export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  slug: string
  icon: string
}

export type ToolCategory =
  | 'editor'
  | 'converter'
  | 'table'
  | 'formatter'
  | 'documentation'
  | 'generator'
  | 'diagram'
  | 'utility'

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  icon?: string
}

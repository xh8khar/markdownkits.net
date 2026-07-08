import { marked } from 'marked'

export interface ValidationIssue {
  line: number
  type: 'error' | 'warning' | 'info'
  message: string
}

export function formatMarkdown(input: string): string {
  const lines = input.split('\n')
  const formatted = lines.map(line => {
    if (/^#{1,6}\s/.test(line)) return line
    if (/^\|.*\|$/.test(line)) return line.trim()
    if (/^[-*]\s/.test(line)) return line
    if (/^\d+\.\s/.test(line)) return line
    if (/^```/.test(line)) return line
    if (/^>\s/.test(line)) return line
    if (line.trim() === '') return ''
    if (/^\[.+\]:\s/.test(line)) return line
    return line.replace(/\s+$/, '').replace(/^\s+/, '')
  })
  return formatted.join('\n')
}

export function beautifyMarkdown(input: string): string {
  const lines = input.split('\n')
  const result: string[] = []
  let inCode = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('```')) { inCode = !inCode; result.push(line); continue }
    if (inCode) { result.push(line); continue }

    let l = line
    if (/^#{1,6}\s/.test(l)) {
      l = l.replace(/\s+#+\s*$/, '').trim()
    }
    if (/^\|/.test(l)) {
      l = l.replace(/\|\|/g, '| ').replace(/\|$/g, ' |').trim()
    }
    if (/^[-*]\s/.test(l)) {
      l = l.replace(/^\s*[-*]\s+/, (m) => m.replace(/\s+/g, ' '))
    }
    result.push(l)
  }
  return result.join('\n')
}

export function validateMarkdown(input: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const lines = input.split('\n')
  let inCode = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNum = i + 1

    if (line.startsWith('```')) { inCode = !inCode; continue }
    if (inCode) continue

    if (/^#{6,}\s/.test(line)) {
      issues.push({ line: lineNum, type: 'warning', message: 'Heading level too deep (max 5)' })
    }
    if (/^#+\s*$/.test(line)) {
      issues.push({ line: lineNum, type: 'error', message: 'Heading has no content' })
    }
    const linkRefs = line.match(/\[([^\]]+)\]\(([^)]*)\)/g)
    if (linkRefs) {
      for (const ref of linkRefs) {
        const url = ref.match(/\(([^)]*)\)/)?.[1] || ''
        if (!url || url === '#') {
          issues.push({ line: lineNum, type: 'warning', message: `Link "${ref}" has empty or placeholder URL` })
        }
      }
    }
    if (line.includes('![') && !line.includes('](')) {
      issues.push({ line: lineNum, type: 'error', message: 'Image missing URL' })
    }
    const tablePipe = line.match(/^\|.+\|$/)
    if (tablePipe) {
      const cells = line.split('|').filter(c => c.trim())
      if (cells.length === 0) {
        issues.push({ line: lineNum, type: 'warning', message: 'Empty table row' })
      }
    }
  }
  return issues
}

export function lintMarkdown(input: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const lines = input.split('\n')
  let inCode = false
  const headingCount: Record<string, number> = {}

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNum = i + 1

    if (line.startsWith('```')) { inCode = !inCode; continue }
    if (inCode) continue

    if (/^#{1,6}\s/.test(line)) {
      const text = line.replace(/^#+\s*/, '').trim().toLowerCase()
      headingCount[text] = (headingCount[text] || 0) + 1
      if (headingCount[text] > 1) {
        issues.push({ line: lineNum, type: 'warning', message: `Duplicate heading: "${line.replace(/^#+\s*/, '')}"` })
      }
    }
    if (line.length > 120) {
      issues.push({ line: lineNum, type: 'info', message: `Line too long (${line.length} chars, max 120)` })
    }
    if (/\s+$/.test(line)) {
      issues.push({ line: lineNum, type: 'warning', message: 'Trailing whitespace' })
    }
    if (/^[A-Z][a-z]+:/.test(line) && !/^https?:\/\//.test(line)) {
      issues.push({ line: lineNum, type: 'info', message: 'Possible heading without # prefix' })
    }
  }
  return issues
}

export function minifyMarkdown(input: string): string {
  return input
    .split('\n')
    .map(l => l.trim())
    .filter(l => l)
    .join('\n')
}

export function cleanupMarkdown(input: string): string {
  let result = input
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201c|\u201d/g, '"')
    .replace(/\u2013|\u2014/g, '--')
    .trim()
  return result + '\n'
}

export function markdownStats(input: string): Record<string, number | string> {
  const lines = input.split('\n')
  const words = input.split(/\s+/).filter(Boolean)
  const chars = input.length
  const headings = lines.filter(l => /^#{1,6}\s/.test(l)).length
  const codeBlocks = input.match(/```/g)?.length || 0
  const lists = lines.filter(l => /^[-*]\s/.test(l) || /^\d+\.\s/.test(l)).length
  const links = input.match(/\[([^\]]+)\]\(([^)]+)\)/g)?.length || 0
  const images = input.match(/!\[([^\]]*)\]\(([^)]+)\)/g)?.length || 0
  const tables = input.match(/^\|.+\|\n\|[-| ]+\|\n/m) ? (input.match(/^\|.+\|\n\|[-| ]+\|\n/m) || []).length : 0
  const readingTime = Math.ceil(words.length / 200)

  return {
    lines: lines.length,
    words: words.length,
    characters: chars,
    headings,
    codeBlocks: Math.floor(codeBlocks / 2),
    lists,
    links,
    images,
    tables,
    readingTimeMinutes: readingTime,
  }
}

export function tocMarkdown(input: string): string {
  const lines = input.split('\n')
  const toc: string[] = []

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      const indent = '  '.repeat(level - 1)
      const slug = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')
      toc.push(`${indent}- [${text}](#${slug})`)
    }
  }
  return toc.join('\n')
}

export function extractHeadings(input: string): { level: number; text: string }[] {
  const headings: { level: number; text: string }[] = []
  for (const line of input.split('\n')) {
    const match = line.match(/^(#{1,6})\s+(.+)/)
    if (match) {
      headings.push({ level: match[1].length, text: match[2].trim() })
    }
  }
  return headings
}

export function findDuplicateHeadings(input: string): { text: string; lines: number[] }[] {
  const headingMap: Record<string, number[]> = {}
  input.split('\n').forEach((line, i) => {
    const match = line.match(/^#{1,6}\s+(.+)/)
    if (match) {
      const text = match[1].trim().toLowerCase()
      if (!headingMap[text]) headingMap[text] = []
      headingMap[text].push(i + 1)
    }
  })
  return Object.entries(headingMap)
    .filter(([_, lines]) => lines.length > 1)
    .map(([text, lines]) => ({ text, lines }))
}

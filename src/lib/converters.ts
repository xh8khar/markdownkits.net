import { marked } from 'marked'
import TurndownService from 'turndown'
import * as yaml from 'js-yaml'

let turndown: TurndownService | null = null
function getTurndown(): TurndownService {
  if (!turndown) {
    turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', emDelimiter: '*' })
    turndown.remove('script')
    turndown.remove('style')
  }
  return turndown
}

export function markdownToHtml(md: string): string {
  return marked.parse(md, { async: false }) as string
}

export function htmlToMarkdown(html: string): string {
  return getTurndown().turndown(html)
}

export function markdownToTxt(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '$1')
    .replace(/^## (.+)$/gm, '$1')
    .replace(/^# (.+)$/gm, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/~~(.+?)~~/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/!\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^[-*+] /gm, '')
    .replace(/^\d+\. /gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function txtToMarkdown(txt: string): string {
  return txt
    .split('\n\n')
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => {
      if (block.length < 50) return `## ${block}`
      return block
    })
    .join('\n\n')
}

export function markdownToJson(md: string): string {
  const lines = md.split('\n')
  const headings = lines.filter(l => /^#{1,6}\s/.test(l)).map(h => h.replace(/^#+\s*/, ''))
  const tableLines = lines.filter(l => l.includes('|') && l.includes('---'))
  const lists = lines.filter(l => /^[-*\d.]/.test(l))
  const codeBlocks: string[] = []
  let inCode = false
  for (const l of lines) {
    if (l.startsWith('```')) { inCode = !inCode; continue }
    if (inCode) codeBlocks.push(l)
  }
  const obj: Record<string, any> = {
    title: headings[0] || '',
    sections: headings.slice(1),
    hasTables: tableLines.length > 0,
    hasLists: lists.length > 0,
    hasCodeBlocks: codeBlocks.length > 0,
    totalLines: lines.length,
    charCount: md.length,
    wordCount: md.split(/\s+/).filter(Boolean).length,
  }
  return JSON.stringify(obj, null, 2)
}

export function jsonToMarkdown(json: string): string {
  try {
    const data = JSON.parse(json)
    const lines: string[] = []
    if (data.title) lines.push(`# ${data.title}`, '')
    if (data.sections) {
      if (Array.isArray(data.sections)) {
        for (const s of data.sections) { lines.push(`- ${s}`) }
      } else if (typeof data.sections === 'object') {
        for (const [k, v] of Object.entries(data.sections)) {
          lines.push(`- **${k}**: ${v}`)
        }
      }
    }
    for (const [k, v] of Object.entries(data)) {
      if (['title', 'sections'].includes(k)) continue
      if (typeof v !== 'object') {
        lines.push(`- **${k}**: ${v}`)
      }
    }
    return lines.join('\n') || '```json\n' + JSON.stringify(data, null, 2) + '\n```'
  } catch {
    return '> Invalid JSON input'
  }
}

export function markdownToYaml(md: string): string {
  const frontMatterMatch = md.match(/^---\n([\s\S]*?)\n---/)
  if (frontMatterMatch) {
    try {
      const parsed = yaml.load(frontMatterMatch[1])
      return yaml.dump(parsed, { indent: 2, lineWidth: -1 })
    } catch {
      return frontMatterMatch[1]
    }
  }
  const headings = md.match(/^#+\s+(.+)$/gm)
  const sections: Record<string, any> = {}
  if (headings) sections.headings = headings.map(h => h.replace(/^#+\s*/, ''))
  const wordCount = md.split(/\s+/).filter(Boolean).length
  sections.wordCount = wordCount
  sections.lineCount = md.split('\n').length
  return yaml.dump(sections, { indent: 2, lineWidth: -1 })
}

export function yamlToMarkdown(yamlStr: string): string {
  try {
    const data = yaml.load(yamlStr) as Record<string, any>
    const lines: string[] = ['---']
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === 'string') lines.push(`${k}: ${v}`)
      else if (Array.isArray(v)) lines.push(`${k}:\n${v.map((i: any) => `  - ${i}`).join('\n')}`)
      else if (typeof v === 'object') lines.push(`${k}:\n${Object.entries(v).map(([sk, sv]) => `  ${sk}: ${sv}`).join('\n')}`)
      else lines.push(`${k}: ${v}`)
    }
    lines.push('---', '')
    if (data.title) lines.push(`# ${data.title}`, '')
    if (data.description) lines.push('', data.description)
    return lines.join('\n')
  } catch {
    return '> Invalid YAML input'
  }
}

export function markdownToCsv(md: string): string {
  const tableRegex = /^\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)*)/m
  const match = md.match(tableRegex)
  if (match) {
    const rows = match[0].split('\n').filter(r => r.trim() && !r.includes('---'))
    return rows.map(r =>
      r.split('|').filter(c => c.trim()).map(c => c.trim()).join(',')
    ).join('\n')
  }
  const lines = md.split('\n').filter(l => l.trim())
  return lines.map(l => {
    const parts = l.replace(/^[-*]\s*/, '').replace(/^#+\s*/, '').split(/\s{2,}/)
    return parts.map(p => `"${p.replace(/"/g, '""')}"`).join(',')
  }).join('\n')
}

export function csvToMarkdown(csv: string): string {
  const lines = csv.split('\n').filter(l => l.trim())
  if (lines.length === 0) return ''
  const rows = lines.map(l => {
    const cells: string[] = []
    let current = '', inQuotes = false
    for (const ch of l) {
      if (ch === '"') { inQuotes = !inQuotes; continue }
      if (ch === ',' && !inQuotes) { cells.push(current.trim()); current = ''; continue }
      current += ch
    }
    cells.push(current.trim())
    return cells
  })
  const sep = '| ' + rows[0].map(() => '---').join(' | ') + ' |'
  const fmt = (cells: string[]) => '| ' + cells.join(' | ') + ' |'
  return [fmt(rows[0]), sep, ...rows.slice(1).map(fmt)].join('\n')
}

export function markdownToTsv(md: string): string {
  const csv = markdownToCsv(md)
  return csv.replace(/,/g, '\t')
}

export function tsvToMarkdown(tsv: string): string {
  const csv = tsv.replace(/\t/g, ',')
  return csvToMarkdown(csv)
}

export function markdownToExcel(md: string): string {
  const csv = markdownToCsv(md)
  const rows = csv.split('\n')
  return rows.map(r => r.split(',').map(c => c.trim()).join('\t')).join('\n')
}

export function excelToMarkdown(excel: string): string {
  const rows = excel.split('\n').filter(l => l.trim())
  if (rows.length === 0) return ''
  const data = rows.map(r => r.split('\t').map(c => c.trim()))
  const sep = '| ' + data[0].map(() => '---').join(' | ') + ' |'
  const fmt = (cells: string[]) => '| ' + cells.join(' | ') + ' |'
  return [fmt(data[0]), sep, ...data.slice(1).map(fmt)].join('\n')
}

export function markdownToXml(md: string): string {
  const html = markdownToHtml(md)
  const lines: string[] = ['<?xml version="1.0" encoding="UTF-8"?>', '<document>']
  const divMatch = html.match(/<[^>]+>[^<]*<\/[^>]+>/g)
  if (divMatch) {
    for (const el of divMatch) {
      const tag = el.match(/<\/?(\w+)/)?.[1] || 'p'
      const content = el.replace(/<[^>]+>/g, '').trim()
      if (content) lines.push(`  <${tag}>${content.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</${tag}>`)
    }
  }
  lines.push('</document>')
  return lines.join('\n')
}

export function xmlToMarkdown(xml: string): string {
  const content: string[] = []
  const tagMatches = xml.matchAll(/<(h[1-6]|p|li|strong|em|code)>([\s\S]*?)<\/\1>/g)
  for (const m of tagMatches) {
    const tag = m[1], text = m[2].trim()
    if (tag === 'h1') content.push(`# ${text}`)
    else if (tag === 'h2') content.push(`## ${text}`)
    else if (tag === 'h3') content.push(`### ${text}`)
    else if (tag.startsWith('h')) content.push(`${'#'.repeat(parseInt(tag[1]))} ${text}`)
    else if (tag === 'strong') content.push(` **${text}** `)
    else if (tag === 'em') content.push(` *${text}* `)
    else if (tag === 'code') content.push(` \`${text}\` `)
    else if (tag === 'li') content.push(`- ${text}`)
    else content.push(text)
  }
  return content.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

export function markdownToLatex(md: string): string {
  let latex = md
    .replace(/#{6}\s+(.+)/g, '\\paragraph{$1}')
    .replace(/#{5}\s+(.+)/g, '\\subparagraph{$1}')
    .replace(/#{4}\s+(.+)/g, '\\subsection{$1}')
    .replace(/#{3}\s+(.+)/g, '\\subsubsection{$1}')
    .replace(/#{2}\s+(.+)/g, '\\section{$1}')
    .replace(/#{1}\s+(.+)/g, '\\section{$1}')
    .replace(/\*\*(.+?)\*\*/g, '\\textbf{$1}')
    .replace(/\*(.+?)\*/g, '\\textit{$1}')
    .replace(/`(.+?)`/g, '\\texttt{$1}')
    .replace(/~~(.+?)~~/g, '\\sout{$1}')
    .replace(/!\[(.+?)\]\((.+?)\)/g, '\\includegraphics{$2}')
    .replace(/\[(.+?)\]\((.+?)\)/g, '\\href{$2}{$1}')
    .replace(/^- (.+)$/gm, '\\item $1')
    .replace(/^\d+\. (.+)$/gm, '\\item $1')
  latex = '\\documentclass{article}\n\\begin{document}\n' + latex + '\n\\end{document}'
  return latex
}

export function latexToMarkdown(latex: string): string {
  let md = latex
    .replace(/\\section\{(.+?)\}/g, '# $1')
    .replace(/\\subsection\{(.+?)\}/g, '## $1')
    .replace(/\\subsubsection\{(.+?)\}/g, '### $1')
    .replace(/\\textbf\{(.+?)\}/g, '**$1**')
    .replace(/\\textit\{(.+?)\}/g, '*$1*')
    .replace(/\\texttt\{(.+?)\}/g, '`$1`')
    .replace(/\\sout\{(.+?)\}/g, '~~$1~~')
    .replace(/\\includegraphics\{([^}]+)\}/g, '![]($1)')
    .replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, '[$2]($1)')
    .replace(/\\item\s+/g, '- ')
    .replace(/\\documentclass\{[^}]*\}/g, '')
    .replace(/\\begin\{document\}/g, '')
    .replace(/\\end\{document\}/g, '')
    .replace(/\\begin\{[^}]*\}/g, '')
    .replace(/\\end\{[^}]*\}/g, '')
    .replace(/\\\\/g, '\n')
  return md.trim()
}

export function markdownToBbcode(md: string): string {
  return md
    .replace(/#{6}\s+(.+)/g, '[size=8]$1[/size]')
    .replace(/#{5}\s+(.+)/g, '[size=10]$1[/size]')
    .replace(/#{4}\s+(.+)/g, '[size=12]$1[/size]')
    .replace(/#{3}\s+(.+)/g, '[size=14]$1[/size]')
    .replace(/#{2}\s+(.+)/g, '[size=18]$1[/size]')
    .replace(/#\s+(.+)/g, '[size=24]$1[/size]')
    .replace(/\*\*(.+?)\*\*/g, '[b]$1[/b]')
    .replace(/\*(.+?)\*/g, '[i]$1[/i]')
    .replace(/`(.+?)`/g, '[code]$1[/code]')
    .replace(/~~(.+?)~~/g, '[s]$1[/s]')
    .replace(/!\[(.+?)\]\((.+?)\)/g, '[img]$2[/img]')
    .replace(/\[(.+?)\]\((.+?)\)/g, '[url=$2]$1[/url]')
    .replace(/^- (.+)$/gm, '[*]$1')
}

export function bbcodeToMarkdown(bbcode: string): string {
  return bbcode
    .replace(/\[size=\d+\](.+?)\[\/size\]/g, '# $1')
    .replace(/\[b\](.+?)\[\/b\]/g, '**$1**')
    .replace(/\[i\](.+?)\[\/i\]/g, '*$1*')
    .replace(/\[code\](.+?)\[\/code\]/g, '`$1`')
    .replace(/\[s\](.+?)\[\/s\]/g, '~~$1~~')
    .replace(/\[img\](.+?)\[\/img\]/g, '![]($1)')
    .replace(/\[url=(.+?)\](.+?)\[\/url\]/g, '[$2]($1)')
    .replace(/\[\*\](.+)/g, '- $1')
}

export function markdownToReactJsx(md: string): string {
  const html = markdownToHtml(md)
  let jsx = html
    .replace(/class="/g, 'className="')
    .replace(/for="/g, 'htmlFor="')
    .replace(/style="([^"]*)"/g, (_: string, s: string) => {
      const obj: Record<string, string> = {}
      s.split(';').filter(Boolean).forEach(prop => {
        const [k, v] = prop.split(':').map(p => p.trim())
        if (k && v) {
          const key = k.replace(/-([a-z])/g, (_, l) => l.toUpperCase())
          obj[key] = v
        }
      })
      return `style={${JSON.stringify(obj).replace(/"(\w+)":/g, '$1:')}}`
    })
  return `export default function Component() {\n  return (\n    ${jsx.replace(/\n/g, '\n    ')}\n  )\n}`
}

export function jsxToMarkdown(jsx: string): string {
  const html = jsx
    .replace(/export default function \w+\(\)\s*\{/g, '')
    .replace(/return\s*\(/g, '')
    .replace(/\)\s*;/g, '')
    .replace(/\)\s*\}/g, '')
    .replace(/className=/g, 'class=')
    .replace(/htmlFor=/g, 'for=')
    .replace(/style=\{([^}]*)\}/g, (_: string, s: string) => {
      try {
        const obj = eval('(' + s + ')')
        const css = Object.entries(obj).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`).join('; ')
        return `style="${css}"`
      } catch { return '' }
    })
  return htmlToMarkdown(html)
}

export function markdownToVue(md: string): string {
  const html = markdownToHtml(md)
  return `<template>\n  <div class="markdown-content">\n${html.replace(/^/gm, '    ')}\n  </div>\n</template>`
}

export function markdownToSvelte(md: string): string {
  const html = markdownToHtml(md)
  return '<script>\n  let html = `' + html.replace(/`/g, '\\`') + '`\n</script>\n\n<main>\n  {@html html}\n</main>'
}

export function markdownToMdx(md: string): string {
  const heading = md.match(/^# (.+)$/m)?.[1] || 'Untitled'
  return `import { useState } from 'react'\n\nexport const meta = { title: '${heading}', date: '${new Date().toISOString().split('T')[0]}' }\n\n${md}`
}

export function mdxToMarkdown(mdx: string): string {
  return mdx
    .replace(/^import .+ from .+$/gm, '')
    .replace(/^export (const|let|var) .+$/gm, '')
    .replace(/^<[A-Z]\w+[^>]*\/>$/gm, '')
    .replace(/^<\/?[A-Z]\w+[^>]*>$/gm, '')
    .trim()
}

export function markdownToAsciidoc(md: string): string {
  return md
    .replace(/^# (.+)$/gm, '= $1')
    .replace(/^## (.+)$/gm, '== $1')
    .replace(/^### (.+)$/gm, '=== $1')
    .replace(/^#### (.+)$/gm, '==== $1')
    .replace(/\*\*(.+?)\*\*/g, '*$1*')
    .replace(/\*(.+?)\*/g, '_$1_')
    .replace(/`(.+?)`/g, '`$1`')
    .replace(/~~(.+?)~~/g, '[line-through]#$1#')
    .replace(/\[(.+?)\]\((.+?)\)/g, '$1[$2]')
    .replace(/^- (.+)$/gm, '* $1')
}

export function asciidocToMarkdown(adoc: string): string {
  return adoc
    .replace(/^= (.+)$/gm, '# $1')
    .replace(/^== (.+)$/gm, '## $1')
    .replace(/^=== (.+)$/gm, '### $1')
    .replace(/^==== (.+)$/gm, '#### $1')
    .replace(/\*(.+?)\*/g, '**$1**')
    .replace(/_(.+?)_/g, '*$1*')
    .replace(/`(.+?)`/g, '`$1`')
    .replace(/\$(.+?)\$/g, '$$$1$$')
    .replace(/\* (.+)$/gm, '- $1')
}

export function markdownToPowerpoint(md: string): string {
  const slides = md.split(/(?=^# )/m)
  return slides.map((slide, i) => {
    const lines = slide.trim().split('\n')
    const title = lines[0]?.replace(/^#+\s*/, '') || `Slide ${i + 1}`
    const body = lines.slice(1).join('\n').trim()
    return `---\n<!-- Slide ${i + 1} -->\n# ${title}\n\n${body}`
  }).join('\n\n')
}

export function markdownToJupyter(md: string): string {
  const cells = md.split(/(?=^# )/m).map(block => {
    const content = block.trim()
    const isCode = content.startsWith('```')
    if (isCode) {
      const code = content.replace(/```\w*\n?/, '').replace(/```$/, '').trim()
      return { cell_type: 'code', source: code, metadata: {}, outputs: [] }
    }
    return { cell_type: 'markdown', source: content, metadata: {} }
  })
  return JSON.stringify({ nbformat: 4, nbformat_minor: 5, cells, metadata: {} }, null, 2)
}

export function chooseConverter(id: string): ((input: string) => string) | null {
  const map: Record<string, (input: string) => string> = {
    'markdown-to-html': markdownToHtml,
    'html-to-markdown': htmlToMarkdown,
    'markdown-to-txt': markdownToTxt,
    'txt-to-markdown': txtToMarkdown,
    'markdown-to-json': markdownToJson,
    'json-to-markdown': jsonToMarkdown,
    'markdown-to-yaml': markdownToYaml,
    'yaml-to-markdown': yamlToMarkdown,
    'markdown-to-csv': markdownToCsv,
    'csv-to-markdown': csvToMarkdown,
    'markdown-to-tsv': markdownToTsv,
    'tsv-to-markdown': tsvToMarkdown,
    'markdown-to-excel': markdownToExcel,
    'excel-to-markdown': excelToMarkdown,
    'markdown-to-xml': markdownToXml,
    'xml-to-markdown': xmlToMarkdown,
    'markdown-to-latex': markdownToLatex,
    'latex-to-markdown': latexToMarkdown,
    'markdown-to-bbcode': markdownToBbcode,
    'bbcode-to-markdown': bbcodeToMarkdown,
    'markdown-to-react-jsx': markdownToReactJsx,
    'jsx-to-markdown': jsxToMarkdown,
    'markdown-to-vue': markdownToVue,
    'markdown-to-svelte': markdownToSvelte,
    'markdown-to-mdx': markdownToMdx,
    'mdx-to-markdown': mdxToMarkdown,
    'markdown-to-asciidoc': markdownToAsciidoc,
    'asciidoc-to-markdown': asciidocToMarkdown,
    'markdown-to-powerpoint': markdownToPowerpoint,
    'markdown-to-jupyter-notebook': markdownToJupyter,
  }
  return map[id] || null
}

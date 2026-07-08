export interface FAQItem {
  q: string
  a: string
}

export interface ToolContent {
  howToUse: string[]
  faq: FAQItem[]
}

const defaultFaq: FAQItem[] = [
  { q: 'Is this tool free to use?', a: 'Yes, all MarkdownKits tools are completely free to use with no usage limits.' },
  { q: 'Is my data private?', a: 'Absolutely. All processing happens in your browser. No data is uploaded to any server.' },
  { q: 'Do I need an account?', a: 'No account or sign-up is required. Just open the tool and start using it.' },
]

const defaultHowTo: string[] = [
  'Enter your content in the input field above',
  'Click the action button to process your content',
  'Copy the result from the output field',
]

function genHowTo(label: string, ...steps: string[]): string[] {
  return steps.length ? steps : [`Enter your ${label.toLowerCase()} in the input field`, 'Click the button to process', 'Copy the result']
}

const baseContent: Record<string, ToolContent> = {
  'markdown-editor': {
    howToUse: ['Type or paste Markdown text in the editor panel', 'Watch the live preview update instantly on the right', 'Use the toolbar buttons for quick formatting', 'Copy the rendered HTML or Markdown output'],
    faq: [
      { q: 'What is a Markdown editor?', a: 'A Markdown editor lets you write text with simple formatting syntax that converts to HTML in real time.' },
      { q: 'Can I export my work?', a: 'Yes, you can copy the rendered HTML or the raw Markdown to use elsewhere.' },
      ...defaultFaq,
    ],
  },
  'markdown-to-html': {
    howToUse: ['Paste or type your Markdown content in the input field', 'Click "Convert" to transform Markdown into HTML', 'Copy the clean HTML output for use in your projects'],
    faq: [
      { q: 'What is Markdown to HTML conversion?', a: 'It converts Markdown syntax (like # headings, **bold**, - lists) into semantic HTML tags.' },
      { q: 'Does it support all Markdown features?', a: 'Yes, it supports headings, lists, code blocks, tables, images, links, and more.' },
      ...defaultFaq,
    ],
  },
  'html-to-markdown': {
    howToUse: ['Paste HTML content in the input field', 'Click "Convert" to transform it into clean Markdown', 'Copy the resulting Markdown for editing or publishing'],
    faq: [
      { q: 'Can I convert any HTML to Markdown?', a: 'It works well with most HTML structures including headings, paragraphs, lists, and links.' },
      { q: 'Will it strip all HTML tags?', a: 'It converts HTML to Markdown syntax, preserving the structure and content.' },
      ...defaultFaq,
    ],
  },
}

export function getToolContent(id: string): ToolContent {
  const specific = baseContent[id]
  if (specific) return specific
  return { howToUse: defaultHowTo, faq: defaultFaq }
}

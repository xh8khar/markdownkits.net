'use client'

import Link from 'next/link'
import type { Tool } from '@/types'
import { getToolContent } from '@/lib/toolContent'

const categoryIcons: Record<string, string> = {
  editor: 'edit',
  converter: 'code',
  table: 'table',
  formatter: 'search',
  documentation: 'file',
  generator: 'edit',
  diagram: 'edit',
  utility: 'search',
}

function HowToUseSection({ tool }: { tool: Tool }) {
  const content = getToolContent(tool.id)

  const steps: Record<string, string[]> = {
    editor: content.howToUse.length > 3 ? content.howToUse : [
      `Type or paste Markdown content into the editor panel on the left.`,
      `Click "Render Preview" or switch to Preview mode to see the formatted output.`,
      `Use the Split, Preview, and Source buttons to toggle between viewing modes.`,
      `Copy the rendered HTML or export your Markdown as needed.`,
    ],
    converter: content.howToUse.length > 3 ? content.howToUse : [
      `Paste or type the source content you want to convert in the Input panel.`,
      `Click the "Convert" button to transform your content into the target format.`,
      `Review the converted output in the Output panel.`,
      `Copy the result to your clipboard or download it as a file.`,
    ],
    table: [
      `Set the desired number of rows and columns for your table.`,
      `Click "Generate Table" to create a Markdown table structure.`,
      `Copy the generated Markdown table code.`,
      `Paste it directly into your Markdown document.`,
    ],
    formatter: [
      `Paste your Markdown content into the Input panel.`,
      `Click "Format" or "Validate" to process your content.`,
      `Review the results in the Output panel.`,
      `Apply any suggested fixes or copy the formatted output.`,
    ],
    documentation: [
      `Describe the documentation you need to generate in the input field.`,
      `Click "Generate" to create a Markdown document.`,
      `Review and customize the generated content.`,
      `Copy or download the resulting Markdown file.`,
    ],
    generator: [
      `Enter the content or parameters for what you want to generate.`,
      `Click "Generate" to create the Markdown output.`,
      `Preview the generated result.`,
      `Copy and use it in your project.`,
    ],
    diagram: [
      `Write or paste Mermaid diagram code in the input panel.`,
      `Click "Render" to preview your diagram.`,
      `Edit the code and re-render as needed.`,
      `Export the diagram or copy the Mermaid code.`,
    ],
    utility: [
      `Provide the input content you want to process.`,
      `Click "Process" to run the utility.`,
      `Review the output and make any adjustments.`,
      `Save or export the result as needed.`,
    ],
  }

  const toolSteps = steps[tool.category] || [
    `Enter your content in the Input panel.`,
    `Click the action button to process your content.`,
    `Review the result in the Output panel.`,
    `Copy or download the output as needed.`,
  ]

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Use {tool.name}</h2>
      <ol className="space-y-3">
        {toolSteps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-500 text-white text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="leading-relaxed pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

function FAQSection({ tool }: { tool: Tool }) {
  const content = getToolContent(tool.id)
  const hasPerToolFaq = content.faq.length > 3 || content.faq.some(f => !f.q.includes('free to use'))

  const faqMap: Record<string, { q: string; a: string }[]> = {
    editor: hasPerToolFaq ? content.faq : [
      { q: `What is ${tool.name}?`, a: `${tool.name} is a free online tool for editing and previewing Markdown content in real time. All processing happens in your browser — nothing is sent to any server.` },
      { q: `Can I export my Markdown as HTML?`, a: `Yes. You can copy the rendered HTML output or save it as a file for use in your projects.` },
      { q: `Is ${tool.name} free to use?`, a: `Yes, it is completely free with no usage limits or account required.` },
    ],
    converter: hasPerToolFaq ? content.faq : [
      { q: `What formats does ${tool.name} support?`, a: `This tool converts between Markdown and other document formats. Check the tool description for supported conversions.` },
      { q: `Is my data secure?`, a: `Yes. All conversion happens entirely in your browser. Your content is never uploaded to any server.` },
      { q: `Can I convert multiple files at once?`, a: `For batch conversions, check out the Batch Markdown Converter tool.` },
    ],
    table: [
      { q: `How do I create a Markdown table?`, a: `Use the row and column controls to set the table size, then click Generate. The tool will produce properly formatted Markdown table syntax.` },
      { q: `Can I customize cell content?`, a: `The generated table uses placeholder data. You can edit the Markdown output directly to customize any cell.` },
      { q: `What Markdown table syntax is used?`, a: `The tool generates standard GFM (GitHub Flavored Markdown) table syntax with pipe-delimited columns.` },
    ],
    formatter: [
      { q: `What does ${tool.name} check?`, a: `The tool analyzes Markdown content for formatting, syntax, or validation issues depending on the specific tool.` },
      { q: `Can I fix issues automatically?`, a: `Yes. The tool can format your Markdown automatically. For validators, it reports issues that you can then fix.` },
      { q: `Is my content stored anywhere?`, a: `No. All processing is done locally in your browser. Your content never leaves your device.` },
    ],
    documentation: [
      { q: `What kind of documents can I generate?`, a: `This tool generates various documentation files in Markdown format. Check the specific tool for its exact capabilities.` },
      { q: `Can I customize the output?`, a: `Yes, the generated Markdown can be edited after generation. You can also modify the input to adjust the output.` },
      { q: `Is there a template I can use?`, a: `Each tool uses a built-in template. You can customize the input to produce different variations.` },
    ],
    generator: [
      { q: `What can I generate with ${tool.name}?`, a: `This tool generates specific Markdown elements. Refer to the tool description for details on what it creates.` },
      { q: `Can I preview the output before copying?`, a: `Yes, the generated Markdown is displayed in an output panel where you can review it before copying.` },
      { q: `Is there a limit on what I can generate?`, a: `No, you can generate as much content as you need — the tool is free and unlimited.` },
    ],
    diagram: [
      { q: `What is Mermaid?`, a: `Mermaid is a JavaScript-based diagramming tool that renders Markdown-inspired text definitions to create diagrams dynamically.` },
      { q: `Can I export the diagram?`, a: `Yes, you can copy the Mermaid code or export the rendered diagram as an image.` },
      { q: `What diagram types are supported?`, a: `This tool supports Mermaid diagram types. Check Mermaid's documentation for the full list of supported diagram types.` },
    ],
    utility: [
      { q: `What does ${tool.name} do?`, a: `This utility processes Markdown content in a specific way. Refer to the tool description for details.` },
      { q: `Can I use this with large files?`, a: `The tool processes content in your browser, so performance depends on your device. For very large files, consider splitting them.` },
      { q: `Is there a limit on usage?`, a: `No, this tool is completely free to use with no restrictions.` },
    ],
  }

  const faqs = faqMap[tool.category] || [
    { q: `What is ${tool.name}?`, a: `${tool.name} is a free online Markdown tool that runs entirely in your browser. No data is sent to any server.` },
    { q: `Is ${tool.name} free to use?`, a: `Yes, it is completely free with no usage limits.` },
    { q: `How does ${tool.name} protect my privacy?`, a: `All processing happens locally in your browser. Your content is never uploaded or stored on any server.` },
  ]

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h2>
      <div className="space-y-3">
        {faqs.map((item, i) => (
          <details key={i} className="group rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span>{item.q}</span>
              <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-800">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

function RelatedToolsSection({ tool, relatedTools }: { tool: Tool; relatedTools: Tool[] }) {
  if (relatedTools.length === 0) return null

  return (
    <section className="pb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Related Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {relatedTools.map(rt => (
          <Link
            key={rt.id}
            href={rt.slug}
            className="group block p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all"
          >
            <div className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
              {rt.name}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 capitalize">{rt.category}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function ContentSections({ tool, relatedTools }: { tool: Tool; relatedTools: Tool[] }) {
  return (
    <div className="mt-16 space-y-12 border-t border-slate-200 dark:border-slate-700 pt-12">
      <HowToUseSection tool={tool} />
      <FAQSection tool={tool} />
      <RelatedToolsSection tool={tool} relatedTools={relatedTools} />
    </div>
  )
}

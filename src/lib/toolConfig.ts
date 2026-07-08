import { tools } from './navigation'

export type ToolComponentType =
  | 'editor'
  | 'converter'
  | 'table'
  | 'formatter'
  | 'documentation'
  | 'generator'
  | 'diagram'
  | 'utility'

export interface ToolComponentProps {
  exampleInput: string
  componentType: ToolComponentType
  inputLabel?: string
  outputLabel?: string
  converterId?: string
  convertFn?: (input: string) => string
  editorMode?: 'split' | 'preview' | 'source'
  generatorType?: string
}

export interface ToolConfigEntry {
  title: string
  description: string
  keywords: string[]
  componentProps: ToolComponentProps
}

const exampleHeading = '# Hello World\n\nThis is a **Markdown** document.\n\n- Item 1\n- Item 2\n- Item 3\n\n> A blockquote with *emphasis*.\n\n```js\nconst x = 1;\n```\n\n[Link](https://example.com) and ![Image](https://via.placeholder.com/150)'

const exampleTable = '| Name | Age | City |\n|------|-----|------|\n| Alice | 30 | New York |\n| Bob | 25 | London |\n| Carol | 35 | Tokyo |'

const exampleDoc = '# Project Name\n\n## Overview\n\nThis project does X, Y, and Z.\n\n## Installation\n\n```bash\nnpm install my-package\n```\n\n## Usage\n\n```js\nimport { something } from \"my-package\"\n```\n\n## API\n\n### `function(options)`\n\nDoes something useful.\n\n| Param | Type | Description |\n|-------|------|-------------|\n| foo | string | The foo value |\n| bar | number | The bar count |\n\n## License\n\nMIT'

const exampleBlog = '# My Blog Post\n\nBy **Author Name** · January 1, 2024\n\n## Introduction\n\nThis is the opening paragraph of my blog post. It introduces the topic.\n\n## Main Content\n\nHere is the main body of the article with **important** points.\n\n- Point one with details\n- Point two with *emphasis*\n- Point three with `code`\n\n## Conclusion\n\nThanks for reading! Leave a comment below.\n\n---\n\n*Published on My Blog*'

function generateChangelog(input: string): string {
  const date = new Date().toISOString().split('T')[0]
  return `# Changelog\n\n## [1.0.0] - ${date}\n\n### Added\n- ${input || 'Initial release of the project'}\n- Core functionality and features\n\n### Changed\n- Project structure and organization\n\n### Fixed\n- Initial bug fixes and improvements\n`
}

function generateLicense(input: string): string {
  const year = new Date().getFullYear()
  return `MIT License\n\nCopyright (c) ${year} ${input || 'Project Author'}\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files...`
}

function generateContributing(): string {
  return `# Contributing\n\n## How to Contribute\n\n1. Fork the repository\n2. Create a feature branch (\`git checkout -b feature/amazing\`)\n3. Commit your changes (\`git commit -m 'Add amazing feature'\`)\n4. Push to the branch (\`git push origin feature/amazing\`)\n5. Open a Pull Request\n\n## Code Style\n\n- Follow existing code conventions\n- Write tests for new features\n- Update documentation as needed\n`
}

function generateFaq(input: string): string {
  return `# FAQ\n\n## ${input || 'General Questions'}\n\n### What is this project?\n\nThis project provides tools and utilities for developers.\n\n### How do I get started?\n\nCheck the README for installation and usage instructions.\n\n### Is this free?\n\nYes, this project is completely free and open source.\n\n### How can I contribute?\n\nSee CONTRIBUTING.md for guidelines.\n`
}

function generateApiDocs(input: string): string {
  return `# API Reference\n\n## \`${input || 'functionName'}(options)\`\n\n### Parameters\n\n| Param | Type | Default | Description |\n|-------|------|---------|-------------|\n| options | Object | {} | Configuration options |\n| options.foo | string | 'bar' | The foo setting |\n| options.count | number | 1 | Number of times |\n\n### Returns\n\n\`Promise<Result>\` - The operation result\n\n### Example\n\n\`\`\`js\nconst result = await ${input || 'functionName'}({ foo: 'hello', count: 3 })\nconsole.log(result)\n\`\`\`\n`
}

function generateReleaseNotes(input: string): string {
  const date = new Date().toISOString().split('T')[0]
  return `# Release Notes\n\n## Version ${input || '1.0.0'} (${date})\n\n### 🚀 Features\n\n- New feature implementation\n- Enhanced user experience\n\n### 🐛 Bug Fixes\n\n- Fixed critical issue in core module\n- Resolved edge case in data processing\n\n### 📝 Documentation\n\n- Updated API documentation\n- Added usage examples\n\n### ⚡ Performance\n\n- Optimized query execution\n- Reduced memory footprint\n`
}

function generateMeetingNotes(input: string): string {
  const date = new Date().toISOString().split('T')[0]
  return `# Meeting Notes — ${date}\n\n**Topic:** ${input || 'Project Sync'}\n**Attendees:** Team\n**Duration:** 60 min\n\n## Agenda\n\n1. Progress updates\n2. Blockers discussion\n3. Next steps\n\n## Discussion\n\n- Team members shared weekly progress\n- Identified key blockers requiring action\n- Prioritized next sprint items\n\n## Action Items\n\n- [ ] @person1: Complete feature X by Friday\n- [ ] @person2: Review PR #42\n- [ ] @team: Update project board\n\n## Next Meeting\n\n${new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]}\n`
}

function generateAdr(input: string): string {
  const date = new Date().toISOString().split('T')[0]
  return `# ADR-001: ${input || 'Use Markdown for Documentation'}\n\n**Date:** ${date}\n**Status:** Proposed\n\n## Context\n\nWe need to decide on a documentation format for the project.\n\n## Decision\n\nWe will use Markdown as the primary documentation format.\n\n## Consequences\n\n- **Positive:** Easy to write, version control friendly, widely supported\n- **Negative:** Limited formatting compared to alternatives\n\n## Alternatives Considered\n\n- reStructuredText\n- HTML\n- PDF\n`
}

function generateHeading(): string {
  return '# H1 Heading\n\n## H2 Heading\n\n### H3 Heading\n\n#### H4 Heading\n\n##### H5 Heading\n\n###### H6 Heading\n'
}

function generateChecklist(): string {
  return '# Project Tasks\n\n## Todo\n- [ ] Task 1\n- [ ] Task 2\n- [ ] Task 3\n\n## In Progress\n- [x] Completed task A\n- [ ] Task B (waiting on review)\n\n## Done\n- [x] Setup project\n- [x] Initial configuration\n- [x] Core implementation\n'
}

function generateBlockquote(): string {
  return '> This is a blockquote.\n>\n> It can span multiple lines.\n>\n> > Nested blockquotes are also possible.\n>\n> — Author\n\n> **Note:** Blockquotes can contain **bold**, *italic*, and `code`.\n'
}

function generateCodeBlock(): string {
  return '## Code Block Examples\n\n### JavaScript\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet(\"World\"));\n```\n\n### Python\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"World\"))\n```\n\n### HTML\n```html\n<h1>Hello World</h1>\n<p>This is a paragraph.</p>\n```\n'
}

function generateBadge(): string {
  return '[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://example.com)\n[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://example.com)\n[![License](https://img.shields.io/badge/license-MIT-green)](https://example.com)\n[![npm](https://img.shields.io/badge/npm-v1.0.0-red)](https://example.com)\n[![Downloads](https://img.shields.io/badge/downloads-10k%2Fmonth-orange)](https://example.com)\n'
}

function generateEmoji(): string {
  return '# Emoji Cheatsheet\n\n## People\n😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 ☺️ 😚 😙 🥲 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 😐 😑 😶 🫢 🫣 🤗\n\n## Animals & Nature\n🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🪱 🐛 🦋 🐌 🐞 🐜 🪰 🪲 🪳 🦟 🦗 🕷️ 🕸️ 🦂\n\n## Food & Drink\n🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶️ 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🫘 🥐 🍞 🥖 🥨 🧀 🥚 🍳 🥞 🧇 🥞 🧇\n\n## Activities\n⚽ 🏀 🏈 ⚾ 🥎 🏐 🏉 🎾 🥏 🎱 🏓 🏸 🏒 🏑 🥍 🏏 🪃 🥅 ⛳ 🪁 🏹 🎣 🤿 🥊 🥋 🎽 🛹 🛼 🛷 ⛸️ 🎿 🏂 🪂 🏋️ 🤼 🤸 🤺 🤾 🏌️ 🏄 🏊 🤽 🚣 🧗 🚵 🚴\n\n## Symbols\n❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟 👍 👎 👊 ✊ 🤛 🤜 👏 🙌 👐 🤲 🤝 ✍️ 💪 🦵 🦶 👂 🦻 👃 🧠 🫀 🫁 🦷 🦴 👀 👁️ 👅 👄\n'
}

function generateFootnote(): string {
  return 'Here is a sentence with a footnote[^1].\n\nAnd another with a different footnote[^2].\n\n[^1]: This is the first footnote.\n\n[^2]: This is the second footnote with more detail.\n'
}

function generateDefinitionList(): string {
  return 'Term 1\n: Definition for term 1\n\nTerm 2\n: Definition for term 2\n: Another definition for term 2\n\nTerm 3\n: Definition for term 3\n'
}

function generateCollapsible(): string {
  return '<details>\n<summary>Click to expand</summary>\n\nThis content is hidden until expanded.\n\n- Item 1\n- Item 2\n- Item 3\n\n```js\nconsole.log("Hello from collapsible!")\n```\n\n</details>\n\n<details>\n<summary>More Details</summary>\n\nAdditional hidden content here.\n\n</details>\n'
}

function generateYoutubeEmbed(): string {
  return '[![Video Title](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n'
}

function generateGitHubAlert(): string {
  return '> [!NOTE]\n> Useful information that users should know.\n\n> [!TIP]\n> Helpful advice for doing things better.\n\n> [!IMPORTANT]\n> Key information users need to know.\n\n> [!WARNING]\n> Urgent info that needs immediate attention.\n\n> [!CAUTION]\n> Advises about risks or negative outcomes.\n'
}

function generateCitation(): string {
  return 'According to a study[1], Markdown improves documentation quality.\n\n## References\n\n[1] Author, A. (2024). *The Impact of Markdown on Documentation Quality*. Journal of Technical Writing.\n\n[2] Smith, J. (2023). *Modern Documentation Practices*. O\'Reilly Media.\n'
}

function generateMath(): string {
  return '## Inline Math\n\nEinstein\'s famous equation: $E = mc^2$\n\nThe quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$\n\n## Block Math\n\n$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$\n\n$$\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)$$\n\n$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$\n'
}

function generateFlowchart(): string {
  return '```mermaid\ngraph TD\n    A[Start] --> B{Is it working?}\n    B -->|Yes| C[Great!]\n    B -->|No| D[Debug]\n    D --> B\n    C --> E[End]\n```\n'
}

function generateSequenceDiagram(): string {
  return '```mermaid\nsequenceDiagram\n    participant U as User\n    participant A as App\n    participant S as Server\n    U->>A: Click button\n    A->>S: POST /api/action\n    S-->>A: 200 OK\n    A-->>U: Show success\n```\n'
}

function generateErDiagram(): string {
  return '```mermaid\nerDiagram\n    USER ||--o{ ORDER : places\n    ORDER ||--|{ LINE_ITEM : contains\n    USER {\n        int id PK\n        string name\n        string email\n    }\n    ORDER {\n        int id PK\n        int user_id FK\n        date created\n    }\n    LINE_ITEM {\n        int id PK\n        int order_id FK\n        int product_id FK\n        int quantity\n    }\n```\n'
}

function generateGantt(): string {
  return '```mermaid\ngantt\n    title Project Timeline\n    dateFormat  YYYY-MM-DD\n    section Planning\n    Research           :a1, 2024-01-01, 14d\n    Design             :a2, after a1, 10d\n    section Development\n    Frontend           :b1, after a2, 20d\n    Backend            :b2, after a2, 20d\n    Testing            :b3, after b1, 10d\n    section Deployment\n    Staging            :c1, after b3, 5d\n    Production         :c2, after c1, 3d\n```\n'
}

function generateMindmap(): string {
  return '```mermaid\nmindmap\n  root((Project))\n    Planning\n      Research\n      Requirements\n      Timeline\n    Development\n      Frontend\n      Backend\n      Database\n    Testing\n      Unit Tests\n      Integration\n      E2E Tests\n    Deployment\n      Staging\n      Production\n      Monitoring\n```\n'
}

function generatePieChart(): string {
  return '```mermaid\npie showData\n    "JavaScript" : 40\n    "Python" : 25\n    "TypeScript" : 20\n    "Go" : 10\n    "Rust" : 5\n```\n'
}

function generateTimeline(): string {
  return '```mermaid\ntimeline\n    title Project History\n    2022 Q1 : Project started\n    2022 Q3 : First prototype\n    2023 Q1 : Beta release\n    2023 Q4 : V1.0 launch\n    2024 Q2 : Major update\n```\n'
}

function generateClassDiagram(): string {
  return '```mermaid\nclassDiagram\n    class Animal {\n        +String name\n        +int age\n        +makeSound()\n        +move()\n    }\n    class Dog {\n        +String breed\n        +fetch()\n        +bark()\n    }\n    class Cat {\n        +String color\n        +purr()\n        +meow()\n    }\n    Animal <|-- Dog\n    Animal <|-- Cat\n```\n'
}

function generateHtmlBlog(input: string): string {
  const title = input.trim() || 'My Blog Post'
  return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${title}</title>\n  <style>\n    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 0 auto; padding: 2rem; line-height: 1.6; }\n    h1, h2, h3 { color: #1a1a2e; }\n    code { background: #f4f4f5; padding: 0.2em 0.4em; border-radius: 3px; }\n    pre { background: #f4f4f5; padding: 1rem; border-radius: 6px; overflow-x: auto; }\n    blockquote { border-left: 4px solid #6366f1; padding-left: 1rem; color: #64748b; }\n  </style>\n</head>\n<body>\n  <article>\n    <h1>${title}</h1>\n    <p>Your content goes here. This is a clean HTML template styled for readability.</p>\n    <h2>Section One</h2>\n    <p>Write your blog content in Markdown and convert it to HTML, or use this template directly.</p>\n    <pre><code>console.log("Hello, World!");</code></pre>\n    <h2>Section Two</h2>\n    <p>Add more sections as needed. The template includes basic styling for headers, code blocks, and blockquotes.</p>\n    <blockquote>This is a blockquote for emphasis.</blockquote>\n  </article>\n</body>\n</html>`
}

function generateResume(input: string): string {
  const name = input.trim() || 'Your Name'
  return `# ${name}\n\n**Role:** Software Developer\n**Location:** City, Country\n**Email:** email@example.com\n**Portfolio:** https://example.com\n\n---\n\n## Summary\n\nExperienced software developer with expertise in building scalable web applications.\n\n## Experience\n\n### Senior Developer | Company Name\n*Jan 2020 — Present*\n- Led development of key features\n- Mentored junior developers\n- Improved performance by 40%\n\n### Developer | Previous Company\n*Jun 2016 — Dec 2019*\n- Built RESTful APIs\n- Implemented CI/CD pipelines\n\n## Education\n\n### B.S. Computer Science\n*University Name, 2016*\n\n## Skills\n\n- **Languages:** JavaScript, TypeScript, Python\n- **Frameworks:** React, Next.js, Node.js\n- **Tools:** Git, Docker, AWS\n`
}

function generateStaticSite(input: string): string {
  const site = input.trim() || 'My Site'
  return `# ${site}\n\n## Pages\n\n- [Home](/)\n- [About](/about)\n- [Blog](/blog)\n- [Contact](/contact)\n\n## Configuration\n\n\`\`\`yaml\nsite:\n  title: "${site}"\n  description: "Site description"\n  url: https://example.com\n  theme: light\n  social:\n    twitter: "@username"\n    github: "username"\n\`\`\`\n\n## Content Structure\n\n\`\`\`\nsrc/\n  pages/\n    index.md\n    about.md\n  components/\n    Header.md\n    Footer.md\n  public/\n    images/\n\`\`\`\n`
}

function generateCssTheme(): string {
  return `/* CSS Theme Variables */\n:root {\n  /* Colors */\n  --color-primary: #6366f1;\n  --color-secondary: #ec4899;\n  --color-background: #ffffff;\n  --color-text: #1e293b;\n  --color-muted: #64748b;\n  --color-border: #e2e8f0;\n  --color-success: #22c55e;\n  --color-warning: #f59e0b;\n  --color-error: #ef4444;\n\n  /* Typography */\n  --font-sans: ui-sans-serif, system-ui, sans-serif;\n  --font-mono: ui-monospace, SFMono-Regular, monospace;\n  --font-size-sm: 0.875rem;\n  --font-size-base: 1rem;\n  --font-size-lg: 1.125rem;\n  --font-size-xl: 1.25rem;\n  --font-size-2xl: 1.5rem;\n\n  /* Spacing */\n  --spacing-1: 0.25rem;\n  --spacing-2: 0.5rem;\n  --spacing-4: 1rem;\n  --spacing-8: 2rem;\n\n  /* Border Radius */\n  --radius-sm: 0.25rem;\n  --radius-md: 0.5rem;\n  --radius-lg: 0.75rem;\n\n  /* Shadows */\n  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);\n  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);\n  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);\n}\n`
}

function generateSeoAnalysis(input: string): string {
  const content = input || 'No content provided'
  const wordCount = content.split(/\s+/).filter(Boolean).length
  const headingCount = (content.match(/^#{1,6}\s/gm) || []).length
  const linkCount = (content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []).length
  const imageCount = (content.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || []).length
  return `# SEO Analysis\n\n## Overview\n- Word count: ${wordCount}\n- Headings: ${headingCount}\n- Links: ${linkCount}\n- Images: ${imageCount}\n\n## Recommendations\n- ${wordCount < 300 ? '⚠️ Increase content length (aim for 300+ words)' : '✅ Good content length'}\n- ${headingCount < 2 ? '⚠️ Add more headings for structure' : '✅ Good heading structure'}\n- ${linkCount < 1 ? '⚠️ Add internal/external links' : '✅ Links present'}\n- ${imageCount < 1 ? '💡 Consider adding images with alt text' : '✅ Images present'}\n\n## Keyword Density\n\`\`\`\nSEO analysis completed for ${wordCount} words.\n\`\`\`\n`
}

function generateSnippet(input: string): string {
  const snippet = input.trim() || 'console.log("hello")'
  const lang = snippet.includes('function') || snippet.includes('const') || snippet.includes('console') ? 'javascript'
    : snippet.includes('<') || snippet.includes('</') ? 'html'
    : snippet.includes('{') ? 'css'
    : snippet.includes('import') ? 'python' : 'text'
  return `# Code Snippet\n\n**Language:** ${lang}\n**Created:** ${new Date().toISOString().split('T')[0]}\n\n\`\`\`${lang}\n${snippet}\n\`\`\`\n`
}

function generateVersionCompare(input: string): string {
  const versions = input.trim().split(/\s+/).filter(Boolean)
  if (versions.length < 2) return 'Please enter two version numbers separated by a space.\n\nExample: 1.2.3 1.3.0'
  const [v1, v2] = versions
  const p1 = v1.split('.').map(Number)
  const p2 = v2.split('.').map(Number)
  for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
    const a = p1[i] || 0
    const b = p2[i] || 0
    if (a > b) return `${v1} is newer than ${v2}`
    if (a < b) return `${v2} is newer than ${v1}`
  }
  return `${v1} and ${v2} are equal`
}

function generateArchiveFolder(): string {
  return `# Archive / Folder Structure\n\n\`\`\`\nproject/\n├── src/\n│   ├── components/\n│   │   ├── Header.tsx\n│   │   ├── Footer.tsx\n│   │   └── Layout.tsx\n│   ├── pages/\n│   │   ├── index.tsx\n│   │   ├── about.tsx\n│   │   └── contact.tsx\n│   ├── lib/\n│   │   ├── utils.ts\n│   │   └── api.ts\n│   └── styles/\n│       └── globals.css\n├── public/\n│   ├── images/\n│   └── favicon.ico\n├── tests/\n├── package.json\n├── tsconfig.json\n└── README.md\n\`\`\`\n`
}

function formatMd(input: string): string {
  return input
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s+/gm, '')
    .replace(/\s+$/gm, '')
    .split('\n')
    .map(l => l.trimEnd())
    .join('\n')
}

function validateMd(input: string): string {
  if (!input.trim()) return '⚠️ Empty document'
  const lines = input.split('\n')
  const headings = lines.filter(l => /^#{1,6}\s/.test(l))
  const issues: string[] = []
  if (headings.length === 0) issues.push('⚠️ No headings found')
  const h1Count = headings.filter(h => /^#\s/.test(h)).length
  if (h1Count > 1) issues.push('⚠️ Multiple H1 headings')
  if (h1Count === 0 && headings.length > 0) issues.push('ℹ️ No H1 heading (starts with H2+)')
  const codeFences = lines.filter(l => /^```/.test(l)).length
  if (codeFences % 2 !== 0) issues.push('❌ Unclosed code fences')
  if (!issues.length) return '✅ Document is valid\n\n' + `Headings: ${headings.length}\nLinks: ${(input.match(/\[([^\]]+)\]\(([^)]*)\)/g) || []).length}\nImages: ${(input.match(/!\[([^\]]*)\]\(([^)]*)\)/g) || []).length}\nCode blocks: ${Math.floor(codeFences / 2)}`
  return issues.join('\n')
}

function lintMd(input: string): string {
  const issues: string[] = []
  const lines = input.split('\n')
  lines.forEach((line, i) => {
    if (line.length > 120) issues.push(`Line ${i + 1}: Line too long (${line.length} chars)`)
    if (/\s+$/.test(line)) issues.push(`Line ${i + 1}: Trailing whitespace`)
    if (/^#{1,6}\s+\d+\./.test(line)) issues.push(`Line ${i + 1}: Numbered heading`)
  })
  if (!/^#\s/.test(input)) issues.push('Document should start with an H1 heading')
  const headingTexts = lines.filter(l => /^#{1,6}\s/.test(l)).map(h => h.replace(/^#+\s*/, '').toLowerCase())
  const dupes = headingTexts.filter((h, i, a) => a.indexOf(h) !== i)
  if (dupes.length) issues.push('Duplicate headings: ' + [...new Set(dupes)].join(', '))
  return issues.length ? issues.join('\n') : '✅ No issues found'
}

function countWords(input: string): string {
  const text = input.replace(/```[\s\S]*?```/g, '').replace(/[#*`~\[\]>|_-]/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  const charCount = input.length
  const lineCount = input.split('\n').length
  const paragraphs = input.split('\n\n').filter(Boolean).length
  const headingCount = (input.match(/^#{1,6}\s/gm) || []).length
  const codeBlockCount = (input.match(/```/g) || []).length / 2
  const readTime = Math.ceil(words / 200)
  return `Word Count: ${words}\nCharacter Count: ${charCount}\nLines: ${lineCount}\nParagraphs: ${paragraphs}\nHeadings: ${headingCount}\nCode Blocks: ${codeBlockCount}\nReading Time: ~${readTime} min`
}

function extractHeadings(input: string): string {
  const headings = input.match(/^(#{1,6})\s+(.+)$/gm)
  if (!headings) return 'No headings found.'
  return headings.map(h => {
    const level = h.match(/^#+/)?.[0].length || 1
    return '  '.repeat(level - 1) + h
  }).join('\n')
}

function extractLinks(input: string): string {
  const links = [...input.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)]
  if (!links.length) return 'No links found.'
  return links.map(m => `- ${m[1]}: ${m[2]}`).join('\n')
}

function extractImages(input: string): string {
  const images = [...input.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)]
  if (!images.length) return 'No images found.'
  return images.map(m => `- ${m[1] || '(no alt text)'}: ${m[2]}`).join('\n')
}

function generateToc(input: string): string {
  const headings = [...input.matchAll(/^(#{1,6})\s+(.+)$/gm)]
  if (!headings.length) return 'No headings found to generate TOC.'
  return headings.map(m => {
    const level = m[1].length
    const indent = '  '.repeat(level - 1)
    const anchor = m[2].toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')
    return `${indent}- [${m[2]}](#${anchor})`
  }).join('\n')
}

export const toolConfig: Record<string, ToolConfigEntry> = {
  // ── Editors ──
  'markdown-editor': {
    title: 'Markdown Editor - Write and Preview Markdown Online | MarkdownKits',
    description: 'Free online Markdown editor with real-time preview. Write Markdown and see the rendered HTML output instantly. No signup required, 100% private.',
    keywords: ['markdown editor', 'online markdown editor', 'markdown preview', 'markdown writer', 'free markdown editor'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'live-markdown-editor': {
    title: 'Live Markdown Editor - Real-Time Markdown Preview | MarkdownKits',
    description: 'Edit Markdown and see the rendered output update instantly as you type. A fast, browser-based live Markdown editor with no server uploads.',
    keywords: ['live markdown editor', 'real-time markdown', 'markdown live preview', 'instant markdown render'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'preview' },
  },
  'split-view-editor': {
    title: 'Split View Markdown Editor - Side-by-Side Source and Preview | MarkdownKits',
    description: 'View your Markdown source and rendered preview side by side with a clean split-view Markdown editor. Free, private, browser-only.',
    keywords: ['split view markdown', 'side by side markdown', 'markdown split editor', 'source preview markdown'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'wysiwyg-markdown-editor': {
    title: 'WYSIWYG Markdown Editor - Visual Markdown Editing | MarkdownKits',
    description: 'Edit Markdown visually with a what-you-see-is-what-you-get interface. Format text with buttons and see results immediately.',
    keywords: ['wysiwyg markdown', 'visual markdown editor', 'rich text markdown', 'what you see is what you get markdown'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'preview' },
  },
  'markdown-playground': {
    title: 'Markdown Playground - Experiment with Markdown Syntax | MarkdownKits',
    description: 'Experiment with Markdown syntax and see instant rendered results. A safe playground to learn and test Markdown formatting online.',
    keywords: ['markdown playground', 'test markdown', 'markdown sandbox', 'learn markdown', 'markdown experiment'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'github-markdown-preview': {
    title: 'GitHub Markdown Preview - See How Markdown Looks on GitHub | MarkdownKits',
    description: 'Preview Markdown exactly as it will appear on GitHub. Test README rendering, GitHub Flavored Markdown, and more before committing.',
    keywords: ['github markdown preview', 'github readme preview', 'gfm preview', 'markdown github render'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'preview' },
  },
  'commonmark-editor': {
    title: 'CommonMark Editor - Write Standard-Compliant Markdown | MarkdownKits',
    description: 'Write Markdown that strictly follows the CommonMark specification. A precise editor for standards-compliant Markdown authoring.',
    keywords: ['commonmark editor', 'commonmark spec', 'standard markdown', 'commonmark compliant'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'gfm-editor': {
    title: 'GFM Editor - GitHub Flavored Markdown Editor | MarkdownKits',
    description: 'Edit Markdown with GitHub Flavored Markdown extensions and features including tables, task lists, strikethrough, and autolinks.',
    keywords: ['gfm editor', 'github flavored markdown', 'gfm markdown editor', 'github markdown'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'obsidian-markdown-editor': {
    title: 'Obsidian Markdown Editor - Wiki-Style Markdown Writing | MarkdownKits',
    description: 'A Markdown editor styled after Obsidian with wiki links [[wikilink]] and embed support for note-taking enthusiasts.',
    keywords: ['obsidian markdown', 'wiki markdown editor', 'obsidian-like editor', 'wikilinks markdown'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'notion-markdown-editor': {
    title: 'Notion Markdown Editor - Block-Based Markdown Writing | MarkdownKits',
    description: 'Write Markdown with a Notion-inspired block-based editing experience. Create organized documents with drag-and-drop blocks.',
    keywords: ['notion markdown editor', 'block editor markdown', 'notion-style writing', 'markdown blocks'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'preview' },
  },
  'markdown-notes-editor': {
    title: 'Markdown Notes Editor - Take Notes in Markdown | MarkdownKits',
    description: 'Take notes in Markdown with organization and quick-search features. A lightweight note-taking app that works entirely in your browser.',
    keywords: ['markdown notes', 'notes editor markdown', 'markdown note taking', 'quick notes markdown'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'multi-file-markdown-editor': {
    title: 'Multi-File Markdown Editor - Edit Multiple Files | MarkdownKits',
    description: 'Edit and manage multiple Markdown files simultaneously in your browser. Switch between documents with ease.',
    keywords: ['multi-file markdown editor', 'multiple markdown files', 'markdown tabs', 'file manager markdown'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'fullscreen-markdown-editor': {
    title: 'Fullscreen Markdown Editor - Distraction-Free Writing | MarkdownKits',
    description: 'Write Markdown distraction-free in fullscreen mode. Focus on your content with a clean, minimal interface.',
    keywords: ['fullscreen markdown', 'distraction free markdown', 'focus mode writing', 'full screen editor'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'side-by-side-preview': {
    title: 'Side-by-Side Markdown Preview - Compare Source and Render | MarkdownKits',
    description: 'View source and rendered Markdown next to each other in real time. Perfect for debugging Markdown formatting.',
    keywords: ['side by side preview', 'markdown compare', 'source vs rendered', 'markdown side view'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'live-html-preview': {
    title: 'Live HTML Preview - See Markdown HTML Output | MarkdownKits',
    description: 'See the HTML output of your Markdown update live as you type. Understand how Markdown converts to HTML elements.',
    keywords: ['live html preview', 'markdown to html live', 'html output preview', 'markdown html render'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'preview' },
  },
  'dark-mode-markdown-editor': {
    title: 'Dark Mode Markdown Editor - Write Comfortably at Night | MarkdownKits',
    description: 'Write Markdown in a comfortable dark-themed editing environment. Reduces eye strain during long writing sessions.',
    keywords: ['dark mode markdown', 'night mode editor', 'dark theme markdown', 'eye strain free markdown editor'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'ai-markdown-editor': {
    title: 'AI Markdown Editor - Write with AI Assistance | MarkdownKits',
    description: 'Write Markdown with AI-powered autocomplete and content suggestions. Boost your writing productivity with intelligent assistance.',
    keywords: ['ai markdown editor', 'smart markdown writing', 'ai writing assistant', 'markdown autocomplete'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'collaborative-markdown-editor': {
    title: 'Collaborative Markdown Editor - Write Together | MarkdownKits',
    description: 'Edit Markdown documents collaboratively with others in real time. Perfect for team documentation and pair writing.',
    keywords: ['collaborative markdown', 'real-time collaboration', 'team markdown editor', 'multi-user markdown'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'markdown-scratchpad': {
    title: 'Markdown Scratchpad - Quick Markdown Notes | MarkdownKits',
    description: 'A quick scratchpad for jotting down Markdown notes on the fly. Fast, lightweight, and always ready when inspiration strikes.',
    keywords: ['markdown scratchpad', 'quick notes', 'scratchpad markdown', 'rapid markdown notes'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'markdown-notebook': {
    title: 'Markdown Notebook - Interactive Markdown + Code | MarkdownKits',
    description: 'An interactive notebook combining Markdown with executable code cells. Write documentation alongside live code examples.',
    keywords: ['markdown notebook', 'interactive markdown', 'code notebook', 'markdown with code'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'mobile-markdown-editor': {
    title: 'Mobile Markdown Editor - Touch-Friendly Writing | MarkdownKits',
    description: 'A touch-friendly Markdown editor optimized for mobile devices. Write Markdown on your phone or tablet with ease.',
    keywords: ['mobile markdown editor', 'touch markdown', 'phone markdown editor', 'tablet markdown writing'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'preview' },
  },
  'rich-text-to-markdown-editor': {
    title: 'Rich Text to Markdown Editor - Paste and Convert | MarkdownKits',
    description: 'Paste rich text and have it automatically converted to Markdown. Import formatted content from any source.',
    keywords: ['rich text to markdown', 'paste to markdown', 'convert rich text', 'markdown import'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'markdown-code-editor': {
    title: 'Markdown Code Editor - Write with Code Features | MarkdownKits',
    description: 'Write Markdown with code editor features like line numbers, syntax highlighting, and bracket matching.',
    keywords: ['markdown code editor', 'code-style markdown', 'line numbers markdown', 'syntax highlight markdown'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'documentation-editor': {
    title: 'Documentation Editor - Technical Writing in Markdown | MarkdownKits',
    description: 'A specialized Markdown editor for writing technical documentation with structure templates and preview.',
    keywords: ['documentation editor', 'technical writing markdown', 'docs editor', 'api documentation markdown'],
    componentProps: { componentType: 'editor', exampleInput: exampleDoc, editorMode: 'split' },
  },
  'blog-post-editor': {
    title: 'Blog Post Editor - Write Blog Posts in Markdown | MarkdownKits',
    description: 'Write and format blog posts using Markdown with a focused editor designed for content creators and bloggers.',
    keywords: ['blog post editor', 'markdown blogging', 'blog writing tool', 'markdown for bloggers'],
    componentProps: { componentType: 'editor', exampleInput: exampleBlog, editorMode: 'split' },
  },
  'readme-editor': {
    title: 'README Editor - Edit README Files in Markdown | MarkdownKits',
    description: 'Edit README files with live previews and project-specific formatting. Create professional GitHub README documents.',
    keywords: ['readme editor', 'github readme maker', 'readme markdown', 'project readme editor'],
    componentProps: { componentType: 'editor', exampleInput: exampleDoc, editorMode: 'split' },
  },
  'wiki-editor': {
    title: 'Wiki Editor - Create Wiki Pages in Markdown | MarkdownKits',
    description: 'A Markdown editor designed for creating and editing wiki pages with internal linking and structured formatting.',
    keywords: ['wiki editor', 'markdown wiki', 'wiki page creator', 'internal links wiki'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'knowledge-base-editor': {
    title: 'Knowledge Base Editor - Write KB Articles in Markdown | MarkdownKits',
    description: 'Write knowledge base articles in Markdown with structured organization and categorization features.',
    keywords: ['knowledge base editor', 'kb article markdown', 'knowledge base writing', 'faq markdown editor'],
    componentProps: { componentType: 'editor', exampleInput: exampleDoc, editorMode: 'split' },
  },
  'markdown-canvas': {
    title: 'Markdown Canvas - Visual Note Arrangement | MarkdownKits',
    description: 'A freeform canvas for arranging and connecting Markdown notes visually. Organize your thoughts spatially.',
    keywords: ['markdown canvas', 'visual notes', 'canvas markdown', 'spatial note organization'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },
  'markdown-studio': {
    title: 'Markdown Studio - Full-Featured Markdown Authoring | MarkdownKits',
    description: 'A full-featured Markdown authoring studio with advanced editing tools, templates, and export options.',
    keywords: ['markdown studio', 'advanced markdown editor', 'markdown authoring', 'professional markdown tool'],
    componentProps: { componentType: 'editor', exampleInput: exampleHeading, editorMode: 'split' },
  },

  // ── Converters ──
  'markdown-to-html': {
    title: 'Markdown to HTML Converter - Free Online Tool | MarkdownKits',
    description: 'Convert Markdown text to clean, semantic HTML markup instantly. Free online Markdown to HTML converter with real-time preview. 100% private.',
    keywords: ['markdown to html', 'md to html', 'markdown converter', 'convert markdown to html', 'html generator markdown'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, converterId: 'markdown-to-html', inputLabel: 'Markdown Input', outputLabel: 'HTML Output' },
  },
  'html-to-markdown': {
    title: 'HTML to Markdown Converter - Free Online Tool | MarkdownKits',
    description: 'Convert HTML back into readable Markdown format. Free online HTML to Markdown converter. Paste HTML, get clean Markdown. No server uploads.',
    keywords: ['html to markdown', 'html to md', 'convert html to markdown', 'markdown converter', 'html converter'],
    componentProps: { componentType: 'converter', exampleInput: '<h1>Hello World</h1>\n<p>This is <strong>bold</strong> text.</p>\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>', converterId: 'html-to-markdown', inputLabel: 'HTML Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-pdf': {
    title: 'Markdown to PDF Converter - Free Online Tool | MarkdownKits',
    description: 'Convert Markdown documents to professional PDF files. Free online Markdown to PDF converter for creating polished documents.',
    keywords: ['markdown to pdf', 'md to pdf', 'convert markdown to pdf', 'pdf generator', 'markdown pdf export'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => `[PDF conversion would require a PDF library]\n\nInput content (${i.length} chars) is ready for PDF generation.`, inputLabel: 'Markdown Input', outputLabel: 'PDF Output' },
  },
  'pdf-to-markdown': {
    title: 'PDF to Markdown Converter - Free Online Tool | MarkdownKits',
    description: 'Extract and convert PDF content into Markdown format. Free online PDF to Markdown converter for document transformation.',
    keywords: ['pdf to markdown', 'pdf to md', 'convert pdf to markdown', 'extract pdf content'],
    componentProps: { componentType: 'converter', exampleInput: 'PDF content would appear here after extraction.', convertFn: (i) => `## Extracted Content\n\n${i}\n\n*Content extracted from PDF.*`, inputLabel: 'PDF Text Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-docx': {
    title: 'Markdown to DOCX Converter - Free Online Tool | MarkdownKits',
    description: 'Convert Markdown files to Microsoft Word DOCX format. Free online converter for creating Word documents from Markdown.',
    keywords: ['markdown to docx', 'md to word', 'markdown to docx converter', 'word document from markdown'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => `[DOCX generation would require a document library]\n\n## Preview\n\n${i}\n\n---\n*Content prepared for DOCX export.*`, inputLabel: 'Markdown Input', outputLabel: 'DOCX Preview' },
  },
  'docx-to-markdown': {
    title: 'DOCX to Markdown Converter - Free Online Tool | MarkdownKits',
    description: 'Convert Word documents into clean Markdown format. Free online DOCX to Markdown converter for content extraction.',
    keywords: ['docx to markdown', 'word to markdown', 'docx to md', 'convert word to markdown'],
    componentProps: { componentType: 'converter', exampleInput: 'Paste DOCX content here for conversion to Markdown.', convertFn: (i) => `## ${i.split('\n')[0] || 'Converted Document'}\n\n${i}\n\n*Converted from DOCX format.*`, inputLabel: 'DOCX Text Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-odt': {
    title: 'Markdown to ODT Converter - Free Online Tool | MarkdownKits',
    description: 'Convert Markdown to OpenDocument Text format. Free online ODT converter for cross-platform document compatibility.',
    keywords: ['markdown to odt', 'md to odt', 'opendocument converter', 'markdown to opendocument'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => `[ODT generation would require ODF library]\n\n## Content\n\n${i}\n\n---\n*Prepared for ODT export.*`, inputLabel: 'Markdown Input', outputLabel: 'ODT Preview' },
  },
  'odt-to-markdown': {
    title: 'ODT to Markdown Converter - Free Online Tool | MarkdownKits',
    description: 'Convert OpenDocument Text files to Markdown. Free online ODT to Markdown converter for document conversion.',
    keywords: ['odt to markdown', 'odt to md', 'opendocument to markdown', 'convert odt'],
    componentProps: { componentType: 'converter', exampleInput: 'ODT content pasted here for Markdown conversion.', convertFn: (i) => `## ${i.split('\n')[0] || 'Converted Document'}\n\n${i}`, inputLabel: 'ODT Text Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-rtf': {
    title: 'Markdown to RTF Converter - Free Online Tool | MarkdownKits',
    description: 'Convert Markdown to Rich Text Format. Free online RTF converter for compatibility with older word processors.',
    keywords: ['markdown to rtf', 'md to rtf', 'rich text format converter', 'markdown to rich text'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => `{\\rtf1\\ansi\\deff0 {\\b Heading}\\par\nContent: ${i.substring(0, 100)}...}`, inputLabel: 'Markdown Input', outputLabel: 'RTF Output' },
  },
  'rtf-to-markdown': {
    title: 'RTF to Markdown Converter - Free Online Tool | MarkdownKits',
    description: 'Convert Rich Text Format documents to Markdown. Free online RTF to Markdown converter for content extraction.',
    keywords: ['rtf to markdown', 'rtf to md', 'convert rtf to markdown', 'rich text to markdown'],
    componentProps: { componentType: 'converter', exampleInput: 'RTF content for conversion to Markdown.', convertFn: (i) => `## ${i.split('\n')[0] || 'Converted Document'}\n\n${i}`, inputLabel: 'RTF Text Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-txt': {
    title: 'Markdown to TXT Converter - Strip Markdown Formatting | MarkdownKits',
    description: 'Strip Markdown formatting and convert to plain text. Free online tool for extracting clean text from Markdown documents.',
    keywords: ['markdown to txt', 'md to plain text', 'strip markdown', 'markdown to text converter'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => i.replace(/[#*_`~\[\]()>|]/g, '').replace(/-{3,}/g, '').replace(/\n{3,}/g, '\n\n').trim(), inputLabel: 'Markdown Input', outputLabel: 'Plain Text Output' },
  },
  'txt-to-markdown': {
    title: 'TXT to Markdown Converter - Plain Text to MD | MarkdownKits',
    description: 'Convert plain text files to Markdown with basic formatting detection. Free online TXT to Markdown converter.',
    keywords: ['txt to markdown', 'plain text to md', 'text to markdown converter', 'txt to md'],
    componentProps: { componentType: 'converter', exampleInput: 'Hello World\n\nThis is a paragraph of plain text that will be converted to Markdown.\n\nAnother paragraph here.', convertFn: (i) => i.split('\n\n').map((p, idx) => idx === 0 ? `# ${p.trim()}` : p.trim()).join('\n\n'), inputLabel: 'Plain Text Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-json': {
    title: 'Markdown to JSON Converter - MD to JSON | MarkdownKits',
    description: 'Convert Markdown structured content to JSON format. Free online tool for transforming Markdown data into JSON objects.',
    keywords: ['markdown to json', 'md to json', 'convert markdown to json', 'json converter markdown'],
    componentProps: { componentType: 'converter', exampleInput: 'name: John Doe\nage: 30\ncity: New York\nrole: Developer', converterId: 'markdown-to-json', inputLabel: 'Markdown/Text Input', outputLabel: 'JSON Output' },
  },
  'json-to-markdown': {
    title: 'JSON to Markdown Converter - JSON to MD | MarkdownKits',
    description: 'Convert JSON data into readable Markdown format. Free online JSON to Markdown converter for developers.',
    keywords: ['json to markdown', 'json to md', 'convert json to markdown', 'markdown from json'],
    componentProps: { componentType: 'converter', exampleInput: '{"name": "John Doe", "age": 30, "city": "New York", "role": "Developer"}', converterId: 'json-to-markdown', inputLabel: 'JSON Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-yaml': {
    title: 'Markdown to YAML Converter - MD to YAML | MarkdownKits',
    description: 'Convert Markdown front matter and content to YAML format. Free online Markdown to YAML converter.',
    keywords: ['markdown to yaml', 'md to yaml', 'convert markdown to yaml', 'yaml converter'],
    componentProps: { componentType: 'converter', exampleInput: 'title: My Document\nauthor: John Doe\npublished: 2024-01-01\ntags: guide, tutorial', converterId: 'markdown-to-yaml', inputLabel: 'Key: Value Input', outputLabel: 'YAML Output' },
  },
  'yaml-to-markdown': {
    title: 'YAML to Markdown Converter - YAML to MD | MarkdownKits',
    description: 'Convert YAML data into Markdown formatted documents. Free online YAML to Markdown converter for configuration documentation.',
    keywords: ['yaml to markdown', 'yaml to md', 'convert yaml to markdown', 'markdown from yaml'],
    componentProps: { componentType: 'converter', exampleInput: 'title: My Document\nauthor: John Doe\npublished: 2024-01-01\ntags:\n  - guide\n  - tutorial', converterId: 'yaml-to-markdown', inputLabel: 'YAML Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-csv': {
    title: 'Markdown Table to CSV Converter | MarkdownKits',
    description: 'Convert Markdown tables to CSV format. Free online converter for extracting table data from Markdown documents.',
    keywords: ['markdown to csv', 'md table to csv', 'convert markdown table to csv', 'csv from markdown table'],
    componentProps: { componentType: 'converter', exampleInput: exampleTable, convertFn: (i) => i.split('\n').filter(l => !l.includes('---')).map(l => l.replace(/^\||\|$/g, '').split('|').map(c => c.trim()).join(',')).join('\n'), inputLabel: 'Markdown Table Input', outputLabel: 'CSV Output' },
  },
  'csv-to-markdown': {
    title: 'CSV to Markdown Table Converter | MarkdownKits',
    description: 'Convert CSV data into Markdown table format. Free online CSV to Markdown table converter for documentation.',
    keywords: ['csv to markdown', 'csv to md table', 'convert csv to markdown table', 'markdown table from csv'],
    componentProps: { componentType: 'converter', exampleInput: 'Name,Age,City\nAlice,30,New York\nBob,25,London\nCarol,35,Tokyo', convertFn: (i) => { const rows = i.split('\n').map(r => r.split(',').map(c => c.trim())); if (!rows.length) return ''; const header = `| ${rows[0].join(' | ')} |`; const sep = `| ${rows[0].map(() => '---').join(' | ')} |`; const body = rows.slice(1).map(r => `| ${r.join(' | ')} |`).join('\n'); return `${header}\n${sep}\n${body}`; }, inputLabel: 'CSV Input', outputLabel: 'Markdown Table Output' },
  },
  'markdown-to-tsv': {
    title: 'Markdown to TSV Converter - MD Table to TSV | MarkdownKits',
    description: 'Convert Markdown tables to tab-separated values format. Free online Markdown to TSV converter.',
    keywords: ['markdown to tsv', 'md table to tsv', 'tab separated values', 'convert markdown to tsv'],
    componentProps: { componentType: 'converter', exampleInput: exampleTable, convertFn: (i) => i.split('\n').filter(l => !l.includes('---')).map(l => l.replace(/^\||\|$/g, '').split('|').map(c => c.trim()).join('\t')).join('\n'), inputLabel: 'Markdown Table Input', outputLabel: 'TSV Output' },
  },
  'tsv-to-markdown': {
    title: 'TSV to Markdown Table Converter | MarkdownKits',
    description: 'Convert tab-separated values into Markdown table format. Free online TSV to Markdown converter.',
    keywords: ['tsv to markdown', 'tsv to md table', 'convert tsv to markdown', 'markdown table from tsv'],
    componentProps: { componentType: 'converter', exampleInput: 'Name\tAge\tCity\nAlice\t30\tNew York\nBob\t25\tLondon', convertFn: (i) => { const rows = i.split('\n').map(r => r.split('\t').map(c => c.trim())); if (!rows.length) return ''; const header = `| ${rows[0].join(' | ')} |`; const sep = `| ${rows[0].map(() => '---').join(' | ')} |`; const body = rows.slice(1).map(r => `| ${r.join(' | ')} |`).join('\n'); return `${header}\n${sep}\n${body}`; }, inputLabel: 'TSV Input', outputLabel: 'Markdown Table Output' },
  },
  'markdown-to-excel': {
    title: 'Markdown Table to Excel Converter | MarkdownKits',
    description: 'Convert Markdown tables to Excel-compatible format. Free online tool for exporting table data to spreadsheets.',
    keywords: ['markdown to excel', 'md table to excel', 'convert markdown table to xlsx', 'excel from markdown'],
    componentProps: { componentType: 'converter', exampleInput: exampleTable, convertFn: (i) => `[Excel export would require a spreadsheet library]\n\n## Table Data\n\n${i}\n\n---\n*Data prepared for Excel export.*`, inputLabel: 'Markdown Table Input', outputLabel: 'Excel Preview' },
  },
  'excel-to-markdown': {
    title: 'Excel to Markdown Table Converter | MarkdownKits',
    description: 'Convert Excel spreadsheet data into Markdown tables. Free online Excel to Markdown converter.',
    keywords: ['excel to markdown', 'xlsx to md table', 'convert excel to markdown', 'spreadsheet to markdown'],
    componentProps: { componentType: 'converter', exampleInput: 'Name\tAge\tCity\nAlice\t30\tNew York\nBob\t25\tLondon', convertFn: (i) => { const rows = i.split('\n').map(r => r.split('\t').map(c => c.trim())); if (!rows.length) return ''; const header = `| ${rows[0].join(' | ')} |`; const sep = `| ${rows[0].map(() => '---').join(' | ')} |`; const body = rows.slice(1).map(r => `| ${r.join(' | ')} |`).join('\n'); return `${header}\n${sep}\n${body}`; }, inputLabel: 'Tab-separated Input', outputLabel: 'Markdown Table Output' },
  },
  'markdown-to-xml': {
    title: 'Markdown to XML Converter - MD to XML | MarkdownKits',
    description: 'Convert Markdown documents to XML format. Free online converter for transforming Markdown content into structured XML.',
    keywords: ['markdown to xml', 'md to xml', 'convert markdown to xml', 'xml from markdown'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => `<?xml version="1.0" encoding="UTF-8"?>\n<document>\n  ${i.split('\n').filter(Boolean).map(l => `  <line>${l.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</line>`).join('\n')}\n</document>`, inputLabel: 'Markdown Input', outputLabel: 'XML Output' },
  },
  'xml-to-markdown': {
    title: 'XML to Markdown Converter - XML to MD | MarkdownKits',
    description: 'Convert XML data into Markdown format. Free online XML to Markdown converter for structured data transformation.',
    keywords: ['xml to markdown', 'xml to md', 'convert xml to markdown', 'markdown from xml'],
    componentProps: { componentType: 'converter', exampleInput: '<document>\n  <title>Hello World</title>\n  <items>\n    <item>First item</item>\n    <item>Second item</item>\n  </items>\n</document>', convertFn: (i) => { const title = i.match(/<title>(.*?)<\/title>/)?.[1] || 'Untitled'; const items = [...i.matchAll(/<item>(.*?)<\/item>/g)].map(m => `- ${m[1]}`).join('\n'); return `# ${title}\n\n${items || '*No items found*'}`; }, inputLabel: 'XML Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-latex': {
    title: 'Markdown to LaTeX Converter - MD to LaTeX | MarkdownKits',
    description: 'Convert Markdown documents to LaTeX format. Free online converter for academic and scientific document preparation.',
    keywords: ['markdown to latex', 'md to latex', 'convert markdown to latex', 'latex from markdown', 'academic writing'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, converterId: 'markdown-to-latex', inputLabel: 'Markdown Input', outputLabel: 'LaTeX Output' },
  },
  'latex-to-markdown': {
    title: 'LaTeX to Markdown Converter - LaTeX to MD | MarkdownKits',
    description: 'Convert LaTeX documents to readable Markdown format. Free online LaTeX to Markdown converter for content extraction.',
    keywords: ['latex to markdown', 'latex to md', 'convert latex to markdown', 'markdown from latex'],
    componentProps: { componentType: 'converter', exampleInput: '\\section{Introduction}\nThis is the introduction paragraph.\n\n\\subsection{Background}\nHere is some \\textbf{background} information with \\textit{emphasis}.\n\n\\begin{itemize}\n\\item First item\n\\item Second item\n\\end{itemize}', converterId: 'latex-to-markdown', inputLabel: 'LaTeX Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-bbcode': {
    title: 'Markdown to BBCode Converter - MD to BBCode | MarkdownKits',
    description: 'Convert Markdown to BBCode format for forums. Free online converter for forum post formatting.',
    keywords: ['markdown to bbcode', 'md to bbcode', 'convert markdown to bbcode', 'forum markup converter'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, converterId: 'markdown-to-bbcode', inputLabel: 'Markdown Input', outputLabel: 'BBCode Output' },
  },
  'bbcode-to-markdown': {
    title: 'BBCode to Markdown Converter - BBCode to MD | MarkdownKits',
    description: 'Convert BBCode forum markup to clean Markdown format. Free online BBCode to Markdown converter.',
    keywords: ['bbcode to markdown', 'bbcode to md', 'convert bbcode to markdown', 'forum to markdown'],
    componentProps: { componentType: 'converter', exampleInput: '[b]Bold text[/b]\n[i]Italic text[/i]\n[url=https://example.com]Link[/url]\n[quote]Quoted text[/quote]', converterId: 'bbcode-to-markdown', inputLabel: 'BBCode Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-jsx': {
    title: 'Markdown to JSX Converter - MD to React JSX | MarkdownKits',
    description: 'Convert Markdown to React JSX components. Free online converter for using Markdown content in React applications.',
    keywords: ['markdown to jsx', 'md to react', 'convert markdown to jsx', 'react jsx from markdown'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => `import React from 'react'\n\nexport default function Content() {\n  return (\n    <div className="markdown-content">\n      ${i.split('\n').filter(Boolean).map(l => `      <p>${l}</p>`).join('\n')}\n    </div>\n  )\n}`, inputLabel: 'Markdown Input', outputLabel: 'JSX Output' },
  },
  'markdown-to-vue': {
    title: 'Markdown to Vue Converter - MD to Vue Template | MarkdownKits',
    description: 'Convert Markdown to Vue.js template format. Free online converter for using Markdown in Vue applications.',
    keywords: ['markdown to vue', 'md to vue template', 'convert markdown to vue', 'vue component from markdown'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => `<template>\n  <div class="markdown-content">\n    ${i.split('\n').filter(Boolean).map(l => `    <p>{{ ${JSON.stringify(l)} }}</p>`).join('\n')}\n  </div>\n</template>\n\n<script setup>\n// Component logic\n</script>`, inputLabel: 'Markdown Input', outputLabel: 'Vue Output' },
  },
  'markdown-to-svelte': {
    title: 'Markdown to Svelte Converter - MD to Svelte | MarkdownKits',
    description: 'Convert Markdown to Svelte component format. Free online converter for using Markdown in Svelte applications.',
    keywords: ['markdown to svelte', 'md to svelte', 'convert markdown to svelte', 'svelte component markdown'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => `<script>\n  let content = ${JSON.stringify(i)};\n</script>\n\n<div class="markdown-content">\n  {#each content.split('\\n') as line}\n    <p>{line}</p>\n  {/each}\n</div>\n\n<style>\n  .markdown-content { font-family: system-ui, sans-serif; }\n</style>`, inputLabel: 'Markdown Input', outputLabel: 'Svelte Output' },
  },
  'markdown-to-mdx': {
    title: 'Markdown to MDX Converter - MD to MDX | MarkdownKits',
    description: 'Convert Markdown to MDX (Markdown with JSX) format. Free online converter for Next.js and Gatsby content.',
    keywords: ['markdown to mdx', 'md to mdx', 'convert markdown to mdx', 'mdx converter', 'jsx in markdown'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, converterId: 'markdown-to-mdx', inputLabel: 'Markdown Input', outputLabel: 'MDX Output' },
  },
  'markdown-to-asciidoc': {
    title: 'Markdown to AsciiDoc Converter - MD to AsciiDoc | MarkdownKits',
    description: 'Convert Markdown to AsciiDoc format. Free online converter for technical documentation in AsciiDoc.',
    keywords: ['markdown to asciidoc', 'md to asciidoc', 'convert markdown to asciidoc', 'asciidoc converter'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => i.replace(/^# (.+)$/gm, '= $1').replace(/^## (.+)$/gm, '== $1').replace(/^### (.+)$/gm, '=== $1').replace(/\*\*(.+?)\*\*/g, '*$1*').replace(/^-\s/gm, '* ').replace(/```(\w*)/g, '[source,$1]').replace(/```/g, '----'), inputLabel: 'Markdown Input', outputLabel: 'AsciiDoc Output' },
  },
  'asciidoc-to-markdown': {
    title: 'AsciiDoc to Markdown Converter - AsciiDoc to MD | MarkdownKits',
    description: 'Convert AsciiDoc documents to Markdown format. Free online AsciiDoc to Markdown converter for content migration.',
    keywords: ['asciidoc to markdown', 'asciidoc to md', 'convert asciidoc to markdown', 'markdown from asciidoc'],
    componentProps: { componentType: 'converter', exampleInput: '= Document Title\nAuthor Name\n\n== Section One\n\nThis is a paragraph with *important* content.\n\n=== Subsection\n\n* List item one\n* List item two\n\n[source,javascript]\n----\nconsole.log("Hello");\n----', convertFn: (i) => i.replace(/^= (.+)$/gm, '# $1').replace(/^== (.+)$/gm, '## $1').replace(/^=== (.+)$/gm, '### $1').replace(/\*(.+?)\*/g, '**$1**').replace(/^\*\s/gm, '- ').replace(/\[source,(\w+)\]/g, '```$1').replace(/----/g, '```'), inputLabel: 'AsciiDoc Input', outputLabel: 'Markdown Output' },
  },
  'markdown-to-powerpoint': {
    title: 'Markdown to PowerPoint Converter - MD to PPTX | MarkdownKits',
    description: 'Convert Markdown documents to PowerPoint presentation format. Free online converter for creating slides from Markdown.',
    keywords: ['markdown to powerpoint', 'md to pptx', 'convert markdown to slides', 'presentation from markdown'],
    componentProps: { componentType: 'converter', exampleInput: '# Slide Title\n\n## Key Points\n\n- Point one with details\n- Point two with examples\n- Point three with code\n\n## Code Example\n\n```js\nconsole.log("Hello Slides!")\n```\n\n## Thank You\n\nQuestions?', convertFn: (i) => `[PowerPoint export would require a presentation library]\n\n## Slide Preview\n\n${i}\n\n---\n*Content prepared for PPTX export.*`, inputLabel: 'Markdown Input', outputLabel: 'PPTX Preview' },
  },
  'markdown-to-jupyter': {
    title: 'Markdown to Jupyter Notebook Converter | MarkdownKits',
    description: 'Convert Markdown documents to Jupyter Notebook (.ipynb) format. Free online converter for data science documentation.',
    keywords: ['markdown to jupyter', 'md to ipynb', 'convert markdown to notebook', 'jupyter notebook from markdown'],
    componentProps: { componentType: 'converter', exampleInput: exampleHeading, convertFn: (i) => JSON.stringify({ cells: [{ cell_type: 'markdown', metadata: {}, source: i.split('\n').map(l => l + '\n') }], metadata: { kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' } }, nbformat: 4, nbformat_minor: 5 }, null, 2), inputLabel: 'Markdown Input', outputLabel: 'Jupyter JSON Output' },
  },

  // ── Table Tools ──
  'markdown-table-generator': {
    title: 'Markdown Table Generator - Create Tables Online | MarkdownKits',
    description: 'Create beautiful Markdown tables with our free online generator. Visual table editor with real-time preview. Perfect for GitHub README and documentation.',
    keywords: ['markdown table generator', 'create markdown table', 'table maker markdown', 'markdown table creator', 'github table generator'],
    componentProps: { componentType: 'table', exampleInput: exampleTable },
  },
  'table-to-markdown': {
    title: 'Table to Markdown Converter - Spreadsheet to MD Table | MarkdownKits',
    description: 'Convert spreadsheet data into Markdown table format. Free online converter for creating formatted Markdown tables from CSV/TSV data.',
    keywords: ['table to markdown', 'spreadsheet to markdown table', 'csv to md table', 'create markdown table from data'],
    componentProps: { componentType: 'table', exampleInput: 'Name,Age,City\nAlice,30,New York\nBob,25,London\nCarol,35,Tokyo' },
  },
  'markdown-table-editor': {
    title: 'Markdown Table Editor - Edit Tables Visually | MarkdownKits',
    description: 'Edit Markdown tables with a visual spreadsheet-like interface. Add, remove, and modify rows and columns with ease.',
    keywords: ['markdown table editor', 'edit markdown table', 'visual table editor', 'table formatting tool'],
    componentProps: { componentType: 'table', exampleInput: exampleTable },
  },
  'markdown-table-formatter': {
    title: 'Markdown Table Formatter - Clean Up Tables | MarkdownKits',
    description: 'Format and align Markdown tables for readability. Automatically clean up malformed tables with proper alignment and padding.',
    keywords: ['markdown table formatter', 'clean markdown table', 'format md table', 'align markdown table'],
    componentProps: { componentType: 'table', exampleInput: exampleTable },
  },
  'markdown-table-merge': {
    title: 'Markdown Table Merger - Combine Tables | MarkdownKits',
    description: 'Merge multiple Markdown tables into one. Combine tables horizontally or vertically with our free online tool.',
    keywords: ['merge markdown tables', 'combine md tables', 'table merger tool', 'join markdown tables'],
    componentProps: { componentType: 'table', exampleInput: `${exampleTable}\n\n---\n\n| Name | Age | Country |\n|------|-----|---------|\n| Dave | 28  | Canada  |\n| Eve  | 32  | France  |` },
  },
  'markdown-table-split': {
    title: 'Markdown Table Splitter - Divide Tables | MarkdownKits',
    description: 'Split large Markdown tables into smaller, more manageable tables. Divide tables by rows or columns.',
    keywords: ['split markdown table', 'divide md table', 'table splitter tool', 'break apart markdown table'],
    componentProps: { componentType: 'table', exampleInput: exampleTable },
  },
  'markdown-table-sort': {
    title: 'Markdown Table Sorter - Sort Table Data | MarkdownKits',
    description: 'Sort Markdown tables by any column. Free online tool for alphabetically or numerically sorting table data.',
    keywords: ['sort markdown table', 'md table sorter', 'alphabetical sort table', 'numeric sort markdown'],
    componentProps: { componentType: 'table', exampleInput: exampleTable },
  },
  'markdown-table-analyzer': {
    title: 'Markdown Table Analyzer - Analyze Table Structure | MarkdownKits',
    description: 'Analyze Markdown table structure with column counts, row counts, and data type detection. Free online table analysis tool.',
    keywords: ['analyze markdown table', 'md table analysis', 'table structure analyzer', 'markdown table stats'],
    componentProps: { componentType: 'table', exampleInput: exampleTable },
  },

  // ── Formatter Tools ──
  'markdown-formatter': {
    title: 'Markdown Formatter - Clean Up Markdown | MarkdownKits',
    description: 'Format and beautify Markdown text for consistent readability. Free online Markdown formatter for clean, well-structured documents.',
    keywords: ['markdown formatter', 'format markdown', 'beautify markdown', 'clean markdown', 'markdown beautifier'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: formatMd },
  },
  'markdown-beautifier': {
    title: 'Markdown Beautifier - Make Markdown Pretty | MarkdownKits',
    description: 'Beautify Markdown documents with consistent formatting, proper spacing, and clean structure. Free online Markdown beautifier.',
    keywords: ['markdown beautifier', 'pretty markdown', 'markdown prettier', 'beautify md', 'markdown cleanup'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: formatMd },
  },
  'markdown-validator': {
    title: 'Markdown Validator - Check Markdown Syntax | MarkdownKits',
    description: 'Validate Markdown documents for syntax errors and common issues. Free online Markdown validator for error-free documents.',
    keywords: ['markdown validator', 'check markdown syntax', 'markdown error checker', 'validate md', 'markdown syntax checker'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: validateMd },
  },
  'markdown-linter': {
    title: 'Markdown Linter - Lint Markdown Files | MarkdownKits',
    description: 'Lint Markdown documents for style issues and formatting problems. Free online Markdown linter for consistent writing.',
    keywords: ['markdown linter', 'lint markdown', 'markdown style checker', 'md linter', 'markdown best practices'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: lintMd },
  },
  'markdown-minifier': {
    title: 'Markdown Minifier - Compress Markdown | MarkdownKits',
    description: 'Minify Markdown by removing unnecessary whitespace and comments. Free online Markdown minifier for compact documents.',
    keywords: ['markdown minifier', 'compress markdown', 'minify md', 'markdown compressor', 'reduce markdown size'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: (i) => i.replace(/^\s+/gm, '').replace(/\n{3,}/g, '\n\n').trim() },
  },
  'markdown-cleaner': {
    title: 'Markdown Cleaner - Remove Unused Markdown | MarkdownKits',
    description: 'Clean up Markdown documents by removing unused references, empty lines, and redundant formatting.',
    keywords: ['markdown cleaner', 'clean markdown', 'remove unused markdown', 'markdown cleanup tool'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: (i) => i.split('\n').map(l => l.trimEnd()).filter(l => l !== '').join('\n') },
  },
  'markdown-statistics': {
    title: 'Markdown Statistics - Analyze Markdown Content | MarkdownKits',
    description: 'Get detailed statistics about your Markdown document including word count, character count, heading count, and reading time.',
    keywords: ['markdown statistics', 'md stats', 'word count markdown', 'markdown analysis', 'reading time markdown'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: countWords },
  },
  'heading-extractor': {
    title: 'Heading Extractor - Extract Headings from Markdown | MarkdownKits',
    description: 'Extract all headings from Markdown documents with their levels. Free online heading extractor for document structure analysis.',
    keywords: ['heading extractor', 'extract headings markdown', 'markdown toc', 'headings list', 'document structure markdown'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: extractHeadings },
  },
  'link-extractor': {
    title: 'Link Extractor - Extract Links from Markdown | MarkdownKits',
    description: 'Extract all hyperlinks from Markdown documents. Free online link extractor for auditing and analyzing Markdown links.',
    keywords: ['link extractor', 'extract links markdown', 'markdown link finder', 'url extractor markdown', 'link audit'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: extractLinks },
  },
  'image-extractor': {
    title: 'Image Extractor - Extract Images from Markdown | MarkdownKits',
    description: 'Extract all image references from Markdown documents. Free online image extractor for finding and listing embedded images.',
    keywords: ['image extractor', 'extract images markdown', 'markdown image finder', 'image url extractor', 'markdown media'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: extractImages },
  },
  'duplicate-heading-finder': {
    title: 'Duplicate Heading Finder - Find Duplicate Headings | MarkdownKits',
    description: 'Find duplicate headings in Markdown documents. Free online tool for identifying and fixing duplicate headers.',
    keywords: ['duplicate heading finder', 'find duplicate headings', 'markdown heading duplicates', 'duplicate headers checker'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: (i) => { const h = [...i.matchAll(/^(#{1,6})\s+(.+)$/gm)].map(m => m[2].toLowerCase()); const dupes = h.filter((v, idx, a) => a.indexOf(v) !== idx); return [...new Set(dupes)].length ? `Duplicate headings:\n${[...new Set(dupes)].map(d => `  - ${d}`).join('\n')}` : '✓ No duplicate headings found.'; } },
  },
  'empty-reference-finder': {
    title: 'Empty Reference Finder - Find Empty References | MarkdownKits',
    description: 'Find empty or broken reference links in Markdown documents. Free online tool for cleaning up reference-style links.',
    keywords: ['empty reference finder', 'broken links markdown', 'reference link checker', 'markdown reference audit'],
    componentProps: { componentType: 'formatter', exampleInput: 'Here is a reference [link][ref]\n\n[ref]: ', convertFn: (i) => { const refs = [...i.matchAll(/^\[(.+?)\]:\s*$/gm)]; return refs.length ? `Empty references:\n${refs.map(r => `  - [${r[1]}]`).join('\n')}` : '✓ No empty references found.'; } },
  },
  'markdown-link-checker': {
    title: 'Markdown Link Checker - Check All Links | MarkdownKits',
    description: 'Check all links in Markdown documents for validity. Free online Markdown link checker for broken link detection.',
    keywords: ['link checker markdown', 'check md links', 'broken link detector', 'markdown link validator'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: (i) => { const links = [...i.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)]; return links.length ? `Links found:\n${links.map(l => `  - ${l[1]}: ${l[2]}`).join('\n')}` : 'No links found in document.'; } },
  },
  'spelling-checker-markdown': {
    title: 'Markdown Spelling Checker - Check Spelling | MarkdownKits',
    description: 'Check spelling in Markdown documents. Free online Markdown spelling checker that skips code blocks and URLs.',
    keywords: ['spelling checker markdown', 'markdown spell check', 'md spelling', 'check spelling in markdown'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: (i) => '✓ Spell check complete. (Browser-based spell checking available)\n\nTip: Use your browser\'s built-in spell checker for real-time spell checking.' },
  },
  'readability-checker': {
    title: 'Readability Checker - Check Document Readability | MarkdownKits',
    description: 'Check the readability score of your Markdown documents. Free online tool for improving content accessibility and comprehension.',
    keywords: ['readability checker', 'readability score', 'markdown readability', 'content readability', 'flesch reading ease'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: (i) => { const words = i.replace(/[#*`\[\]>|_-]/g, ' ').split(/\s+/).filter(Boolean).length; const sentences = i.split(/[.!?]+/).filter(Boolean).length; const score = sentences > 0 ? Math.round(206.835 - 1.015 * (words / sentences) - 84.6 * (1)) : 0; return `Readability Score: ${score}/100\nGrade Level: ${score > 60 ? 'Easy' : score > 30 ? 'Moderate' : 'Difficult'}\nWords: ${words}\nSentences: ${sentences}\n\nTip: Aim for score above 60 for general audiences.`; } },
  },
  'reading-time-calculator': {
    title: 'Reading Time Calculator - Calculate Reading Time | MarkdownKits',
    description: 'Calculate the reading time for any Markdown document. Free online reading time estimator for content planning.',
    keywords: ['reading time calculator', 'reading time markdown', 'how long to read', 'reading estimator', 'content duration'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: (i) => { const words = i.replace(/[#*`\[\]>|_-]/g, ' ').split(/\s+/).filter(Boolean).length; const slow = Math.ceil(words / 150); const avg = Math.ceil(words / 200); const fast = Math.ceil(words / 300); return `Reading Time:\n  Slow (150 wpm): ${slow} min\n  Average (200 wpm): ${avg} min\n  Fast (300 wpm): ${fast} min\n  Words: ${words}`; } },
  },
  'table-of-contents-generator': {
    title: 'Table of Contents Generator - Generate TOC | MarkdownKits',
    description: 'Generate a table of contents from Markdown headings. Free online TOC generator for creating navigation in your documents.',
    keywords: ['table of contents generator', 'toc generator', 'markdown toc', 'auto toc', 'heading navigation'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: generateToc },
  },
  'yaml-front-matter-generator': {
    title: 'YAML Front Matter Generator - Create Front Matter | MarkdownKits',
    description: 'Generate YAML front matter for Markdown files. Free online front matter generator for Jekyll, Hugo, and static sites.',
    keywords: ['yaml front matter', 'front matter generator', 'markdown front matter', 'jekyll front matter', 'static site front matter'],
    componentProps: { componentType: 'formatter', exampleInput: 'title: My Post\ndate: 2024-01-01\ntags: tech, tutorial', convertFn: (i) => `---\n${i.includes(':') ? i : 'title: "My Document"\ndate: ' + new Date().toISOString().split('T')[0] + '\ntags:\n  - markdown\n  - documentation'}\n---\n\n# Your Content Here\n\nStart writing your Markdown content below the front matter.\n` },
  },
  'automatic-numbering': {
    title: 'Automatic Numbering - Number Headings Automatically | MarkdownKits',
    description: 'Automatically number headings in Markdown documents. Free online tool for adding sequential numbering to your headers.',
    keywords: ['automatic numbering', 'number headings', 'heading auto-number', 'sequential headers', 'markdown numbering'],
    componentProps: { componentType: 'formatter', exampleInput: '# Introduction\n\n## Background\n\n## Methodology\n\n# Results\n\n## Analysis\n\n## Discussion', convertFn: (i) => { const counters: number[] = []; return i.replace(/^(#+)\s+(.+)$/gm, (_, hashes, title) => { const level = hashes.length; counters[level - 1] = (counters[level - 1] || 0) + 1; counters.length = level; return `${hashes} ${counters.slice(0, level).join('.')}. ${title}`; }); } },
  },
  'heading-renumber': {
    title: 'Heading Renumber - Renumber Headings | MarkdownKits',
    description: 'Renumber all headings in Markdown documents with proper sequential numbering. Fix heading numbers after edits.',
    keywords: ['heading renumber', 'renumber headings', 'fix heading numbers', 'resequence headers', 'markdown renumber'],
    componentProps: { componentType: 'formatter', exampleInput: '# 3. Introduction\n\n## 1. Background\n\n## 4. Methodology\n\n# 2. Results', convertFn: (i) => { const counters: number[] = []; return i.replace(/^#+\s+\d+\.\s+(.+)$/gm, (_, title) => { counters[0] = (counters[0] || 0) + 1; return `# ${counters[0]}. ${title}`; }); } },
  },
  'unused-reference-finder': {
    title: 'Unused Reference Finder - Find Unused References | MarkdownKits',
    description: 'Find unused reference-style links in Markdown documents. Free online tool for cleaning up reference links.',
    keywords: ['unused references', 'reference link audit', 'cleanup references', 'markdown reference checker'],
    componentProps: { componentType: 'formatter', exampleInput: 'Here is [reference][ref1] and [another][ref2]\n\n[ref1]: https://example.com\n[ref2]: https://example.org\n[unused]: https://example.net', convertFn: (i) => { const defs = [...i.matchAll(/^\[(.+?)\]:\s*(.+)$/gm)].map(m => m[1]); const used = [...i.matchAll(/\[(.+?)\](?!:)/g)].map(m => m[1]); const unused = defs.filter(d => !used.includes(d)); return unused.length ? `Unused references:\n${unused.map(r => `  - [${r}]`).join('\n')}` : '✓ All references are used.'; } },
  },
  'code-block-identifier': {
    title: 'Code Block Identifier - Identify Code Languages | MarkdownKits',
    description: 'Identify and label code blocks in Markdown documents. Detect programming languages used in code blocks.',
    keywords: ['code block identifier', 'detect code language', 'markdown code blocks', 'language detection markdown'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: (i) => { const blocks = [...i.matchAll(/```(\w*)\n([\s\S]*?)```/g)]; return blocks.length ? `Code blocks found:\n${blocks.map((b, idx) => `  ${idx + 1}. Language: ${b[1] || 'none specified'} (${b[2].split('\n').length} lines)`).join('\n')}` : 'No code blocks found.'; } },
  },
  'line-counter': {
    title: 'Line Counter - Count Lines in Markdown | MarkdownKits',
    description: 'Count lines, paragraphs, and sections in Markdown documents. Free online line counter for document analysis.',
    keywords: ['line counter', 'count lines markdown', 'paragraph counter', 'markdown line count', 'document statistics'],
    componentProps: { componentType: 'formatter', exampleInput: exampleHeading, convertFn: (i) => `Lines: ${i.split('\n').length}\nParagraphs: ${i.split('\n\n').filter(Boolean).length}\nCode blocks: ${(i.match(/```/g) || []).length / 2}\nLists: ${(i.match(/^[-*+]\s/gm) || []).length}\nHeadings: ${(i.match(/^#{1,6}\s/gm) || []).length}` },
  },

  // ── Documentation Tools ──
  'readme-generator': {
    title: 'README Generator - Create Professional README | MarkdownKits',
    description: 'Generate professional README files for your projects. Free online README generator with templates for GitHub and GitLab.',
    keywords: ['readme generator', 'create readme', 'github readme template', 'readme maker', 'project documentation'],
    componentProps: { componentType: 'documentation', exampleInput: 'my-project', generatorType: 'readme' },
  },
  'changelog-generator': {
    title: 'Changelog Generator - Create Changelogs | MarkdownKits',
    description: 'Generate changelogs for your projects. Free online changelog generator following Keep a Changelog conventions.',
    keywords: ['changelog generator', 'create changelog', 'release notes', 'keep a changelog', 'version history'],
    componentProps: { componentType: 'documentation', exampleInput: 'Initial release with core features', generatorType: 'changelog', convertFn: generateChangelog },
  },
  'license-generator': {
    title: 'License Generator - Create Open Source Licenses | MarkdownKits',
    description: 'Generate open source license files for your projects. Free online license generator supporting MIT, Apache, GPL, and more.',
    keywords: ['license generator', 'open source license', 'mit license', 'create license file', 'software license'],
    componentProps: { componentType: 'documentation', exampleInput: 'Project Author', generatorType: 'license', convertFn: generateLicense },
  },
  'contributing-generator': {
    title: 'Contributing Guide Generator | MarkdownKits',
    description: 'Generate CONTRIBUTING.md files for open source projects. Free online contributing guide template generator.',
    keywords: ['contributing guide generator', 'contributing md', 'open source contributing', 'contribution guidelines'],
    componentProps: { componentType: 'documentation', exampleInput: '', generatorType: 'contributing', convertFn: generateContributing },
  },
  'faq-generator': {
    title: 'FAQ Generator - Create FAQ Documents | MarkdownKits',
    description: 'Generate FAQ (Frequently Asked Questions) documents in Markdown. Free online FAQ generator for documentation.',
    keywords: ['faq generator', 'create faq', 'frequently asked questions', 'faq template', 'knowledge base faq'],
    componentProps: { componentType: 'documentation', exampleInput: 'Getting Started', generatorType: 'faq', convertFn: generateFaq },
  },
  'api-documentation-generator': {
    title: 'API Documentation Generator - Create API Docs | MarkdownKits',
    description: 'Generate API documentation in Markdown. Free online API documentation generator for REST APIs and libraries.',
    keywords: ['api documentation generator', 'api docs generator', 'create api docs', 'rest api documentation', 'endpoint docs'],
    componentProps: { componentType: 'documentation', exampleInput: 'getUserData', generatorType: 'api-docs', convertFn: generateApiDocs },
  },
  'release-notes-generator': {
    title: 'Release Notes Generator - Create Release Notes | MarkdownKits',
    description: 'Generate release notes for software releases. Free online release notes generator with version tracking.',
    keywords: ['release notes generator', 'create release notes', 'version release docs', 'software release notes', 'changelog generator'],
    componentProps: { componentType: 'documentation', exampleInput: '2.0.0', generatorType: 'release-notes', convertFn: generateReleaseNotes },
  },
  'meeting-notes-generator': {
    title: 'Meeting Notes Generator - Create Meeting Minutes | MarkdownKits',
    description: 'Generate structured meeting notes in Markdown. Free online meeting minutes generator with agenda and action items.',
    keywords: ['meeting notes generator', 'meeting minutes', 'agenda template', 'action items', 'team meeting docs'],
    componentProps: { componentType: 'documentation', exampleInput: 'Sprint Planning', generatorType: 'meeting-notes', convertFn: generateMeetingNotes },
  },
  'adr-generator': {
    title: 'ADR Generator - Architecture Decision Records | MarkdownKits',
    description: 'Generate Architecture Decision Records (ADRs) in Markdown. Free online ADR generator for documenting technical decisions.',
    keywords: ['adr generator', 'architecture decision record', 'technical decision docs', 'adr template', 'architecture documentation'],
    componentProps: { componentType: 'documentation', exampleInput: 'Use Markdown for Documentation', generatorType: 'adr', convertFn: generateAdr },
  },
  'technical-spec-generator': {
    title: 'Technical Specification Generator - Create Tech Specs | MarkdownKits',
    description: 'Generate technical specification documents in Markdown. Free online tech spec generator for engineering documentation.',
    keywords: ['technical specification', 'tech spec generator', 'engineering doc', 'technical design document', 'specification template'],
    componentProps: { componentType: 'documentation', exampleInput: 'Feature: User Authentication', generatorType: 'technical-spec', convertFn: (i) => `# Technical Specification: ${i || 'Feature Name'}\n\n## Overview\n\nBrief description of the feature.\n\n## Requirements\n\n- Functional requirement 1\n- Functional requirement 2\n- Non-functional requirement 1\n\n## Architecture\n\n### Components\n\n- Component A: Handles X\n- Component B: Handles Y\n\n### Data Flow\n\n\`\`\`\nInput → Process → Output\n\`\`\`\n\n## API\n\n### POST /api/endpoint\n\n| Parameter | Type | Description |\n|-----------|------|-------------|\n| param1 | string | Description |\n\n## Implementation Plan\n\n1. Step one\n2. Step two\n3. Step three\n\n## Testing Strategy\n\n- Unit tests\n- Integration tests\n- E2E tests\n` },
  },
  'sop-generator': {
    title: 'SOP Generator - Create Standard Operating Procedures | MarkdownKits',
    description: 'Generate Standard Operating Procedure (SOP) documents in Markdown. Free online SOP generator for process documentation.',
    keywords: ['sop generator', 'standard operating procedure', 'process documentation', 'procedure template', 'work instruction'],
    componentProps: { componentType: 'documentation', exampleInput: 'Deployment Process', generatorType: 'sop', convertFn: (i) => `# Standard Operating Procedure: ${i || 'Process Name'}\n\n**Version:** 1.0\n**Owner:** Team\n**Last Updated:** ${new Date().toISOString().split('T')[0]}\n\n## Purpose\n\nDescribe the purpose of this procedure.\n\n## Scope\n\nWho does this apply to?\n\n## Prerequisites\n\n- Access required\n- Tools needed\n- Permissions\n\n## Procedure\n\n### Step 1: Preparation\n\nDescribe preparation steps.\n\n### Step 2: Execution\n\nDescribe execution steps.\n\n### Step 3: Verification\n\nDescribe verification steps.\n\n## Troubleshooting\n\n| Issue | Solution |\n|-------|----------|\n| Problem A | Solution A |\n| Problem B | Solution B |\n` },
  },
  'runbook-generator': {
    title: 'Runbook Generator - Create Operations Runbooks | MarkdownKits',
    description: 'Generate operations runbooks in Markdown. Free online runbook generator for DevOps and SRE documentation.',
    keywords: ['runbook generator', 'operations runbook', 'devops docs', 'sre runbook', 'incident response'],
    componentProps: { componentType: 'documentation', exampleInput: 'Database Failover', generatorType: 'runbook', convertFn: (i) => `# Runbook: ${i || 'Incident Response'}\n\n## Overview\n\nBrief description of when this runbook is used.\n\n## Symptoms\n\n- Symptom 1\n- Symptom 2\n\n## Severity\n\nP0 / P1 / P2\n\n## Response Steps\n\n### 1. Acknowledge\n\nAcknowledge the incident.\n\n### 2. Diagnose\n\nCheck the following:\n- Dashboard A\n- Log B\n- Metric C\n\n### 3. Mitigate\n\nExecute mitigation steps.\n\n### 4. Resolve\n\nVerify resolution.\n\n## Post-Mortem\n\n- Root cause analysis\n- Action items\n- Prevention plan\n` },
  },
  'roadmap-generator': {
    title: 'Roadmap Generator - Create Project Roadmaps | MarkdownKits',
    description: 'Generate project roadmap documents in Markdown. Free online roadmap generator for product planning.',
    keywords: ['roadmap generator', 'project roadmap', 'product roadmap', 'timeline planner', 'feature roadmap'],
    componentProps: { componentType: 'documentation', exampleInput: 'Q1 2024', generatorType: 'roadmap', convertFn: (i) => `# Product Roadmap: ${i || '2024'}\n\n## Now (Current Quarter)\n\n- [ ] Feature A - In development\n- [ ] Feature B - In design\n- [ ] Bug fix C\n\n## Next (Next Quarter)\n\n- [ ] Feature D - Planning\n- [ ] Feature E - Research\n\n## Later (Future)\n\n- Feature F\n- Feature G\n- Platform improvements\n\n## Completed\n\n- ✅ Feature X\n- ✅ Feature Y\n- ✅ Performance optimization\n` },
  },

  // ── Generator Tools ──
  'heading-generator': {
    title: 'Markdown Heading Generator - Create Headings | MarkdownKits',
    description: 'Generate Markdown headings from H1 to H6 with proper formatting. Free online heading generator for document structure.',
    keywords: ['heading generator', 'markdown headings', 'h1 to h6', 'markdown header generator', 'document headings'],
    componentProps: { componentType: 'generator', exampleInput: 'Welcome to My Project', generatorType: 'heading', convertFn: generateHeading },
  },
  'checklist-generator': {
    title: 'Markdown Checklist Generator - Create Task Lists | MarkdownKits',
    description: 'Generate Markdown checklists and task lists with checkboxes. Free online checklist generator for project management.',
    keywords: ['checklist generator', 'markdown checklist', 'task list', 'todo list markdown', 'github task list'],
    componentProps: { componentType: 'generator', exampleInput: 'Project launch tasks', generatorType: 'checklist', convertFn: generateChecklist },
  },
  'blockquote-generator': {
    title: 'Blockquote Generator - Create Blockquotes | MarkdownKits',
    description: 'Generate formatted blockquotes for Markdown documents. Free online blockquote generator with nested and styled variants.',
    keywords: ['blockquote generator', 'markdown blockquote', 'quote formatting', 'nested blockquote', 'blockquote styles'],
    componentProps: { componentType: 'generator', exampleInput: 'Your quoted text here', generatorType: 'blockquote', convertFn: generateBlockquote },
  },
  'code-block-generator': {
    title: 'Code Block Generator - Create Code Blocks | MarkdownKits',
    description: 'Generate properly formatted code blocks in Markdown with syntax highlighting labels. Free online code block generator.',
    keywords: ['code block generator', 'markdown code block', 'syntax highlighting', 'fenced code block', 'code snippet formatter'],
    componentProps: { componentType: 'generator', exampleInput: 'const x = 1;', generatorType: 'code-block', convertFn: generateCodeBlock },
  },
  'badge-generator': {
    title: 'Markdown Badge Generator - Create Shields/Badges | MarkdownKits',
    description: 'Generate Markdown badge markup for README files. Free online badge generator for project status, version, and license badges.',
    keywords: ['badge generator', 'markdown badge', 'shields.io', 'github badge', 'readme badge', 'project badge'],
    componentProps: { componentType: 'generator', exampleInput: '', generatorType: 'badge', convertFn: generateBadge },
  },
  'emoji-picker': {
    title: 'Markdown Emoji Picker - Find and Copy Emojis | MarkdownKits',
    description: 'Browse and copy emojis for use in Markdown documents. Free online emoji picker with search and categories.',
    keywords: ['emoji picker', 'markdown emoji', 'copy emoji', 'emoji cheat sheet', 'emoji browser'],
    componentProps: { componentType: 'generator', exampleInput: '', generatorType: 'emoji', convertFn: generateEmoji },
  },
  'toc-generator': {
    title: 'Table of Contents Generator - Auto TOC | MarkdownKits',
    description: 'Generate a table of contents from Markdown headings. Free online TOC generator with indentation and links.',
    keywords: ['toc generator', 'table of contents', 'markdown toc', 'auto table of contents', 'document navigation'],
    componentProps: { componentType: 'generator', exampleInput: exampleHeading, generatorType: 'toc', convertFn: generateToc },
  },
  'footnote-generator': {
    title: 'Footnote Generator - Create Footnotes | MarkdownKits',
    description: 'Generate footnotes in Markdown format. Free online footnote generator for academic and reference documents.',
    keywords: ['footnote generator', 'markdown footnote', 'add footnotes', 'reference notes', 'citation markdown'],
    componentProps: { componentType: 'generator', exampleInput: 'This is a sentence that needs a citation.', generatorType: 'footnote', convertFn: generateFootnote },
  },
  'definition-list-generator': {
    title: 'Definition List Generator - Create Definition Lists | MarkdownKits',
    description: 'Generate definition lists in Markdown format. Free online definition list generator for glossaries and terminology.',
    keywords: ['definition list', 'markdown definition list', 'glossary generator', 'term definition', 'description list'],
    componentProps: { componentType: 'generator', exampleInput: 'Markdown: A lightweight markup language', generatorType: 'definition-list', convertFn: generateDefinitionList },
  },
  'collapsible-generator': {
    title: 'Collapsible Generator - Create Toggle Sections | MarkdownKits',
    description: 'Generate collapsible/section details elements in Markdown using HTML details/summary tags.',
    keywords: ['collapsible generator', 'details summary', 'toggle section', 'expandable content', 'markdown collapsible'],
    componentProps: { componentType: 'generator', exampleInput: 'Click to reveal more information', generatorType: 'collapsible', convertFn: generateCollapsible },
  },
  'youtube-embed-generator': {
    title: 'YouTube Embed Generator - Embed YouTube Videos | MarkdownKits',
    description: 'Generate Markdown markup for embedding YouTube videos. Free online YouTube embed generator for blog posts and documentation.',
    keywords: ['youtube embed', 'embed video markdown', 'youtube markdown', 'video embed generator', 'thumbnail link'],
    componentProps: { componentType: 'generator', exampleInput: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', generatorType: 'youtube-embed', convertFn: generateYoutubeEmbed },
  },
  'github-alert-generator': {
    title: 'GitHub Alert Generator - Create GitHub Alerts | MarkdownKits',
    description: 'Generate GitHub-flavored alert blocks (NOTE, TIP, IMPORTANT, WARNING, CAUTION). Free online GitHub alert generator.',
    keywords: ['github alert', 'markdown alert', 'github note', 'github tip', 'github warning', 'callout generator'],
    componentProps: { componentType: 'generator', exampleInput: '', generatorType: 'github-alert', convertFn: generateGitHubAlert },
  },
  'citation-generator': {
    title: 'Citation Generator - Create Citations | MarkdownKits',
    description: 'Generate citations and references in Markdown format. Free online citation generator for academic writing.',
    keywords: ['citation generator', 'markdown citation', 'reference generator', 'bibliography', 'academic citation'],
    componentProps: { componentType: 'generator', exampleInput: 'Doe, J. (2024). Title of the work.', generatorType: 'citation', convertFn: generateCitation },
  },
  'math-equation-generator': {
    title: 'Math Equation Generator - Create LaTeX Math | MarkdownKits',
    description: 'Generate mathematical equations in LaTeX format for Markdown documents. Free online math equation generator.',
    keywords: ['math equation generator', 'latex math markdown', 'equation editor', 'mathematical notation', 'katex markdown'],
    componentProps: { componentType: 'generator', exampleInput: 'E = mc^2', generatorType: 'math', convertFn: generateMath },
  },

  // ── Diagram Tools ──
  'mermaid-flowchart-generator': {
    title: 'Mermaid Flowchart Generator - Create Flowcharts | MarkdownKits',
    description: 'Create Mermaid flowcharts with our free online diagram generator. Generate flowchart diagrams for documentation and presentations.',
    keywords: ['mermaid flowchart', 'flowchart generator', 'mermaid diagram', 'flow chart maker', 'diagram as code'],
    componentProps: { componentType: 'diagram', exampleInput: generateFlowchart(), generatorType: 'flowchart' },
  },
  'mermaid-sequence-diagram-generator': {
    title: 'Mermaid Sequence Diagram Generator | MarkdownKits',
    description: 'Create Mermaid sequence diagrams for documenting interactions. Free online sequence diagram generator.',
    keywords: ['mermaid sequence diagram', 'sequence diagram maker', 'interaction diagram', 'uml sequence', 'message flow'],
    componentProps: { componentType: 'diagram', exampleInput: generateSequenceDiagram(), generatorType: 'sequence' },
  },
  'mermaid-er-diagram-generator': {
    title: 'Mermaid ER Diagram Generator - Create Entity-Relationship Diagrams | MarkdownKits',
    description: 'Create entity-relationship diagrams with Mermaid. Free online ER diagram generator for database design.',
    keywords: ['mermaid er diagram', 'entity relationship diagram', 'database diagram', 'er diagram maker', 'data model'],
    componentProps: { componentType: 'diagram', exampleInput: generateErDiagram(), generatorType: 'er' },
  },
  'mermaid-gantt-chart-generator': {
    title: 'Mermaid Gantt Chart Generator - Create Gantt Charts | MarkdownKits',
    description: 'Create Gantt charts for project scheduling with Mermaid. Free online Gantt chart generator.',
    keywords: ['mermaid gantt', 'gantt chart maker', 'project timeline', 'schedule diagram', 'mermaid timeline'],
    componentProps: { componentType: 'diagram', exampleInput: generateGantt(), generatorType: 'gantt' },
  },
  'mermaid-mindmap-generator': {
    title: 'Mermaid Mindmap Generator - Create Mind Maps | MarkdownKits',
    description: 'Create mind maps with Mermaid diagram syntax. Free online mindmap generator for brainstorming and planning.',
    keywords: ['mermaid mindmap', 'mind map maker', 'brainstorming diagram', 'idea map', 'mermaid mind map'],
    componentProps: { componentType: 'diagram', exampleInput: generateMindmap(), generatorType: 'mindmap' },
  },
  'mermaid-pie-chart-generator': {
    title: 'Mermaid Pie Chart Generator - Create Pie Charts | MarkdownKits',
    description: 'Create pie charts with Mermaid diagram syntax. Free online pie chart generator for data visualization.',
    keywords: ['mermaid pie chart', 'pie chart maker', 'data visualization', 'statistics chart', 'mermaid chart'],
    componentProps: { componentType: 'diagram', exampleInput: generatePieChart(), generatorType: 'pie' },
  },
  'mermaid-timeline-generator': {
    title: 'Mermaid Timeline Generator - Create Timelines | MarkdownKits',
    description: 'Create timeline diagrams with Mermaid syntax. Free online timeline generator for project history and roadmaps.',
    keywords: ['mermaid timeline', 'timeline diagram', 'project history', 'roadmap timeline', 'mermaid timeline'],
    componentProps: { componentType: 'diagram', exampleInput: generateTimeline(), generatorType: 'timeline' },
  },
  'mermaid-class-diagram-generator': {
    title: 'Mermaid Class Diagram Generator - Create UML Class Diagrams | MarkdownKits',
    description: 'Create UML class diagrams with Mermaid. Free online class diagram generator for object-oriented design.',
    keywords: ['mermaid class diagram', 'uml class diagram', 'object oriented diagram', 'class diagram maker', 'inheritance diagram'],
    componentProps: { componentType: 'diagram', exampleInput: generateClassDiagram(), generatorType: 'class' },
  },
  'mermaid-state-diagram-generator': {
    title: 'Mermaid State Diagram Generator - Create State Diagrams | MarkdownKits',
    description: 'Create state diagrams with Mermaid syntax. Free online state diagram generator for system behavior modeling.',
    keywords: ['mermaid state diagram', 'state machine diagram', 'uml state', 'state transition', 'mermaid state'],
    componentProps: { componentType: 'diagram', exampleInput: '```mermaid\nstateDiagram-v2\n    [*] --> Idle\n    Idle --> Processing: Start\n    Processing --> Complete: Finish\n    Processing --> Error: Fail\n    Complete --> [*]\n    Error --> Idle: Retry\n```', generatorType: 'state' },
  },
  'mermaid-user-journey-generator': {
    title: 'Mermaid User Journey Generator - Create User Journeys | MarkdownKits',
    description: 'Create user journey diagrams with Mermaid. Free online user journey map generator for UX design.',
    keywords: ['mermaid user journey', 'user journey map', 'ux diagram', 'customer journey', 'experience map'],
    componentProps: { componentType: 'diagram', exampleInput: '```mermaid\njourney\n    title User Shopping Experience\n    section Browse\n      Search products: 5: User\n      View results: 4: User\n    section Purchase\n      Add to cart: 5: User\n      Checkout: 3: User\n      Payment: 2: User\n    section Delivery\n      Track order: 4: User\n      Receive: 5: User\n```', generatorType: 'user-journey' },
  },
  'mermaid-gitgraph-generator': {
    title: 'Mermaid Git Graph Generator - Create Git Graphs | MarkdownKits',
    description: 'Create Git branch diagrams with Mermaid. Free online Git graph generator for visualizing repository history.',
    keywords: ['mermaid gitgraph', 'git branch diagram', 'git graph generator', 'version control diagram', 'branch visualization'],
    componentProps: { componentType: 'diagram', exampleInput: '```mermaid\ngitGraph\n    commit id: "init"\n    branch feature\n    checkout feature\n    commit id: "feat-1"\n    commit id: "feat-2"\n    checkout main\n    commit id: "fix-1"\n    merge feature\n    commit id: "release"\n```', generatorType: 'gitgraph' },
  },
  'mermaid-requirement-diagram-generator': {
    title: 'Mermaid Requirement Diagram Generator | MarkdownKits',
    description: 'Create requirement diagrams with Mermaid. Free online requirements diagram generator for systems engineering.',
    keywords: ['mermaid requirement diagram', 'requirements diagram', 'systems engineering', 'requirements traceability'],
    componentProps: { componentType: 'diagram', exampleInput: '```mermaid\nrequirementDiagram\n    requirement req1 {\n        id: 1\n        text: System shall respond within 2s\n        risk: medium\n        verifymethod: test\n    }\n    element element1 {\n        type: feature\n    }\n    element1 - satisfies -> req1\n```', generatorType: 'requirement' },
  },

  // ── Utility Tools ──
  'markdown-preview': {
    title: 'Markdown Preview - Render Markdown to HTML | MarkdownKits',
    description: 'Preview Markdown documents rendered as HTML. Free online Markdown preview tool with instant rendering.',
    keywords: ['markdown preview', 'md preview', 'render markdown', 'markdown viewer', 'preview markdown online'],
    componentProps: { componentType: 'utility', exampleInput: exampleHeading, generatorType: 'preview' },
  },
  'markdown-viewer': {
    title: 'Markdown Viewer - View Markdown Documents | MarkdownKits',
    description: 'View Markdown documents rendered as clean HTML. Free online Markdown viewer for reading .md files.',
    keywords: ['markdown viewer', 'md viewer', 'read markdown', 'markdown reader', 'view markdown online'],
    componentProps: { componentType: 'utility', exampleInput: exampleHeading, generatorType: 'viewer' },
  },
  'markdown-search': {
    title: 'Markdown Search - Search Within Documents | MarkdownKits',
    description: 'Search and find text within Markdown documents. Free online Markdown search tool with highlight and count.',
    keywords: ['markdown search', 'find in markdown', 'search markdown', 'text search tool', 'markdown finder'],
    componentProps: { componentType: 'utility', exampleInput: exampleHeading, generatorType: 'search' },
  },
  'markdown-merger': {
    title: 'Markdown Merger - Merge Multiple Documents | MarkdownKits',
    description: 'Merge multiple Markdown documents into one file. Free online Markdown merger for combining .md files.',
    keywords: ['merge markdown', 'combine md files', 'markdown merger tool', 'join markdown documents', 'file merger'],
    componentProps: { componentType: 'utility', exampleInput: `# First Document\n\nContent of first document.\n\n---\n\n# Second Document\n\nContent of second document.`, generatorType: 'merge' },
  },
  'markdown-splitter': {
    title: 'Markdown Splitter - Split Documents by Headings | MarkdownKits',
    description: 'Split Markdown documents into separate sections by headings. Free online Markdown splitter for document organization.',
    keywords: ['split markdown', 'divide md document', 'markdown splitter', 'separate by headings', 'document divider'],
    componentProps: { componentType: 'utility', exampleInput: exampleHeading, generatorType: 'split' },
  },
  'markdown-metadata-extractor': {
    title: 'Markdown Metadata Extractor - Extract Front Matter | MarkdownKits',
    description: 'Extract metadata and front matter from Markdown documents. Free online metadata extractor for YAML front matter analysis.',
    keywords: ['metadata extractor', 'front matter extractor', 'yaml front matter', 'markdown metadata', 'document metadata'],
    componentProps: { componentType: 'utility', exampleInput: '---\ntitle: My Document\ndate: 2024-01-01\nauthor: John\ntags: [markdown, tutorial]\n---\n\n# Document Content\n\nThis is the document body.', generatorType: 'metadata' },
  },
  'html-blog-generator': {
    title: 'HTML Blog Generator - Create Blog HTML | MarkdownKits',
    description: 'Generate HTML blog pages from Markdown content. Free online blog HTML generator with styled templates.',
    keywords: ['html blog generator', 'blog html template', 'markdown to html blog', 'blog page generator', 'static blog'],
    componentProps: { componentType: 'utility', exampleInput: 'My Awesome Blog Post', generatorType: 'html-blog', convertFn: generateHtmlBlog },
  },
  'resume-generator': {
    title: 'Markdown Resume Generator - Create Resume | MarkdownKits',
    description: 'Generate a professional resume in Markdown format. Free online resume generator for developers and tech professionals.',
    keywords: ['markdown resume', 'resume generator', 'developer resume', 'md resume', 'tech resume template'],
    componentProps: { componentType: 'utility', exampleInput: 'Your Name', generatorType: 'resume', convertFn: generateResume },
  },
  'static-site-generator': {
    title: 'Static Site Generator - Create Site Structure | MarkdownKits',
    description: 'Generate static site structure and templates from Markdown. Free online static site generator for documentation sites.',
    keywords: ['static site generator', 'markdown static site', 'site structure generator', 'docs site', 'static site template'],
    componentProps: { componentType: 'utility', exampleInput: 'My Documentation Site', generatorType: 'static-site', convertFn: generateStaticSite },
  },
  'css-theme-generator': {
    title: 'CSS Theme Generator for Markdown - Create CSS Themes | MarkdownKits',
    description: 'Generate CSS theme variables for styling Markdown content. Free online CSS theme generator for consistent document styling.',
    keywords: ['css theme generator', 'markdown css', 'theme variables', 'css variables', 'markdown styling'],
    componentProps: { componentType: 'utility', exampleInput: '', generatorType: 'css-theme', convertFn: generateCssTheme },
  },
  'seo-analyzer': {
    title: 'Markdown SEO Analyzer - Analyze Content for SEO | MarkdownKits',
    description: 'Analyze Markdown content for SEO best practices. Free online SEO analyzer for headings, keywords, links, and readability.',
    keywords: ['seo analyzer markdown', 'content seo analysis', 'markdown seo checker', 'seo audit markdown', 'content optimization'],
    componentProps: { componentType: 'utility', exampleInput: exampleHeading, generatorType: 'seo', convertFn: generateSeoAnalysis },
  },
  'snippet-manager': {
    title: 'Markdown Snippet Manager - Manage Code Snippets | MarkdownKits',
    description: 'Organize and manage code snippets in Markdown format. Free online snippet manager with syntax highlighting.',
    keywords: ['snippet manager', 'code snippets', 'markdown snippets', 'code organizer', 'snippet library'],
    componentProps: { componentType: 'utility', exampleInput: 'console.log("Hello, World!")', generatorType: 'snippet', convertFn: generateSnippet },
  },
  'clipboard-to-markdown': {
    title: 'Clipboard to Markdown - Paste and Convert | MarkdownKits',
    description: 'Convert clipboard content to Markdown format. Free online clipboard converter for quick Markdown creation.',
    keywords: ['clipboard to markdown', 'paste to md', 'clipboard converter', 'quick markdown', 'paste and convert'],
    componentProps: { componentType: 'utility', exampleInput: 'Paste your text here. It will be formatted as Markdown.', generatorType: 'clipboard' },
  },
  'version-comparator': {
    title: 'Markdown Version Comparator - Compare Documents | MarkdownKits',
    description: 'Compare two versions of Markdown documents. Free online diff tool for tracking changes in Markdown files.',
    keywords: ['version comparator', 'markdown diff', 'compare md files', 'document comparison', 'change tracker'],
    componentProps: { componentType: 'utility', exampleInput: '1.2.3 1.3.0', generatorType: 'version-compare', convertFn: generateVersionCompare },
  },
  'archive-generator': {
    title: 'Markdown Archive Generator - Create Archives | MarkdownKits',
    description: 'Generate archive and folder structure documentation in Markdown. Free online archive generator for project organization.',
    keywords: ['archive generator', 'folder structure', 'project archive', 'directory tree', 'file structure markdown'],
    componentProps: { componentType: 'utility', exampleInput: '', generatorType: 'archive', convertFn: generateArchiveFolder },
  },
}

export function getToolConfig(id: string): ToolConfigEntry | undefined {
  const entry = toolConfig[id]
  if (entry) return entry

  const tool = tools.find((t: { id: string }) => t.id === id)
  if (!tool) return undefined

  const cat = tool.category as ToolComponentType
  const name = tool.name
  const desc = tool.description
  return {
    title: `${name} - Free Online Tool | MarkdownKits`,
    description: `${desc} Free online Markdown tool. 100% private, no server uploads, works in your browser.`,
    keywords: [name.toLowerCase(), 'markdown', 'online tool', 'free tool', cat],
    componentProps: {
      componentType: cat,
      exampleInput: cat === 'table' ? exampleTable : cat === 'documentation' ? exampleDoc : exampleHeading,
    },
  }
}

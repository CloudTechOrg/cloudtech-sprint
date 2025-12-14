import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'
import hljs from 'highlight.js'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getMarkdownContent(sprint: string, page: string) {
  const fullPath = path.join(contentDirectory, sprint, `${page}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // タイトルを抽出（最初のh1）
  const titleMatch = fileContents.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : `${sprint}/${page}`

  // MarkdownをHTMLに変換
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(fileContents)

  let htmlContent = processedContent.toString()

  // 外部リンクを別タブで開くように設定
  htmlContent = htmlContent.replace(
    /<a href="(https?:\/\/[^"]+)">/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">'
  )

  // コードブロックにシンタックスハイライトを適用
  htmlContent = htmlContent.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => {
      const decodedCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
      try {
        const highlighted = hljs.highlight(decodedCode, { language: lang }).value
        return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`
      } catch {
        return `<pre><code>${code}</code></pre>`
      }
    }
  )

  return {
    title,
    content: htmlContent,
  }
}

export function getAllSprints() {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const sprints = fs.readdirSync(contentDirectory)
    .filter(f => f.startsWith('sprint') && fs.statSync(path.join(contentDirectory, f)).isDirectory())

  const documents: { sprint: string; page: string }[] = []

  sprints.forEach(sprint => {
    const sprintPath = path.join(contentDirectory, sprint)
    const mdFiles = fs.readdirSync(sprintPath).filter(f => f.endsWith('.md'))

    mdFiles.forEach(file => {
      documents.push({
        sprint,
        page: file.replace('.md', ''),
      })
    })
  })

  return documents
}

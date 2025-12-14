const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const hljs = require('highlight.js');
const { markedHighlight } = require('marked-highlight');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure marked with syntax highlighting
marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

// Configure marked options
marked.use({
  gfm: true,
  breaks: true
});

// HTML template for iframe embedding
function generateHTML(title, content) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
  <style>
    :root {
      --orange-primary: #e67e22;
      --orange-light: #fef5e7;
      --orange-border: #f39c12;
      --text-dark: #2d3436;
      --text-medium: #636e72;
      --text-light: #b2bec3;
      --bg-white: #ffffff;
      --bg-light: #fafafa;
      --border-color: #eee;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 16px;
      line-height: 2;
      color: var(--text-dark);
      max-width: 860px;
      margin: 0 auto;
      padding: 48px;
      background-color: var(--bg-white);
    }

    /* ===== 見出し ===== */
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-dark);
      margin: 0 0 2rem 0;
      padding-bottom: 0.75rem;
      border-bottom: 3px solid var(--orange-primary);
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-dark);
      background: var(--orange-light);
      border-left: 4px solid var(--orange-primary);
      margin: 3rem 0 1.5rem 0;
      padding: 0.6rem 1rem;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 2.5rem 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--orange-border);
    }

    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 2rem 0 0.75rem 0;
      padding-left: 0.75rem;
      border-left: 3px solid var(--orange-border);
    }

    /* ===== 本文 ===== */
    p {
      margin: 1.25rem 0;
    }

    strong {
      font-weight: 600;
      color: var(--text-dark);
    }

    /* ===== リンク ===== */
    a {
      color: var(--orange-primary);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    /* ===== リスト ===== */
    ul, ol {
      margin: 1.25rem 0;
      padding-left: 1.5rem;
    }

    li {
      margin: 0.5rem 0;
      line-height: 1.9;
    }

    li::marker {
      color: var(--orange-primary);
    }

    /* ===== テーブル ===== */
    table {
      width: 100%;
      margin: 1.5rem 0;
      border-collapse: collapse;
      font-size: 0.95rem;
    }

    th, td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    th {
      font-weight: 600;
      color: var(--text-dark);
      background: var(--bg-light);
      border-bottom: 2px solid var(--orange-border);
    }

    tr:hover {
      background: var(--bg-light);
    }

    /* ===== コード ===== */
    code {
      font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
      font-size: 0.875rem;
      background: #f4f4f4;
      padding: 0.15rem 0.4rem;
      border-radius: 3px;
    }

    pre {
      background: #f8f8f8;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      padding: 1.25rem;
      margin: 1.5rem 0;
      overflow-x: auto;
    }

    pre code {
      background: transparent;
      padding: 0;
      font-size: 0.85rem;
      line-height: 1.6;
    }

    /* ===== 引用 ===== */
    blockquote {
      margin: 1.5rem 0;
      padding: 1rem 1.25rem;
      background: var(--orange-light);
      border-left: 4px solid var(--orange-primary);
      color: var(--text-medium);
    }

    blockquote p {
      margin: 0.5rem 0;
    }

    /* ===== 区切り線 ===== */
    hr {
      border: none;
      border-top: 1px solid var(--border-color);
      margin: 3rem 0;
    }

    /* ===== 画像 ===== */
    img {
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
    }

    /* ===== ボタン ===== */
    .top-buttons {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      gap: 10px;
      z-index: 1000;
    }

    .open-new-tab-btn,
    .pdf-download-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border: none;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      transition: opacity 0.2s;
    }

    .open-new-tab-btn {
      background: var(--orange-primary);
      color: #fff;
    }

    .pdf-download-btn {
      background: var(--text-medium);
      color: #fff;
    }

    .open-new-tab-btn:hover,
    .pdf-download-btn:hover {
      opacity: 0.85;
      text-decoration: none;
      color: #fff;
    }

    .open-new-tab-btn svg,
    .pdf-download-btn svg {
      width: 14px;
      height: 14px;
    }

    /* ===== レスポンシブ ===== */
    @media (max-width: 768px) {
      body {
        padding: 24px 20px;
        padding-top: 70px;
        font-size: 15px;
      }

      h1 { font-size: 1.5rem; }
      h2 { font-size: 1.15rem; }
      h3 { font-size: 1.05rem; }

      .top-buttons {
        top: 12px;
        right: 12px;
      }

      .open-new-tab-btn,
      .pdf-download-btn {
        padding: 6px 10px;
        font-size: 12px;
      }
    }

    /* ===== 印刷 ===== */
    @media print {
      .top-buttons {
        display: none !important;
      }
      body {
        padding: 0;
        max-width: none;
      }
    }
  </style>
</head>
<body>
  <div class="top-buttons">
    <a href="javascript:void(0)" onclick="openInNewTab()" class="open-new-tab-btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      別ページで開く
    </a>
    <button class="pdf-download-btn" onclick="downloadPDF()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      PDF
    </button>
  </div>
  ${content}
  <script>
    function downloadPDF() {
      window.print();
    }
    function openInNewTab() {
      window.open(window.location.href, '_blank');
    }
  </script>
</body>
</html>`;
}

// Allow iframe embedding (remove X-Frame-Options)
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  res.setHeader('Content-Security-Policy', "frame-ancestors *");
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Route: /:sprint/:page (e.g., /sprint1/kadai)
app.get('/:sprint/:page', (req, res) => {
  const { sprint, page } = req.params;
  const mdFilePath = path.join(__dirname, sprint, `${page}.md`);

  // Check if file exists
  if (!fs.existsSync(mdFilePath)) {
    return res.status(404).send(generateHTML('Not Found', '<h1>404 - Page Not Found</h1><p>The requested document does not exist.</p>'));
  }

  try {
    // Read markdown file
    const markdown = fs.readFileSync(mdFilePath, 'utf-8');

    // Convert to HTML
    const htmlContent = marked(markdown);

    // Generate title from first heading or filename
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : `${sprint}/${page}`;

    // Send response
    res.send(generateHTML(title, htmlContent));
  } catch (error) {
    console.error('Error processing markdown:', error);
    res.status(500).send(generateHTML('Error', '<h1>500 - Server Error</h1><p>Failed to process the document.</p>'));
  }
});

// Test page route
app.get('/test', (req, res) => {
  const testHtmlPath = path.join(__dirname, 'test.html');
  if (fs.existsSync(testHtmlPath)) {
    res.sendFile(testHtmlPath);
  } else {
    res.status(404).send('test.html not found');
  }
});

// Root route - show available documents
app.get('/', (req, res) => {
  const sprintDirs = fs.readdirSync(__dirname)
    .filter(f => f.startsWith('sprint') && fs.statSync(path.join(__dirname, f)).isDirectory());

  let content = '<h1>CloudTech Sprint Documents</h1><ul>';

  sprintDirs.forEach(sprint => {
    const mdFiles = fs.readdirSync(path.join(__dirname, sprint))
      .filter(f => f.endsWith('.md'));

    mdFiles.forEach(file => {
      const page = file.replace('.md', '');
      content += `<li><a href="/${sprint}/${page}">${sprint}/${page}</a></li>`;
    });
  });

  content += '</ul>';
  content += '<h2>Usage</h2>';
  content += '<p>Access documents via: <code>/{sprint}/{page}</code></p>';
  content += '<p>Example: <code>/sprint1/kadai</code></p>';
  content += '<h2>iframe Embedding</h2>';
  content += '<pre><code>&lt;iframe src="http://your-domain/sprint1/kadai" width="100%" height="600"&gt;&lt;/iframe&gt;</code></pre>';

  res.send(generateHTML('CloudTech Sprint Documents', content));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  - /sprint1/kadai');
  console.log('  - /sprint2/kadai');
});

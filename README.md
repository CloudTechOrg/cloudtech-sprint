# CloudTech Sprint Documents

MarkdownファイルをHTMLに変換して表示するNext.jsアプリケーションです。

## 前提条件

Node.js（npm含む）がインストールされている必要があります。

### Node.jsのインストール方法

#### macOS（Homebrewを使用）

```bash
# Homebrewがない場合は先にインストール
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.jsをインストール
brew install node
```

#### macOS / Linux（nvmを使用）

```bash
# nvmをインストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# ターミナルを再起動後、Node.jsをインストール
nvm install --lts
nvm use --lts
```

#### 公式インストーラー

https://nodejs.org/ から直接ダウンロードしてインストールすることもできます。

### インストール確認

```bash
node -v  # v18.x.x 以上を推奨
npm -v   # 9.x.x 以上
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

サーバーが `http://localhost:3000` で起動します。

### 3. 本番用ビルド

```bash
npm run build
npm start
```

## 使い方

### URL構成

| URL | 説明 |
|-----|------|
| `/` | ドキュメント一覧ページ |
| `/{sprint}/{page}` | 指定したMarkdownをHTMLで表示 |

### 例

- `http://localhost:3000/sprint1/kadai` → `content/sprint1/kadai.md` を表示
- `http://localhost:3000/sprint2/kadai` → `content/sprint2/kadai.md` を表示

## 新しいドキュメントの追加

1. `content/` 配下にディレクトリを作成
2. Markdownファイルを配置

```
content/
├── sprint1/
│   └── kadai.md
├── sprint2/
│   └── kadai.md
└── sprint3/          # 新規追加
    └── kadai.md
```

追加後は自動的に `/{sprint}/{page}` でアクセス可能になります。

## プロジェクト構成

```
clourtech-sprint/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # トップページ
│   │   ├── not-found.tsx       # 404ページ
│   │   ├── globals.css         # グローバルCSS
│   │   └── [sprint]/[page]/
│   │       └── page.tsx        # 動的ルート（Markdown表示）
│   ├── components/
│   │   └── TopButtons.tsx      # ボタンコンポーネント
│   └── lib/
│       └── markdown.ts         # Markdown処理
├── content/                    # Markdownファイル格納場所
│   ├── sprint1/
│   │   └── kadai.md
│   └── sprint2/
│       └── kadai.md
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

## 機能

- Markdownの自動HTML変換
- コードのシンタックスハイライト（highlight.js）
- 「別ページで開く」ボタン（新しいタブで開く）
- 「PDF」ボタン（印刷/PDF保存）
- オレンジテーマのスタイリング
- レスポンシブ対応

## 技術スタック

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- remark / remark-html（Markdown処理）
- highlight.js（コードハイライト）

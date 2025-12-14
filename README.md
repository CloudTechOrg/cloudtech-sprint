# CloudTech Sprint Documents Server

MarkdownファイルをHTMLに変換し、iframeで外部サイトに埋め込めるようにするWebサーバーです。

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

### 2. サーバーの起動

```bash
npm start
```

サーバーが `http://localhost:3000` で起動します。

## 使い方

### エンドポイント

| URL | 説明 |
|-----|------|
| `/` | ドキュメント一覧ページ |
| `/{sprint}/{page}` | 指定したMarkdownをHTMLで表示 |

### 例

- `http://localhost:3000/sprint1/kadai` → `sprint1/kadai.md` を表示
- `http://localhost:3000/sprint2/kadai` → `sprint2/kadai.md` を表示

## iframeでの埋め込み（外部サイトへの提供方法）

外部サイトにコンテンツを埋め込んでもらう場合、以下の情報を渡してください。

### 渡す情報

1. **埋め込み用URL**
   - Sprint1課題: `http://your-domain:3000/sprint1/kadai`
   - Sprint2課題: `http://your-domain:3000/sprint2/kadai`

2. **埋め込み用HTMLコード**

```html
<!-- Sprint1 課題 -->
<iframe
  src="http://your-domain:3000/sprint1/kadai"
  width="100%"
  height="1200"
  style="border: none; border-radius: 8px;">
</iframe>

<!-- Sprint2 課題 -->
<iframe
  src="http://your-domain:3000/sprint2/kadai"
  width="100%"
  height="1200"
  style="border: none; border-radius: 8px;">
</iframe>
```

### 機能説明（外部サイトに伝える内容）

- iframe内の右上に「別ページで開く」ボタンがあり、クリックすると別タブで開きます
- 「PDF」ボタンで印刷/PDF保存ができます
- レスポンシブ対応済み

### 注意事項

- `your-domain` の部分は実際のサーバーのドメインまたはIPアドレスに置き換えてください
- ローカル環境の場合は `localhost:3000` を使用
- 本番環境では適切なドメインとポートを設定してください

## 新しいドキュメントの追加

1. `sprintX/` ディレクトリを作成
2. `sprintX/kadai.md` などのMarkdownファイルを配置
3. `/sprintX/kadai` でアクセス可能

## 環境変数

| 変数 | デフォルト | 説明 |
|------|-----------|------|
| `PORT` | `3000` | サーバーのポート番号 |

ポートを変更する場合：

```bash
PORT=8080 npm start
```

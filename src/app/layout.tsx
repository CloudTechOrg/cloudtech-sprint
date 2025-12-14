import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CloudTech Sprint Documents',
  description: 'CloudTech Sprint課題ドキュメント',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

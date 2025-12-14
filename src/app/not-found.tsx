import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-4xl mx-auto px-12 py-12 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-8 pb-3 border-b-4 border-[#e67e22]">
        404 - ページが見つかりません
      </h1>
      <p className="my-4 text-gray-600">
        お探しのドキュメントは存在しません。
      </p>
      <Link
        href="/"
        className="text-[#e67e22] hover:underline"
      >
        ← トップページに戻る
      </Link>
    </main>
  )
}

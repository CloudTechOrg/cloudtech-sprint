import Link from 'next/link'
import { getAllSprints } from '@/lib/markdown'

export default function HomePage() {
  const documents = getAllSprints()

  return (
    <main className="max-w-4xl mx-auto px-12 py-12 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-8 pb-3 border-b-4 border-[#e67e22]">
        CloudTech Sprint Documents
      </h1>

      {documents.length === 0 ? (
        <p className="text-gray-600">
          ドキュメントがありません。content/ フォルダにMarkdownファイルを配置してください。
        </p>
      ) : (
        <ul className="space-y-3">
          {documents.map(({ sprint, page }) => (
            <li key={`${sprint}/${page}`}>
              <Link
                href={`/${sprint}/${page}`}
                className="text-[#e67e22] hover:underline text-lg"
              >
                {sprint}/{page}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4 py-2 px-4 bg-[#fef5e7] border-l-4 border-[#e67e22]">
          使い方
        </h2>
        <p className="my-4">
          ドキュメントへのアクセス: <code className="bg-gray-100 px-2 py-1 rounded text-sm">/{'{sprint}'}/{'{page}'}</code>
        </p>
        <p className="my-4">
          例: <code className="bg-gray-100 px-2 py-1 rounded text-sm">/sprint1/kadai</code>
        </p>
      </section>

    </main>
  )
}

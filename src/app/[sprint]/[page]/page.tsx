import { notFound } from 'next/navigation'
import { getMarkdownContent } from '@/lib/markdown'
import TopButtons from '@/components/TopButtons'

type Props = {
  params: Promise<{
    sprint: string
    page: string
  }>
}

export default async function DocumentPage({ params }: Props) {
  const { sprint, page } = await params
  const data = await getMarkdownContent(sprint, page)

  if (!data) {
    notFound()
  }

  return (
    <>
      <TopButtons />
      <main className="max-w-4xl mx-auto px-12 py-12 bg-white min-h-screen">
        <article
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </main>
    </>
  )
}

export async function generateMetadata({ params }: Props) {
  const { sprint, page } = await params
  const data = await getMarkdownContent(sprint, page)

  if (!data) {
    return { title: 'Not Found' }
  }

  return {
    title: data.title,
  }
}

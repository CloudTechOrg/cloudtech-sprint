import { notFound } from 'next/navigation'
import { getMarkdownContent } from '@/lib/markdown'
import MainLayout from '@/components/MainLayout'
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
    <MainLayout>
      <TopButtons />
      <div className="p-12 max-w-4xl">
        <article
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </MainLayout>
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

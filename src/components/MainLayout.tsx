import { getAllSprints } from '@/lib/markdown'
import Sidebar from './Sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const documents = getAllSprints()

  return (
    <div className="flex min-h-screen">
      <Sidebar documents={documents} />
      <main className="flex-1 bg-white">
        {children}
      </main>
    </div>
  )
}

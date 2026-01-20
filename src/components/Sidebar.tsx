'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type Document = {
  sprint: string
  page: string
  title: string
  sort: number
}

export default function Sidebar({ documents }: { documents: Document[] }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-[#fafafa] border-r border-gray-200 p-6 flex flex-col">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="CloudTech Academy"
            width={40}
            height={40}
          />
          <span className="font-bold text-gray-700 text-sm">CloudTech Sprint</span>
        </Link>
      </div>

      <nav className="flex-1">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Documents
        </h2>
        <ul className="space-y-1">
          {documents.map(({ sprint, page, title }) => {
            const href = `/${sprint}/${page}`
            const isActive = pathname === href

            return (
              <li key={`${sprint}/${page}`}>
                <Link
                  href={href}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-[#e67e22] text-white'
                      : 'text-gray-700 hover:bg-[#fef5e7] hover:text-[#e67e22]'
                  }`}
                >
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

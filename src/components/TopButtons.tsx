'use client'

export default function TopButtons() {
  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank')
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <div className="top-buttons fixed top-5 right-5 flex gap-2.5 z-50">
      <button
        onClick={handleOpenNewTab}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-[#e67e22] text-white text-sm font-medium rounded cursor-pointer hover:opacity-85 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-3.5 h-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        別ページで開く
      </button>
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-[#636e72] text-white text-sm font-medium rounded cursor-pointer hover:opacity-85 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-3.5 h-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        PDF
      </button>
    </div>
  )
}

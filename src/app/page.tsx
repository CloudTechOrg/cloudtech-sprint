import MainLayout from '@/components/MainLayout'

export default function HomePage() {
  return (
    <MainLayout>
      <div className="p-12">
        <h1 className="text-2xl font-bold mb-8 pb-3 border-b-4 border-[#e67e22]">
          CloudTech Sprint Documents
        </h1>
        <p className="text-gray-600">
          左側のメニューからドキュメントを選択してください。
        </p>
      </div>
    </MainLayout>
  )
}

import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'

export default async function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="space-y-4">
      <div>
        <Header />
        <Tabs />
      </div>
      <main className="f-full mx-auto max-w-[1200px] space-y-4">
        {children}
      </main>
    </div>
  )
}

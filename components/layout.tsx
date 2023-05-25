import { SiteHeader } from '@/components/site-header'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <SiteHeader />
      <main>{children}</main>
    </>
  )
}

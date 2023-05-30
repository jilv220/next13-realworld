import { SiteHeader } from '@/components/site-header'

export default function DefaultLayout({ children }) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <SiteHeader />
      {children}
    </>
  )
}

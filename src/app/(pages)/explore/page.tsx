import { Suspense } from 'react'
import ExplorePage from './_components/explore'

export default function Explore({ searchParams }: { searchParams: { city?: string } }) {
  const cityCode = searchParams.city ?? undefined

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">Loading explore page...</div>
      }
    >
      <ExplorePage cityCode={cityCode} />
    </Suspense>
  )
}

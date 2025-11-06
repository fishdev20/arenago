'use client'

import CitySelector from '@/components/app/explore-page/city-selector'
import FacilitiesSelector from '@/components/app/explore-page/sport-selector'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { useDebounce } from '@/hooks/use-debounce'
import { useSearchStore } from '@/store/search-store'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, List, Map, MapPin, Volleyball } from 'lucide-react'
import dynamic from 'next/dynamic'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// Lazy load map component (for better performance)
const MapView = dynamic(() => import('./_components/map-view'), { ssr: false })

export default function ExplorePage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const {
    selectedFacilities,
    selectedCities,
    setSelectedCities,
    setSelectedFacilities,
    searchSports,
    results,
    error,
    loading,
    pagination,
    pageSize,
    setPageSize,
  } = useSearchStore()

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [clickedId, setClickedId] = useState<number | null>(null)

  useEffect(() => {
    setClickedId(null)
  }, [pathname])

  // Apply city from query param
  useEffect(() => {
    const cityFromQuery = searchParams.get('city')
    if (cityFromQuery) setSelectedCities([cityFromQuery])
  }, [searchParams])

  const debouncedCities = useDebounce(selectedCities, 400)
  const debouncedFacilities = useDebounce(selectedFacilities, 400)
  const debouncedPage = useDebounce(pagination.currentPage, 400)
  const debouncedPageSize = useDebounce(pageSize, 400)

  useEffect(() => {
    searchSports(debouncedPage, debouncedPageSize)
  }, [debouncedCities, debouncedFacilities, debouncedPageSize])

  const handlePageChange = (page: number) => searchSports(page, pageSize)

  console.log(results)

  const handleCardClick = (id: number) => {
    setClickedId(id)
    router.push(`/explore/${id}`)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold">
          Explore <span className="text-primary">Sports Facilities</span>
        </h1>
        <p className="text-muted-foreground text-base">
          Find courts, gyms, and arenas near you — and start playing today.
        </p>
      </div> */}

      <div className="flex gap-10 flex-col md:flex-row">
        <div className="bg-background/70 backdrop-blur-lg border border-border rounded-xl shadow-sm p-4 flex flex-col items-end gap-4 h-full">
          <div className="w-full space-y-2">
            <Label>
              <Volleyball className="h-4 w-4" />
              Sport
            </Label>
            <FacilitiesSelector />
          </div>

          <div className="w-full space-y-2">
            <Label>
              <MapPin className="h-4 w-4" />
              City
            </Label>
            <CitySelector />
          </div>

          <div className="w-full space-y-2">
            <Label>Results per page</Label>
            <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger className="w-full bg-muted/30 !h-10">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[10, 20, 50, 100].map((v) => (
                    <SelectItem key={v} value={String(v)}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Map/List toggle */}
          <div className="flex items-center gap-2 w-full">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className="rounded-lg"
              size={'lg'}
            >
              <List /> List
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              onClick={() => setViewMode('map')}
              className="rounded-lg"
              size={'lg'}
            >
              <Map /> Map
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {viewMode === 'map' ? (
          <div className="h-[600px] w-full rounded-xl border border-border overflow-hidden">
            <MapView facilities={results} loading={loading} />
          </div>
        ) : (
          <div className="w-full">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-32 rounded-xl" />
                  ))}
                </div>
              ) : results.length > 0 ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {results.map((f: any, index: number) => (
                    <motion.div
                      key={f['lipas-id']}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div
                        onClick={() => handleCardClick(f['lipas-id'])}
                        className={`relative border border-border bg-card hover:shadow-md transition-all rounded-xl p-4 flex flex-col justify-between h-32 cursor-pointer ${
                          clickedId === f['lipas-id']
                            ? 'opacity-70 pointer-events-none'
                            : 'hover:bg-accent'
                        }`}
                      >
                        <p className="text-lg font-semibold text-primary line-clamp-1">{f.name}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {f.location.address}, {f.location['postal-office']}
                        </p>
                        {clickedId === f['lipas-id'] && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm rounded-xl"
                          >
                            <Spinner />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-sm text-muted-foreground text-center mt-10">No results found.</p>
              )}
            </AnimatePresence>

            <div className="flex justify-end items-center mt-4">
              {pagination && pagination.totalPages > 1 && (
                <div className="flex gap-2">
                  <span className="text-sm self-center">
                    {pagination.currentPage}/{pagination.totalPages}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    disabled={pagination.currentPage === 1}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    className="rounded-full"
                  >
                    <ArrowLeft />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                  >
                    <ArrowRight />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

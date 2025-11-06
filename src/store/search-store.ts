import { create } from 'zustand'

interface Pagination {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
}

interface SearchState {
  selectedFacilities: string[]
  selectedCities: string[]
  page: number
  pageSize: number
  results: any[]
  loading: boolean
  error: string | null
  pagination: Pagination
  cache: Record<string, { results: any[]; pagination: Pagination }>
  setSelectedFacilities: (facilities: string[]) => void
  setSelectedCities: (cities: string[]) => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  searchSports: (page?: number, pageSize?: number) => Promise<void>
  reset: () => void
}

export const useSearchStore = create<SearchState>((set, get) => ({
  selectedFacilities: [],
  selectedCities: [],
  results: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
  cache: {},
  setPage: (page) =>
    set((state) => ({
      pagination: { ...state.pagination, currentPage: page },
    })),
  setPageSize: (size) =>
    set((state) => ({
      pageSize: size,
    })),
  setSelectedFacilities: (sports) =>
    set({
      selectedFacilities: sports,
      pagination: { ...get().pagination, currentPage: 1, totalItems: 0, totalPages: 0 }, // reset page
    }),

  setSelectedCities: (cities) =>
    set({
      selectedCities: cities,
      pagination: { ...get().pagination, currentPage: 1, totalItems: 0, totalPages: 0 }, // reset page
    }),
  reset: () => set({ selectedFacilities: [], selectedCities: [] }),
  searchSports: async (page: number = 1, pageSize: number = 10) => {
    const { selectedFacilities, selectedCities, cache } = get()
    const key = `${selectedFacilities.join(',')}_${selectedCities.join(',')}_p${page}_size${pageSize}`

    if (cache[key]) {
      set({
        results: cache[key].results,
        pagination: cache[key].pagination,
        error: null,
        loading: false,
      })
      return
    }

    try {
      set({ loading: true, error: null })
      const params = new URLSearchParams({
        cityCodes: selectedCities.join(','),
        typeCodes: selectedFacilities.join(','),
        page: page.toString(),
        pageSize: pageSize.toString(),
      })

      const res = await fetch(`/api/search?${params.toString()}`)
      const json = await res.json()

      if (!json.success) {
        throw new Error(json.error)
      }

      set((state) => ({
        results: json.data.items,
        pagination: {
          currentPage: json.data.pagination['current-page'],
          pageSize: json.data.pagination['page-size'],
          totalItems: json.data.pagination['total-items'],
          totalPages: json.data.pagination['total-pages'],
        },
        loading: false,
        cache: {
          ...state.cache,
          [key]: {
            results: json.data.items,
            pagination: {
              currentPage: json.data.pagination['current-page'],
              pageSize: json.data.pagination['page-size'],
              totalItems: json.data.pagination['total-items'],
              totalPages: json.data.pagination['total-pages'],
            },
          },
        },
      }))
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  },
}))

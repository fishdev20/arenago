import { NextResponse } from 'next/server'

const LIPAS_API = 'https://api.lipas.fi/v2/sports-sites'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  // Optional filters
  const cityCodes = searchParams.get('cityCodes') // e.g. "91,92"
  const typeCodes = searchParams.get('typeCodes') // e.g. "2260,3110"
  const page = searchParams.get('page') || '1'
  const pageSize = searchParams.get('pageSize') || '10'

  // Build query string dynamically
  let query = `statuses=active&page=${page}&page-size=${pageSize}`
  if (cityCodes) query += `&city-codes=${cityCodes}`
  if (typeCodes) query += `&type-codes=${typeCodes}`

  const url = `${LIPAS_API}?${query}`

  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      // ✅ ISR caching to avoid spamming Lipas
      next: { revalidate: 60 * 60 }, // cache for 1 hour
    })

    if (!res.ok) {
      throw new Error(`Lipas API failed: ${res.statusText}`)
    }

    const data = await res.json()

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('❌ Search error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

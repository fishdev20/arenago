import { NextResponse } from 'next/server'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  try {
    // 🏟️ 1️⃣ Fetch facility data
    const res = await fetch(`https://api.lipas.fi/v2/sports-sites/${id}`, {
      next: { revalidate: 3600 }, // cache 1 hour
    })

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch data for id ${id}` },
        { status: res.status }
      )
    }

    const facilityData = await res.json()

    // 🧩 2️⃣ Extract type-code and fetch category schema
    const typeCode = facilityData['type']?.['type-code']
    let categoryData = null

    if (typeCode) {
      try {
        const categoryRes = await fetch(
          `https://api.lipas.fi/v2/sports-site-categories/${typeCode}`,
          { next: { revalidate: 86400 } } // cache for 1 day
        )

        if (categoryRes.ok) {
          categoryData = await categoryRes.json()
        }
      } catch {
        console.warn(`⚠️ Failed to fetch category data for type-code ${typeCode}`)
      }
    }

    // // 🧭 3️⃣ Optionally normalize key info for quick UI access
    // const normalized = {
    //   id: facilityData.lipasId,
    //   name: facilityData.name,
    //   type: facilityData.type?.name,
    //   city: facilityData.location?.['postal-office'],
    //   address: facilityData.location?.address,
    //   postalCode: facilityData.location?.['postal-code'],
    //   description: facilityData.description || '',
    //   location: facilityData.location,
    //   geometry: facilityData.geometry,
    //   typeCode,
    // }

    // ✅ 4️⃣ Return both facility and category info
    return NextResponse.json({
      success: true,
      data: facilityData,
      category: categoryData,
      // summary: normalized,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'

    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

const fs = require('fs')
const path = require('path')
const https = require('https')

async function updateCities() {
  // Dynamically get current year
  const year = new Date().getFullYear()

  // Build API URL (StatFin updates each year with YYYY0101)
  const url = `https://data.stat.fi/api/classifications/v2/classifications/kunta_1_${year}0101/classificationItems?content=data&meta=max&lang=en&format=json`

  console.log(`📡 Fetching cities from ${url}`)

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch cities for ${year}: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()

  // Normalize cities
  const cities = data.map((item: any) => ({
    code: item.code,
    name: item.classificationItemNames.find((n: any) => n.lang === 'en')?.name || '',
  }))

  // Save into data/cities.json
  const filePath = path.join(process.cwd(), 'data/cities.json')
  fs.writeFileSync(filePath, JSON.stringify(cities, null, 2))

  console.log(`✅ Saved ${cities.length} cities to ${filePath}`)
}

updateCities().catch((err) => {
  console.error('❌ Error updating cities:', err)
  process.exit(1)
})

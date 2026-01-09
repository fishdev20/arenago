'use client'

import { Map, MapClusterLayer, MapControls, MapPopup, useMap } from '@/components/ui/map'
import { motion } from 'framer-motion'
import type { FeatureCollection, Point } from 'geojson'
import { useEffect, useMemo, useRef, useState } from 'react'

type LipasFacility = {
  name: string
  'lipas-id': number
  location: {
    address?: string
    'postal-office'?: string
    geometries?: {
      features?: {
        geometry?: { coordinates: [number, number] } // [lon, lat]
      }[]
    }
  }
  www?: string
  comment?: string
}

interface MapViewProps {
  facilities: LipasFacility[]
  loading?: boolean
}

type PopupState = {
  longitude: number
  latitude: number
  facility: LipasFacility
}

/**
 * Fits the map to facility bounds ONLY when the facility dataset changes.
 * Prevents refit on theme/style reload (isLoaded toggles) which caused zoom resets.
 */
function FitToFacilities({
  data,
}: {
  data: FeatureCollection<Point, { facility: LipasFacility }>
}) {
  const { map, isLoaded } = useMap()
  const lastKeyRef = useRef<string>('')

  useEffect(() => {
    if (!isLoaded || !map) return
    if (!data.features.length) return

    // ✅ stable key based on facility id + coordinates
    // (so theme/style reload won't trigger a new fit)
    const key = data.features
      .map((f) => {
        const facility = (f.properties as any)?.facility as LipasFacility | undefined
        const id = facility?.['lipas-id'] ?? ''
        const [lng, lat] = f.geometry.coordinates
        return `${id}:${lng.toFixed(6)},${lat.toFixed(6)}`
      })
      .join('|')

    if (lastKeyRef.current === key) return
    lastKeyRef.current = key

    // Build bounds from all points
    let minLng = Infinity,
      minLat = Infinity,
      maxLng = -Infinity,
      maxLat = -Infinity

    for (const f of data.features) {
      const [lng, lat] = f.geometry.coordinates
      minLng = Math.min(minLng, lng)
      minLat = Math.min(minLat, lat)
      maxLng = Math.max(maxLng, lng)
      maxLat = Math.max(maxLat, lat)
    }

    // If only one point, center there
    if (minLng === maxLng && minLat === maxLat) {
      map.easeTo({ center: [minLng, minLat], zoom: 12, duration: 600 })
      return
    }

    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 50, maxZoom: 12, duration: 600 }
    )
  }, [data, isLoaded, map])

  return null
}

export default function MapView({ facilities, loading }: MapViewProps) {
  const [popup, setPopup] = useState<PopupState | null>(null)

  const data = useMemo<FeatureCollection<Point, { facility: LipasFacility }>>(() => {
    return {
      type: 'FeatureCollection',
      features: facilities
        .map((facility) => {
          const coords = facility.location?.geometries?.features?.[0]?.geometry?.coordinates
          if (!coords) return null
          const [longitude, latitude] = coords
          if (typeof longitude !== 'number' || typeof latitude !== 'number') return null

          return {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [longitude, latitude] },
            properties: { facility },
          }
        })
        .filter(Boolean) as any,
    }
  }, [facilities])

  return (
    <motion.div
      key="map"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full rounded-xl overflow-hidden relative"
    >
      <Map center={[24.941, 60.173]} zoom={10}>
        <MapControls />

        <FitToFacilities data={data} />

        <MapClusterLayer<{ facility: LipasFacility }>
          data={data}
          clusterRadius={50}
          clusterMaxZoom={14}
          pointColor="rgba(16,185,129,0.8)"
          clusterColors={['rgba(37,99,235,0.55)', 'rgba(37,99,235,0.7)', 'rgba(37,99,235,0.85)']}
          onPointClick={(feature, coordinates) => {
            const facility = (feature.properties as any)?.facility as LipasFacility | undefined
            if (!facility) return
            setPopup({ longitude: coordinates[0], latitude: coordinates[1], facility })
          }}
        />

        {popup && (
          <MapPopup
            longitude={popup.longitude}
            latitude={popup.latitude}
            onClose={() => setPopup(null)}
            closeButton
            offset={[0, -12]}
            className="bg-white dark:bg-card text-foreground border border-border rounded-lg shadow-lg p-3 text-sm w-60"
          >
            <div className="font-semibold text-primary mb-1">{popup.facility.name}</div>
            <div className="text-xs text-muted-foreground">
              {popup.facility.location?.address || ''}
              {popup.facility.location?.['postal-office']
                ? `, ${popup.facility.location?.['postal-office']}`
                : ''}
            </div>

            {popup.facility.www ? (
              <a
                href={popup.facility.www}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-500"
              >
                Website
              </a>
            ) : null}
          </MapPopup>
        )}
      </Map>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-10">
          <p className="text-sm text-muted-foreground animate-pulse">Loading map...</p>
        </div>
      )}
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Feature } from 'ol'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import Point from 'ol/geom/Point'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import Cluster from 'ol/source/Cluster'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'
import { useEffect, useRef } from 'react'

type LipasFacility = {
  name: string
  'lipas-id': number
  location: {
    address?: string
    'postal-office'?: string
    geometries?: {
      features?: {
        geometry?: { coordinates: [number, number] }
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

export default function MapView({ facilities, loading }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<Map | null>(null)
  const vectorSourceRef = useRef<VectorSource | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<Overlay | null>(null)

  // 🗺️ Initialize map once
  useEffect(() => {
    if (!mapRef.current) return

    const raster = new TileLayer({
      source: new OSM(),
    })

    const vectorSource = new VectorSource()
    vectorSourceRef.current = vectorSource

    // 🧩 Cluster Source
    const clusterSource = new Cluster({
      distance: 50,
      source: vectorSource,
    })

    // 🎨 Styling for clusters
    const styleCache: Record<number, Style> = {}
    const clusters = new VectorLayer({
      source: clusterSource,
      style: (feature) => {
        const size = feature.get('features').length
        let style = styleCache[size]
        if (!style) {
          if (size > 1) {
            style = new Style({
              image: new CircleStyle({
                radius: 14,
                stroke: new Stroke({ color: '#fff', width: 2 }),
                fill: new Fill({ color: 'rgba(37,99,235,0.75)' }), // primary
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({ color: '#fff' }),
                font: 'bold 12px "Inter", sans-serif',
              }),
            })
          } else {
            style = new Style({
              image: new CircleStyle({
                radius: 8,
                fill: new Fill({ color: 'rgba(16,185,129,0.8)' }), // secondary
                stroke: new Stroke({ color: '#fff', width: 2 }),
              }),
            })
          }
          styleCache[size] = style
        }
        return style
      },
    })

    // 📍 Popup overlay
    const popup = document.createElement('div')
    popup.className =
      'bg-white dark:bg-card text-foreground border border-border rounded-lg shadow-lg p-3 text-sm w-60'
    popupRef.current = popup
    const overlay = new Overlay({
      element: popup,
      autoPan: { animation: { duration: 250 } },
      offset: [0, -12],
    })
    overlayRef.current = overlay

    const map = new Map({
      target: mapRef.current,
      layers: [raster, clusters],
      overlays: [overlay],
      view: new View({
        center: fromLonLat([24.941, 60.173]), // Helsinki default
        zoom: 10,
      }),
      controls: defaultControls({ attribution: false }),
    })

    // 🧠 Click handler for clusters or facilities
    map.on('click', (evt) => {
      overlay.setPosition(undefined)
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const features = feature.get('features')
        if (features.length > 1) {
          // zoom into cluster
          const view = map.getView()
          view.animate({ zoom: view.getZoom()! + 1, center: evt.coordinate, duration: 300 })
        } else {
          const f = features[0]
          const props = f.getProperties()
          const coords = f.getGeometry()?.getCoordinates()
          const facility: LipasFacility = props.facility
          popup.innerHTML = `
            <div class="font-semibold text-primary mb-1">${facility.name}</div>
            <div class="text-xs text-muted-foreground">${facility.location?.address || ''}, ${
              facility.location?.['postal-office'] || ''
            }</div>
            ${facility.www ? `<a href="${facility.www}" target="_blank" class="text-xs text-blue-500">Website</a>` : ''}
          `
          overlay.setPosition(coords)
        }
      })
    })

    mapInstance.current = map
    return () => map.setTarget(undefined)
  }, [])

  // 🧭 Update facilities dynamically
  useEffect(() => {
    if (!mapInstance.current || !vectorSourceRef.current) return
    const map = mapInstance.current
    const vectorSource = vectorSourceRef.current

    vectorSource.clear()

    facilities.forEach((f) => {
      const coords = f.location?.geometries?.features?.[0]?.geometry?.coordinates ?? null

      if (coords && Array.isArray(coords)) {
        const feature = new Feature({
          geometry: new Point(fromLonLat(coords)),
          facility: f,
        })
        vectorSource.addFeature(feature)
      }
    })

    // Fit to all
    if (facilities.length > 0) {
      const extent = vectorSource.getExtent()
      map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 12, duration: 600 })
    }
  }, [facilities])

  return (
    <motion.div
      key="map"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      ref={mapRef}
      className="w-full h-full rounded-xl overflow-hidden relative"
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-10">
          <p className="text-sm text-muted-foreground animate-pulse">Loading map...</p>
        </div>
      )}
    </motion.div>
  )
}

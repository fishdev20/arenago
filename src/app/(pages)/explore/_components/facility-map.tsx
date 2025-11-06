'use client'

import { Feature } from 'ol'
import Map from 'ol/Map'
import View from 'ol/View'
import { Point } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Icon, Style } from 'ol/style'
import { useEffect, useRef } from 'react'

export default function FacilityMap({ coordinates }: { coordinates: [number, number] }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const marker = new Feature({
      geometry: new Point(fromLonLat(coordinates)),
    })

    marker.setStyle(
      new Style({
        image: new Icon({
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.05,
        }),
      })
    )

    const vectorLayer = new VectorLayer({
      source: new VectorSource({ features: [marker] }),
    })

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: fromLonLat(coordinates),
        zoom: 15,
      }),
      controls: [],
    })

    return () => map.setTarget(undefined)
  }, [coordinates])

  return <div ref={mapRef} className="h-full w-full rounded-b-md" />
}

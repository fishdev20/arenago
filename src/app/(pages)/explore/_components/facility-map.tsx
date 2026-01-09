import { Map, MapMarker, MarkerContent } from '@/components/ui/map'

export default function FacilityMap({ coordinates }: { coordinates: [number, number] }) {
  const [longitude, latitude] = coordinates

  return (
    <div className="h-full w-full rounded-b-md overflow-hidden">
      <Map center={[longitude, latitude]} zoom={15}>
        {/* <MapControls /> */}
        <MapMarker longitude={longitude} latitude={latitude}>
          <MarkerContent className="translate-y-[-6px]">
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow" />
          </MarkerContent>
        </MapMarker>
      </Map>
    </div>
  )
}

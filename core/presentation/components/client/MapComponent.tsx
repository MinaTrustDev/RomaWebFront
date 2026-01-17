"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useRef, useState } from 'react'

const center = { lat: 30.0444, lng: 31.2357 }
const containerStyle = {
    width: '400px',
    height: '400px',
  }
export default function MapComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      })

    const mapRef = useRef<google.maps.Map | null>(null);

    const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null)
  }, [])

  return (
    <Card className="w-full h-full">
        <CardContent>
        { isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )}
        </CardContent>
    </Card>
  )
}

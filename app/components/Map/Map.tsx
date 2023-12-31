'use client'
import React, { useState, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_GOOGLE_MAP!,
      version: 'weekly',
      libraries: ['places'],
    })

    loader.load().then((google) => {
      const mapContainer = document.getElementById('map-container')!
      const mapInstance = new google.maps.Map(mapContainer, {
        center: { lat: 59.434590032669306, lng: 24.752476311962607 },
        zoom: 18,
      })
      const marker = new google.maps.Marker({
        position: { lat: 59.434590032669306, lng: 24.752476311962607 },
        map: mapInstance,
        title: 'Vanahai',
      })

      const infoWindow = new google.maps.InfoWindow({
        content: '<h2>Vanahai</h2>',
      })
      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker)
      })

      setMap(mapInstance)
    })
  }, [])

  return (
    <div
      id="map-container"
      style={{ width: 'auto', height: '300px', borderRadius: '12px' }}
    />
  )
}

export default Map

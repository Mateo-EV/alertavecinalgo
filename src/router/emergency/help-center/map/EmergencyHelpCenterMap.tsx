import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useSearchParams } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { MdLocationOn } from "react-icons/md";

export default function EmergencyHelpCenterMap() {
  const [searchParams] = useSearchParams();

  const latitude = parseFloat(searchParams.get("lat") || "0");
  const longitude = parseFloat(searchParams.get("lng") || "0");
  const centerName = searchParams.get("name") || "Centro de Ayuda";

  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 14
  })
  
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12")
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize()
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-0">
        <Map
          ref={instance => {
            mapRef.current = instance && instance.getMap()
          }}
          initialViewState={viewport}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapStyle}
          mapboxAccessToken="pk.eyJ1IjoianVsaW9uYW1lYm90IiwiYSI6ImNtMzl2YmdpZjE4MTQyanBweWJ2NW0xaXgifQ.w18DiHEqFoyadsAI0-CldA"
          onMove={evt => setViewport(evt.viewState)}
        >
          <Marker latitude={latitude} longitude={longitude} anchor="bottom">
            <Popup 
              latitude={latitude} 
              longitude={longitude} 
              offset={25} 
              anchor="top"
              className="p-2 text-center"
              closeButton={false}
              closeOnClick={false}
            >
              <div className="flex items-center space-x-2">   
                <MdLocationOn className="text-red-500 text-xl" />
                <span className="text-black font-semibold" >{centerName}</span>
              </div>
            </Popup>
          </Marker>
        </Map>
      </div>
    </>
  )
}

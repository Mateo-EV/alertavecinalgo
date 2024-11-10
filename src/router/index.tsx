import { useEffect, useRef, useState } from "react"
import { BsPeopleFill, BsTelephoneFill } from "react-icons/bs"
import { MdCameraAlt, MdHome, MdPerson, MdShield } from "react-icons/md"
import Map, { Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import EmergencyButton from "@/components/EmergencyButton"
import { Link } from "react-router-dom"

const incidents = [
  { id: 1, latitude: -14.068, longitude: -75.73, type: "incidente" },
  { id: 2, latitude: -14.07, longitude: -75.725, type: "alerta" },
  { id: 3, latitude: -14.065, longitude: -75.726, type: "precaución" }
]

export default function MainPage() {
  const [viewport, setViewport] = useState({
    latitude: -14.067,
    longitude: -75.728,
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
      <div className="map-container">
        <Map
          ref={instance => {
            mapRef.current = instance && instance.getMap()
          }}
          initialViewState={viewport}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapStyle}
          mapboxAccessToken="pk.eyJ1IjoianVsaW9uYW1lYm90IiwiYSI6ImNtMzl2YmdpZjE4MTQyanBweWJ2NW0xaXgifQ.w18DiHEqFoyadsAI0-CldA"
        >
          {incidents.map(incident => (
            <Marker
              key={incident.id}
              latitude={incident.latitude}
              longitude={incident.longitude}
              anchor="center"
            >
              <div
                className={
                  incident.type === "alerta"
                    ? "bg-red-500 w-4 h-4 rounded-full"
                    : incident.type === "incidente"
                    ? "bg-yellow-500 w-4 h-4 rounded-full"
                    : "bg-green-500 w-4 h-4 rounded-full"
                }
              ></div>
            </Marker>
          ))}
        </Map>
      </div>

      {/* Botón de Emergencia */}
      <EmergencyButton />
      {/* Opciones de Emergencia y Comunidad */}
      <div className="options flex justify-center gap-4 p-4">
        {/* Opción de Emergencia (con Link) */}

        <Link
          to="emergency"
          className="option bg-white shadow-md p-4 rounded-lg text-center w-40 flex-1 max-w-xs"
        >
          <BsTelephoneFill className="option-icon mb-2 text-3xl text-black" />
          <p className="font-semibold text-[var(--bcp)]">Emergencia</p>
          <p className="text-xs text-gray-500">Números Importantes</p>
        </Link>

        {/* Opción de Comunidad (sin Link) */}

        <Link
          to="emergency"
          className="option bg-white shadow-md p-4 rounded-lg text-center w-40 flex-1 max-w-xs"
        >
          <BsPeopleFill className="option-icon mb-2 text-3xl text-black" />
          <p className="font-semibold text-[var(--bcp)]">Comunidad</p>
          <p className="text-xs text-gray-500">12 Activos</p>
        </Link>
      </div>
    </>
  )
}

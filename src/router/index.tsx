import { useEffect, useRef, useState } from "react"
import { BsPeopleFill, BsTelephoneFill } from "react-icons/bs"
import { MdCameraAlt, MdHome, MdPerson, MdShield } from "react-icons/md"
import Map, { Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import EmergencyButton from "@/components/EmergencyButton"

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
      <div className="options flex justify-around p-4">
        <div className="option bg-white shadow-md p-4 rounded-lg text-center w-32 flex-1">
          <BsTelephoneFill className="option-icon mb-2 text-3xl text-black" />
          <p className="font-semibold text-[var(--bcp)]">Emergencia</p>
          <p className="text-xs text-gray-500">Números Importantes</p>
        </div>
        <div className="option bg-white shadow-md p-4 rounded-lg text-center w-32 flex-1">
          <BsPeopleFill className="option-icon mb-2 text-3xl text-black" />
          <p className="font-semibold text-[var(--bcp)]">Comunidad</p>
          <p className="text-xs text-gray-500">12 Activos</p>
        </div>
      </div>

      {/* Barra de Navegación Inferior */}
      <footer className="bottom-nav p-2 bg-black text-white">
        <div className="w-[60%] mx-auto flex justify-around">
          <div className="flex flex-col items-center">
            <MdHome className="icon text-2xl" />
            <p className="text-sm">Inicio</p>
          </div>
          <div className="flex flex-col items-center">
            <MdCameraAlt className="icon text-2xl" />
            <p className="text-sm">Reportar</p>
          </div>
          <div className="flex flex-col items-center">
            <MdPerson className="icon text-2xl" />
            <p className="text-sm">Chats</p>
          </div>
        </div>
      </footer>
    </>
  )
}

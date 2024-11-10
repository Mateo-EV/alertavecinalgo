import EmergencyButton from "@/components/EmergencyButton"
import { useQuery } from "@tanstack/react-query"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useRef, useState } from "react"
import { BsPeopleFill, BsTelephoneFill } from "react-icons/bs"
import Map, { Marker } from "react-map-gl"
import { Link, useLocation, useNavigation } from "react-router-dom"
import { axios } from "@/lib/axios"
import { Incident } from "@/type"
import mapboxgl from "mapbox-gl"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

export default function MainPage() {
  const [viewport] = useState({
    latitude: -14.067,
    longitude: -75.728,
    zoom: 14
  })

  const [mapStyle] = useState("mapbox://styles/mapbox/streets-v12")
  const mapRef = useRef<mapboxgl.Map | null>(null)

  const { data: incidents } = useQuery({
    queryKey: ["incidents"],
    queryFn: async () => {
      const response = await axios.get<Incident[]>("/incidents/all")

      return response.data
    }
  })

  const location = useLocation()

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize()
    }
  }, [])

  useEffect(() => {
    const time = setTimeout(() => {
      if (mapRef.current && incidents?.length) {
        const bounds = new mapboxgl.LngLatBounds()

        // Añadir cada incidente al límite del mapa
        incidents.forEach(incident => {
          bounds.extend([incident.location_lon, incident.location_lat])
        })

        // Ajustar el mapa para mostrar todos los incidentes
        mapRef.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 14,
          duration: 2000
        })
      }
    }, 1000)

    return () => {
      clearTimeout(time)
    }
  }, [location])

  useEffect(() => {
    if (mapRef.current && incidents?.length) {
      const bounds = new mapboxgl.LngLatBounds()

      // Añadir cada incidente al límite del mapa
      incidents.forEach(incident => {
        bounds.extend([incident.location_lon, incident.location_lat])
      })

      // Ajustar el mapa para mostrar todos los incidentes
      mapRef.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 14,
        duration: 2000
      })
    }
  }, [incidents])

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
          {incidents?.map(incident => (
            <MapMarker incident={incident} key={incident.id} />
          ))}
        </Map>
      </div>

      {/* Botón de Emergencia */}
      <div className="emergencyButton">
        <EmergencyButton />
      </div>
      {/* Opciones de Emergencia y Comunidad */}
      <div className="options flex justify-center gap-4 p-4">
        {/* Opción de Emergencia (con Link) */}

        <Link
          to="emergency"
          className="option emergency-option bg-white shadow-md p-4 rounded-lg text-center w-40 flex-1 max-w-xs"
        >
          <BsTelephoneFill className="option-icon mb-2 text-3xl text-black" />
          <p className="font-semibold text-[var(--bcp)]">Emergencia</p>
          <p className="text-xs text-gray-500">Números Importantes</p>
        </Link>
        {/* Opción de Comunidad (sin Link) */}

        <Link
          to="community"
          className="option community-option bg-white shadow-md p-4 rounded-lg text-center w-40 flex-1 max-w-xs"
        >
          <BsPeopleFill className="option-icon mb-2 text-3xl text-black" />
          <p className="font-semibold text-[var(--bcp)]">Comunidad</p>
          <p className="text-xs text-gray-500">12 Activos</p>
        </Link>
      </div>
    </>
  )
}

function MapMarker({ incident }: { incident: Incident }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Marker
        key={incident.id}
        latitude={incident.location_lat}
        longitude={incident.location_lon}
        anchor="center"
        onClick={() => setOpen(true)}
      >
        <div
          className={
            incident.incident_type === "robo"
              ? "bg-red-500 w-4 h-4 rounded-full"
              : incident.incident_type === "accidente"
              ? "bg-yellow-500 w-4 h-4 rounded-full"
              : incident.incident_type === "vandalismo"
              ? "bg-purple-500 w-4 h-4 rounded-full"
              : "bg-black w-4 h-4 rounded-full"
          }
        ></div>
        <PopoverTrigger />
      </Marker>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {incident.incident_type}
            </h4>
            <p className="text-sm text-muted-foreground">
              {incident.description}
            </p>
          </div>
          <img src={incident.multimedia} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

import React from "react"
import { MdInfo, MdMap } from "react-icons/md"
import { useNavigate } from "react-router-dom"

interface Center {
  id: number
  name: string
  type: string
  address: string
  latitude: number
  longitude: number
}

const centers: Center[] = [
  {
    id: 1,
    name: "Hospital Regional de Ica",
    type: "Hospital",
    address: "Av. San Martín, Ica",
    latitude: -14.0667,
    longitude: -75.73
  },
  {
    id: 2,
    name: "Estación de Bomberos de Ica",
    type: "Bomberos",
    address: "Av. José Pardo, Ica",
    latitude: -14.07,
    longitude: -75.729
  },
  {
    id: 3,
    name: "Comisaría de Ica",
    type: "Comisaría",
    address: "Calle Bolívar 116, Ica",
    latitude: -14.0705,
    longitude: -75.7302
  },
  {
    id: 4,
    name: "Estación de Policía de La Tinguiña",
    type: "Policía",
    address: "Av. La Tinguiña 101, Ica",
    latitude: -14.0593,
    longitude: -75.725
  },
  {
    id: 5,
    name: "Hospital Santa María del Socorro",
    type: "Hospital",
    address: "Av. San José, Ica",
    latitude: -14.0748,
    longitude: -75.7305
  },
  {
    id: 6,
    name: "Estación de Bomberos de Nazca",
    type: "Bomberos",
    address: "Calle León de Vivero, Nazca",
    latitude: -14.8323,
    longitude: -74.9395
  },
  {
    id: 7,
    name: "Comisaría de Nazca",
    type: "Comisaría",
    address: "Av. Huaylas, Nazca",
    latitude: -14.8345,
    longitude: -74.939
  }
]

export default function HelpCenterPage() {
  const navigate = useNavigate()

  const handleMapClick = (center: Center) => {
    // Redirigir a la página del mapa con las coordenadas del centro de ayuda
    navigate(
      `/emergency/help-center/map?lat=${center.latitude}&lng=${
        center.longitude
      }&name=${encodeURIComponent(center.name)}`
    )
  }

  return (
    <div className="p-5 bg-gray-100">
      <h2 className="text-2xl font-bold mb-5 text-[var(--color-princi)]">
        Centros de Ayuda
      </h2>
      <div className="flex flex-col gap-5">
        {centers.map(center => (
          <div key={center.id} className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-[var(--color-princi)]">
              {center.name}
            </h3>
            <p className="text-sm text-gray-600">{center.type}</p>
            <p className="text-sm text-gray-600">{center.address}</p>
            <div className="flex gap-3 mt-3">
              <button
                className="flex items-center px-3 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => handleMapClick(center)}
              >
                <MdMap className="mr-2 text-lg" />
                Ver en Mapa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

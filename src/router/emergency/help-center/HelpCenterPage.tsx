import React from "react";
import { MdInfo, MdMap } from "react-icons/md";

interface Center {
  id: number;
  name: string;
  type: string;
  address: string;
}

const centers: Center[] = [
  {
    id: 1,
    name: "Hospital Nacional Dos de Mayo",
    type: "Hospital",
    address: "Av. Grau 13, Cercado de Lima",
  },
  {
    id: 2,
    name: "Clínica San Pablo",
    type: "Clínica Privada",
    address: "Av. El Polo 759, Santiago de Surco",
  },
  {
    id: 3,
    name: "Centro de Salud Mental Comunitario",
    type: "Salud Mental",
    address: "Jr. Camaná 618, Cercado de Lima",
  },
  {
    id: 4,
    name: "Cruz Roja Peruana",
    type: "Ayuda Humanitaria",
    address: "Av. Angamos 1288, Lince",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-5 text-[var(--color-princi)]">Centros de Ayuda</h2>
      <div className="flex flex-col gap-5">
        {centers.map((center) => (
          <div
            key={center.id}
            className="bg-white rounded-lg p-4 shadow-md"
          >
            <h3 className="text-lg font-semibold text-[var(--color-princi)]">{center.name}</h3>
            <p className="text-sm text-gray-600">{center.type}</p>
            <p className="text-sm text-gray-600">{center.address}</p>
            <div className="flex gap-3 mt-3">
              <button className="flex items-center px-3 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">
                <MdMap className="mr-2 text-lg" />
                Ver en Mapa
              </button>
              <button className="flex items-center px-3 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">
                <MdInfo className="mr-2 text-lg" />
                Más info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

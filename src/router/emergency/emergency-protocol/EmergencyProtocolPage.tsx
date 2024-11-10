import React, { useState } from "react";
import { FaFireAlt, FaShieldAlt } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { RiEarthquakeFill } from "react-icons/ri";

export default function EmergencyProtocol() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-4 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Protocolos de Emergencia</h1>

      {/* Información del Hospital */}
      <div className="flex items-center gap-3 mb-6">
        <MdWarning className="text-2xl text-gray-700" />
        <h2 className="text-lg font-semibold">Hospital Nacional Dos de Mayo</h2>
      </div>

      {/* Protocolo de Incendio */}
      <div
        className="border-b py-3 cursor-pointer flex items-center gap-3"
        onClick={() => toggleOpen(0)}
      >
        <FaFireAlt className="text-2xl text-gray-700" />
        <span className="flex-1 font-medium">En caso de Incendio</span>
        <span>{openIndex === 0 ? "▲" : "▼"}</span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openIndex === 0 ? "max-h-40 p-4" : "max-h-0 p-0"
        }`}
      >
        <p className="text-sm text-gray-700">
          - Evacue el área inmediatamente siguiendo las señales de evacuación.
          <br />
          - No utilice los ascensores.
          <br />
          - Llame al número de emergencia 116 para informar del incendio.
        </p>
      </div>

      {/* Protocolo de Terremoto */}
      <div
        className="border-b py-3 cursor-pointer flex items-center gap-3"
        onClick={() => toggleOpen(1)}
      >
        <RiEarthquakeFill className="text-2xl text-gray-700" />
        <span className="flex-1 font-medium">En caso de Terremoto</span>
        <span>{openIndex === 1 ? "▲" : "▼"}</span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openIndex === 1 ? "max-h-40 p-4" : "max-h-0 p-0"
        }`}
      >
        <p className="text-sm text-gray-700">
          - Manténgase alejado de ventanas y objetos que puedan caer.
          <br />
          - Agáchese, cúbrase y sujétese.
          <br />
          - Espere hasta que el temblor termine antes de evacuar.
        </p>
      </div>

      {/* Protocolo de Robo */}
      <div
        className="border-b py-3 cursor-pointer flex items-center gap-3"
        onClick={() => toggleOpen(2)}
      >
        <FaShieldAlt className="text-2xl text-gray-700" />
        <span className="flex-1 font-medium">En caso de Robo</span>
        <span>{openIndex === 2 ? "▲" : "▼"}</span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openIndex === 2 ? "max-h-40 p-4" : "max-h-0 p-0"
        }`}
      >
        <p className="text-sm text-gray-700">
          - Mantenga la calma y no confronte al ladrón.
          <br />
          - Llame al número de emergencia 105 tan pronto como sea seguro hacerlo.
          <br />
          - Proporcione una descripción clara del sospechoso.
        </p>
      </div>
    </div>
  );
}

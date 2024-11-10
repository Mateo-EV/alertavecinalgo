import React from "react";
import { Link } from "react-router-dom";
import { MdLocalPhone, MdWarning } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function EmergencyHomePage() {
  return (
    <div className="p-5 bg-gray-100">
      <h2 className="text-2xl font-bold mb-5 text-[var(--color-princi)]">Emergencia</h2>
      <div className="flex flex-col gap-5">
        <Link
          to="emergency-numbers"
          className="flex items-center gap-3 p-4 border rounded-md shadow-sm hover:bg-gray-100 text-gray-800"
        >
          <MdLocalPhone className="text-2xl" />
          <span className="text-lg">Números de Emergencia</span>
        </Link>

        <Link
          to="help-center"
          className="flex items-center gap-3 p-4 border rounded-md shadow-sm hover:bg-gray-100 text-gray-800"
        >
          <FaMapMarkedAlt className="text-2xl" />
          <span className="text-lg">Centros de Ayuda</span>
        </Link>

        <Link
          to="emergency-protocol"
          className="flex items-center gap-3 p-4 border rounded-md shadow-sm hover:bg-gray-100 text-gray-800"
        >
          <MdWarning className="text-2xl" />
          <span className="text-lg">Protocolo de Emergencia</span>
        </Link>
      </div>
    </div>
  );
}

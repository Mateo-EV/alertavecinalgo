import { useState } from "react"
import { MdCameraAlt, MdClose, MdHome, MdPerson } from "react-icons/md"
import { BsTelephoneFill, BsPeopleFill } from "react-icons/bs"
import { Link } from "react-router-dom"

type SidebarProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen
}: SidebarProps) {
  return (
    <div
      className={`sidebar bg-black text-white fixed top-0 left-0 h-full w-64 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <button
        className="close-btn p-4 text-white"
        onClick={() => setIsSidebarOpen(false)}
      >
        <MdClose className="text-2xl" />
      </button>
      <div className="sidebar-content p-4">
        <h2 className="text-lg font-bold mb-4">Menú</h2>
        <ul>
          <li className="mb-4 flex items-center">
            <MdPerson className="text-xl mr-2" /> Perfil
          </li>
          <li className="mb-4 flex items-center">
            <Link to=".">
              <MdHome className="text-xl mr-2" /> Inicio
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <MdCameraAlt className="text-xl mr-2" /> Reportes
          </li>
          <li className="mb-4 flex items-center">
            <Link to="emergency">
              <BsTelephoneFill className="text-xl mr-2" /> Emergencia
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <BsPeopleFill className="text-xl mr-2" /> Comunidad
          </li>
        </ul>
      </div>
    </div>
  )
}

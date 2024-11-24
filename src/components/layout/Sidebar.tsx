import React, { useCallback } from "react"
import { FaNewspaper, FaWalking } from "react-icons/fa"
import { MdClose, MdPerson } from "react-icons/md"
import { Link } from "react-router-dom"

type SidebarProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = React.memo(
  ({ isSidebarOpen, setIsSidebarOpen }) => {
    const handleCloseSidebar = useCallback(() => {
      setIsSidebarOpen(false)
    }, [setIsSidebarOpen])

    return (
      <>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCloseSidebar}
            aria-hidden="true"
          />
        )}

        <div
          className={`sidebar bg-white text-[var(--color-princi)] fixed top-0 left-0 h-full w-64 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
          role="navigation"
          aria-hidden={!isSidebarOpen}
        >
          <button
            className="close-btn p-4 text-[var(--color-princi)]"
            onClick={handleCloseSidebar}
            aria-label="Cerrar menú"
          >
            <MdClose className="text-2xl" />
          </button>
          <div className="sidebar-content p-4">
            <h2 className="text-lg font-bold mb-6">Menú</h2>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4 pl-4 w-full">
                <Link
                  to="/profile"
                  onClick={handleCloseSidebar}
                  className="flex items-center gap-4 w-full"
                >
                  <MdPerson className="text-xl" />
                  <span className="flex-1">Perfil</span>
                </Link>
              </li>
              <li className="flex items-center gap-4 pl-4 w-full">
                <Link
                  to="/alerts"
                  onClick={handleCloseSidebar}
                  className="flex items-center gap-4 w-full"
                >
                  <FaNewspaper className="text-xl" />
                  <span className="flex-1">Noticias</span>
                </Link>
              </li>
              <li className="flex items-center gap-4 pl-4 w-full">
                <Link
                  to="/secure-path"
                  onClick={handleCloseSidebar}
                  className="flex items-center gap-4 w-full"
                >
                  <FaWalking className="text-xl" />
                  <span className="flex-1">Recorrido Seguro</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }
)

export default Sidebar

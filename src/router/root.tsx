import Navbar from "@/components/layout/Navbar"
import { useAuth } from "@/providers/AuthProvider"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function RootLayout() {
  const { session } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) {
      navigate("/register", { viewTransition: true })
    }
  }, [session])

  if (!session) return null

  return (
    <div className="app-container bg-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  )
}

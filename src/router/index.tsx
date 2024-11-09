import { useAuth } from "@/providers/AuthProvider"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function MainPage() {
  const { session } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) {
      navigate("/login")
    }
  }, [session])

  if (!session) return null

  return <div>MainPage</div>
}

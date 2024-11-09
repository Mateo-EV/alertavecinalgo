import { useAuth } from "@/providers/AuthProvider"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function MainPage() {
  const { session, logOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) {
      navigate("/register", { viewTransition: true })
    }
  }, [session])

  if (!session) return null

  return <div onClick={logOut}>MainPage</div>
}

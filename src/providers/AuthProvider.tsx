import { createContext, useContext, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { load } from "@tauri-apps/plugin-store"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { axios } from "@/lib/axios"

export type Session = {
  id: string
  first_name: string
  last_name: string
  dni: string
  phone: string
  address: string
  email: string
}

type AuthContextProps = {
  session: Session | null
  accessToken: string
  setSession: (session: Session | null) => void
  setAccessToken: (accessToken: string | null) => void
  logOut: () => void
}

const AuthContext = createContext<AuthContextProps>(null)

export default function AuthProvider({ children }) {
  const [session, setSession] = useState<Session | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const { isPending } = useQuery({
    queryKey: ["req-profile"],
    queryFn: async () => {
      try {
        const store = await load("store.json", { autoSave: false })
        const access_token = (await store.get("auth-token")) as string

        if (!access_token) return

        setAccessToken(access_token)
        const { data } = await axios.get<Session>("auth/profile", {
          headers: { Authorization: `Bearer ${access_token}` }
        })

        setSession(data)
      } catch (error) {
        console.log(error)
        setAccessToken(null)
        setSession(null)
      }

      return null
    },
    staleTime: 0,
    gcTime: 0
  })

  if (isPending) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <LoadingSpinner className="size-20" />
      </div>
    )
  }

  const logOut = async () => {
    try {
      const store = await load("store.json", { autoSave: false })
      store.delete("auth-token")
      setSession(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ session, setSession, logOut, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

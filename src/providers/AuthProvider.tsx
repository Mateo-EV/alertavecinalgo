import { createContext, useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
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
  refetch: () => void
}

const AuthContext = createContext<AuthContextProps>(null!)

export default function AuthProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [session, setSession] = useState<Session | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const queryClient = useQueryClient()

  const { isPending, refetch } = useQuery({
    queryKey: ["req-profile"],
    queryFn: async () => {
      try {
        const access_token = localStorage.getItem("access_token")

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
      localStorage.removeItem("access_token")
      setSession(null)
      queryClient.clear()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        logOut,
        accessToken: accessToken ?? "",
        setAccessToken,
        refetch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

import { createContext, useContext, useState } from "react"

type Session = {
  id: string
  name: string
}

type AuthContextProps = {
  session: Session | null
  setSession: (session: Session) => void
}

const AuthContext = createContext<AuthContextProps>(null)

export default function AuthProvider({ children }) {
  const [session, setSession] = useState<Session>(null)

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

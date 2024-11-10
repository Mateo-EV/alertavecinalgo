import { axios } from "@/lib/axios"
import { useAuth } from "@/providers/AuthProvider"
import { Group } from "@/type"
import { useQuery } from "@tanstack/react-query"

export function useGroups() {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<Group[]>("/group", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        return data
      } catch (error) {
        return null
      }
    }
  })
}

export function useIsUserInEmergency() {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ["user_in_emergency"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<boolean>("/emergency", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        return data
      } catch (error) {
        return null
      }
    }
  })
}

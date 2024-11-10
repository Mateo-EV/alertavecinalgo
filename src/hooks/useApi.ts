import { axios } from "@/lib/axios"
import { useAuth } from "@/providers/AuthProvider"
import { Alert, Group, GroupMessage, GroupUser, User } from "@/type"
import { useQuery } from "@tanstack/react-query"

export type GroupsReponse = Array<
  Group & {
    groupMessage: [GroupMessage]
    alerts: [Alert]
    _count: { groupUsers: number }
  }
>

export function useGroups() {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<GroupsReponse>("/group", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        return data
      } catch (error) {
        return null
      }
    },
    refetchInterval: 1000,
    staleTime: 0,
    gcTime: 0
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

export type GroupResponseUnique = Group & {
  groupMessage: Array<GroupMessage & { user: User }>
  groupUser: Array<GroupUser & { user: User }>
  alerts: Array<Alert & { user: User }>
}

export function useGroupById(groupId: string) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ["unique-group", groupId],
    queryFn: async () => {
      try {
        const { data } = await axios.get<GroupResponseUnique>(
          `/group/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        return data
      } catch (error) {
        return null
      }
    }
  })
}

export function useUsers() {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<User[]>(`/users`, {
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

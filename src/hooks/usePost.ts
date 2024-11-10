import { axios } from "@/lib/axios"
import { useAuth } from "@/providers/AuthProvider"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useTriggerEmergencyAlert() {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  const queryKey = ["user_in_emergency"]
  // const { latitute, longitude } = useGeolocation()

  return useMutation({
    mutationFn: async () => {
      await axios.post(
        "/emergency/alert",
        {
          locationLat: -14.083723,
          locationLon: -75.742533
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })

      queryClient.setQueryData(queryKey, true)
    },
    onError: () => {
      queryClient.setQueryData(queryKey, false)
    }
  })
}

export function useCancelEmergencyAlert() {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  const queryKey = ["user_in_emergency"]

  return useMutation({
    mutationFn: async () => {
      await axios.post(
        "/emergency/cancel",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })

      queryClient.setQueryData(queryKey, false)
    },
    onError: () => {
      queryClient.setQueryData(queryKey, true)
    }
  })
}

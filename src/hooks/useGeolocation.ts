import { useQuery } from "@tanstack/react-query"
import { getCurrentPosition } from "@tauri-apps/plugin-geolocation"

export function useGeolocation() {
  const { data, error } = useQuery({
    queryKey: ["geolocalization"],
    queryFn: async () => {
      const position = await getCurrentPosition()

      if (!position) return null

      return {
        latitute: position.coords.latitude,
        longitude: position.coords.longitude
      }
    }
  })

  console.log(error)

  return data
}

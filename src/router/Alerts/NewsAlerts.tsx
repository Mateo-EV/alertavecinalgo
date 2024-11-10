import { Skeleton } from "@/components/ui/skeleton"
import { axios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { ArrowRightIcon, CalendarIcon, XCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"

type NewsAlert = {
  id: string
  title: string
  content: string
  timestamp: string
  category: "seguridad" | "alerta" | "comunidad"
  image?: string
}

// Función para obtener la clase de categoría
const getCategoryClass = (category: NewsAlert["category"]) => {
  const classes = {
    seguridad: "bg-blue-600/20 text-blue-600",
    alerta: "bg-red-600/20 text-red-600",
    comunidad: "bg-gray-600/20 text-gray-600"
  }
  return classes[category] || "bg-gray-600/20 text-gray-600"
}

export default function NewsAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<NewsAlert | null>(null)

  const { data: newsAlerts, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await axios.get<NewsAlert[]>("/security_info/news")

      return response.data
    }
  })

  const openModal = (alert: NewsAlert) => {
    setSelectedAlert(alert)
  }

  const closeModal = () => {
    setSelectedAlert(null)
  }

  return (
    <div className="p-6 space-y-6 text-[var(--color-princi)]">
      <h2 className="text-3xl font-bold mb-6">Noticias y Alertas</h2>
      {isLoading ? (
        <Skeleton className="w-full h-[calc(100vh-18rem)]" />
      ) : newsAlerts?.length === 0 ? (
        <p>No hay noticias disponibles.</p>
      ) : (
        newsAlerts.map(alert => (
          <div
            key={alert.id}
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{alert.title}</h3>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${getCategoryClass(
                  alert.category
                )}`}
              >
                {alert.category}
              </span>
            </div>
            <p className="text-base mt-3">{alert.content}</p>
            <div className="flex justify-between items-center mt-5">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 w-5 h-5" />
                <span className="text-sm">
                  {new Date(alert.timestamp).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => openModal(alert)}
                className="flex items-center text-blue-500 hover:text-blue-400 transition-colors"
              >
                Leer más <ArrowRightIcon className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-semibold">{selectedAlert.title}</h3>
              <button onClick={closeModal}>
                <XCircleIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {new Date(selectedAlert.timestamp).toLocaleDateString()}
            </p>
            {selectedAlert.image && (
              <img
                src={selectedAlert.image}
                alt={selectedAlert.title}
                className="w-full rounded-lg mb-4"
              />
            )}
            <p className="text-base text-gray-700">{selectedAlert.content}</p>
          </div>
        </div>
      )}
    </div>
  )
}

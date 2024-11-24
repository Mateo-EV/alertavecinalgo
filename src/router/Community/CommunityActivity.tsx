import { useState } from "react"

export default function CommunityActivity() {
  const [postContent, setPostContent] = useState("")
  const [posts, setPosts] = useState<string[]>([
    "María López: Organizando patrulla vecinal para esta noche. ¿Quién se une?",
    "Juan Pérez: Instalé cámaras de seguridad, si alguien necesita ayuda con la instalación, avísenme.",
    "Ana García: Recordatorio de la reunión vecinal mañana a las 19:00 en el parque."
  ])

  const handlePost = () => {
    if (postContent.trim() !== "") {
      setPosts([postContent, ...posts])
      setPostContent("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Publicar Actualización
        </h2>
        <textarea
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
          className="w-full p-3 border rounded-md bg-white text-gray-800 placeholder-gray-500"
          placeholder="Comparte noticias o preocupaciones con vecinos..."
        ></textarea>
        <button
          onClick={handlePost}
          className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Publicar
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Actividad Reciente
        </h2>
        <div className="space-y-3 text-gray-700">
          {posts.map((post, index) => (
            <p key={index}>{post}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

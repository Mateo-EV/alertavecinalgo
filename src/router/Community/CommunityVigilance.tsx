import ImageVideoGif1 from "@/assets/home-assistant-camara-seguridad-video.gif"
import ImageVideoGif2 from "@/assets/2km-Long-Range-Night-Vision-Security-Camera.avif"
import ImageVideoGif3 from "@/assets/1637689280_111450_1637689557_noticia_normal.jpg"

const cameras = [ImageVideoGif1, ImageVideoGif2, ImageVideoGif3]

export default function CommunityVigilance() {
  return (
    <div className="space-y-6">
      {cameras.map((image, index) => (
        <div className="bg-white shadow-lg rounded-lg p-6" key={index}>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Cámara {index + 1}
          </h2>
          <div className="rounded-md overflow-hidden">
            <img src={image} className="w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

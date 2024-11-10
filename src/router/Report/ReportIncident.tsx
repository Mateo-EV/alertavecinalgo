import { Button, SubmitButton } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  FormCompleteProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import useForm from "@/hooks/useForm"
import { axios } from "@/lib/axios"
import { useAuth } from "@/providers/AuthProvider"
import { Incident } from "@/type"
import { useQueryClient } from "@tanstack/react-query"
import { sendNotification } from "@tauri-apps/plugin-notification"
import { CameraIcon, SendIcon, Upload, XIcon } from "lucide-react"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  incident_type: z.string().min(1, {
    message: "Por favor selecciona un tipo de incidente."
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres."
  })
})

function dataURLToFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(",")
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg"
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export default function ReportIncident() {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { accessToken } = useAuth()
  const navigate = useNavigate()
  const queryUtils = useQueryClient()
  const form = useForm({
    schema: formSchema,
    defaultValues: {
      description: "",
      incident_type: ""
    },
    onSubmit: async ({ description, incident_type }) => {
      try {
        const formData = new FormData()
        formData.append("description", description)
        formData.append("incident_type", incident_type)
        formData.append("location_lat", "-14.083723")
        formData.append("location_lon", "-75.742533")
        formData.append("file", file)

        const response = await axios.post<Incident>(
          "/incidents/register",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        queryUtils.setQueryData<Incident[]>(["incidents"], prev => {
          if (!prev) return
          return [...prev, response.data]
        })

        toast.success("Incidencia creada correctamente")

        sendNotification({
          title: response.data.incident_type,
          body: response.data.description,
          attachments: [{ id: response.data.id, url: response.data.multimedia }]
        })
        navigate("/")
      } catch (error) {
        toast.error("Algo salió mal")
      }
    }
  })

  const handleCameraAccess = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.log(error)

      toast.error(
        "No se pudo acceder a la cámara. Por favor, verifica los permisos."
      )
    }
  }

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg")
        const file = dataURLToFile(imageDataUrl, "captured_image.jpg")
        setImage(imageDataUrl)
        setFile(file)
        stopCamera()
      }
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <FormCompleteProvider {...form} className="p-6 space-y-6 max-w-2xl mx-auto">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-[var(--color-princi)]">
            Capturar Imagen
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Incident"
                className="w-full h-48 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => {
                  setImage(null)
                  setFile(null)
                }}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ) : stream ? (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                className="w-full h-48 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="secondary"
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                onClick={handleCapture}
              >
                Capturar
              </Button>
            </div>
          ) : (
            <>
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleCameraAccess}
              >
                <CameraIcon className="mr-2 h-4 w-4" />
                Abrir Cámara
              </Button>
              <div className="flex items-center justify-center w-full">
                <Label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Haz clic para subir</span>{" "}
                      o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG o GIF (MAX. 5MB)
                    </p>
                  </div>
                  <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </Label>
              </div>
            </>
          )}
          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
            width="640"
            height="480"
          />
        </CardContent>
      </Card>

      <Card className="bg-white ">
        <CardHeader>
          <CardTitle className="text-[var(--color-princi)]">
            Detalles del Incidente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="incident_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--color-princi)]">
                  Tipo de Incidente
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white text-[var(--color-princi)]">
                      <SelectValue placeholder="Selecciona el tipo de incidente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white text-[var(--color-princi)]">
                    <SelectItem value="robo">Robo</SelectItem>
                    <SelectItem value="accidente">Accidente</SelectItem>
                    <SelectItem value="vandalismo">Vandalismo</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--color-princi)]">
                  Descripción
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe el incidente con el mayor detalle posible"
                    className="bg-white text-[var(--color-princi)] transition-shadow"
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          <SubmitButton
            isSubmitting={form.formState.isSubmitting}
            type="submit"
            className="w-full"
            variant="secondary"
          >
            <SendIcon className="mr-2 h-4 w-4" />
            Enviar Reporte
          </SubmitButton>
        </CardFooter>
      </Card>
    </FormCompleteProvider>
  )
}

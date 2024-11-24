import { Button } from "@/components/ui/button"
import { DateTimePicker } from "@/components/ui/datetime-picker"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import {
  FormCompleteProvider,
  FormControl,
  FormField,
  FormInputController,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import useForm from "@/hooks/useForm"
import { es } from "date-fns/locale"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

type Event = { name: string; fecha: Date }

function convertToDate(dateString: string) {
  const [datePart, timePart] = dateString.split(", ")
  const [day, month, year] = datePart.split("/").map(Number)
  const [hours, minutes] = timePart.split(":").map(Number)
  return new Date(year, month - 1, day, hours, minutes)
}

function formatDateToString(date: Date) {
  const pad = (num: any) => String(num).padStart(2, "0")

  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1)
  const year = date.getFullYear()
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  return `${day}/${month}/${year}, ${hours}:${minutes}`
}

export default function CommunityEvents() {
  const [events, setEvents] = useState<Event[]>([
    { name: "Vigilancia Vecinal", fecha: convertToDate("15/12/2023, 19:00") },
    {
      name: "Taller de Prevención de Robos",
      fecha: convertToDate("20/12/2023, 18:00")
    },
    {
      name: "Simulacro de Emergencia",
      fecha: convertToDate("25/12/2023, 10:00")
    }
  ])

  function createEvent(event: Event) {
    setEvents(prev => [event, ...prev])
  }

  return (
    <div className="space-y-6">
      <CreateEventModal createEvent={createEvent} />
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Próximos Eventos
        </h2>
        <ul className="space-y-3 text-gray-700">
          {events.map(({ name, fecha }) => (
            <li key={name}>
              {name} - {formatDateToString(fecha)}
            </li>
          ))}
        </ul>
      </div>
      {events.map(({ name, fecha }) => (
        <CommunityEvent key={name} name={name} fecha={fecha} />
      ))}
    </div>
  )
}

const createEventSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  fecha: z.date({ message: "La fecha y hora es obligatoria" })
})

function CreateEventModal({
  createEvent
}: {
  createEvent: (event: Event) => void
}) {
  const form = useForm({
    schema: createEventSchema,
    onFastSubmit: event => {
      createEvent(event)
      toast.success("Evento creado con éxito")
      setIsOpen(false)
    },
    defaultValues: { name: "" }
  })

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer onOpenChange={setIsOpen} open={isOpen}>
      <DrawerTrigger asChild>
        <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
          + Crear Evento
        </button>
      </DrawerTrigger>
      <DrawerContent className="px-6 pb-6 bg-white">
        <DrawerHeader>
          <DrawerTitle className="text-[var(--color-princi)]">
            Crear nuevo evento
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <FormCompleteProvider {...form}>
            <FormInputController
              control={form.control}
              name="name"
              label="Nombre"
              classNameLabel="text-[var(--color-princi)]"
              input={{ className: "bg-white text-[var(--color-princi)]" }}
            />
            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-[var(--color-princi)]">
                    Seleccionar fecha
                  </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      locale={es}
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full bg-white text-[var(--color-princi)]"
                      hourCycle={12}
                      granularity="minute"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="secondary">Crear</Button>
          </FormCompleteProvider>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function CommunityEvent({ name, fecha }: Event) {
  const [joined, setJoined] = useState(false)

  const handleJoinPatrol = () => {
    setJoined(true)
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{name}</h2>
      <p className="text-gray-700">{formatDateToString(fecha)}</p>

      <button
        onClick={handleJoinPatrol}
        disabled={joined}
        className={`mt-4 px-4 py-2 rounded-md transition-colors ${
          joined
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {joined ? "Ya te has unido" : "Unirte"}
      </button>
    </div>
  )
}

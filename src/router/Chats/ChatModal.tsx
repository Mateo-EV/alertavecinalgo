import { MultiSelect } from "@/components/MultiSelect"
import { Button, SubmitButton } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  FormCompleteProvider,
  FormControl,
  FormDescription,
  FormField,
  FormInputController,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Skeleton } from "@/components/ui/skeleton"
import { useUsers } from "@/hooks/useApi"
import useForm from "@/hooks/useForm"
import { axios } from "@/lib/axios"
import { useAuth } from "@/providers/AuthProvider"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

const groupCreateSchema = z.object({
  groupName: z.string().min(1, "El nombre es requerido."),
  userIds: z.array(z.string()).min(2, "Debe haber al menos dos usuarios"),
  description: z.string().optional()
})

export default function ChatModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Grupo</DialogTitle>
        </DialogHeader>
        <CreateGroupForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}

function CreateGroupForm({ setIsOpen }) {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()
  const form = useForm({
    schema: groupCreateSchema,
    onSubmit: async values => {
      try {
        const { data: newGroup } = await axios.post("/group/create", values, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        queryClient.setQueryData(["groups"], prev => {
          console.log(newGroup, prev)

          if (!prev) return

          return [newGroup, ...(prev as [])]
        })

        toast.success("Grupo creado correctamente")
        setIsOpen(false)
      } catch (error) {
        toast.error("Algo salió mal")
      }
    },
    defaultValues: {
      userIds: [],
      groupName: "",
      description: ""
    }
  })

  const { data: users, isLoading } = useUsers()

  return (
    <FormCompleteProvider {...form}>
      <FormInputController
        control={form.control}
        name="groupName"
        label="Nombre"
      />
      {isLoading ? (
        <Skeleton className="h-20 w-full rounded-lg" />
      ) : (
        <FormField
          control={form.control}
          name="userIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seleccionar Usuarios</FormLabel>
              <FormControl>
                <MultiSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={
                    users.map(user => ({
                      id: user.id,
                      name: user.first_name
                    })) ?? []
                  }
                />
              </FormControl>
              <FormDescription>
                Debe seleccionar al menos dos usuarios.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormInputController
        control={form.control}
        name="description"
        label="Descripción"
      />
      <SubmitButton isSubmitting={form.formState.isSubmitting}>
        Crear
      </SubmitButton>
    </FormCompleteProvider>
  )
}

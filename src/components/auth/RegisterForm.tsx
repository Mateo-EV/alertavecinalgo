import { SubmitButton } from "@/components/ui/button"
import { FormCompleteProvider, FormInputController } from "@/components/ui/form"
import useForm from "@/hooks/useForm"
import { axios } from "@/lib/axios"
import { registerSchema } from "@/lib/validator/auth"
import { isAxiosError } from "axios"
import { useNavigate, useNavigation } from "react-router-dom"
import { toast } from "sonner"

export default function RegisterForm() {
  const { state } = useNavigation()
  const navigate = useNavigate()
  const form = useForm({
    schema: registerSchema,
    defaultValues: {
      dni: "",
      password: "",
      phone: "",
      address: "",
      confirmedPassword: "",
      email: "",
      first_name: "",
      last_name: ""
    },
    onSubmit: async values => {
      try {
        const response = await axios.post("/auth/register", values)
        localStorage.setItem("isNewUser", "true")
        if (response.data) {
          navigate("/login")
        }
        toast.success("Registrado exitosamente")
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message ?? "Algo salió mal")
        } else {
          toast.error("Algo salió mal")
        }
      }
    }
  })

  return (
    <FormCompleteProvider {...form}>
      <FormInputController
        control={form.control}
        label="Documento Nacional de Identidad"
        name="dni"
        input={{ placeholder: "12345678" }}
      />
      <FormInputController
        control={form.control}
        label="Nombre"
        name="first_name"
        input={{ placeholder: "José" }}
      />
      <FormInputController
        control={form.control}
        label="Apellido"
        name="last_name"
        input={{ placeholder: "Pérez" }}
      />
      <FormInputController
        control={form.control}
        label="Contraseña"
        name="password"
        input={{ placeholder: "********", type: "password" }}
      />
      <FormInputController
        control={form.control}
        label="Confirmar Contraseña"
        name="confirmedPassword"
        input={{ placeholder: "********", type: "password" }}
      />
      <FormInputController
        control={form.control}
        label="Email"
        name="email"
        input={{ placeholder: "jose@example.com" }}
      />
      <FormInputController
        control={form.control}
        label="Teléfono"
        name="phone"
        input={{ placeholder: "987654321" }}
      />
      <FormInputController
        control={form.control}
        label="Dirección"
        name="address"
        input={{ placeholder: "Av. Example 123" }}
      />
      <SubmitButton
        isSubmitting={form.formState.isSubmitting || state === "loading"}
        className="mt-2 w-full"
      >
        Ingresar
      </SubmitButton>
    </FormCompleteProvider>
  )
}

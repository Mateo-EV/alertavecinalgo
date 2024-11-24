import { SubmitButton } from "@/components/ui/button"
import { FormCompleteProvider, FormInputController } from "@/components/ui/form"
import useForm from "@/hooks/useForm"
import { axios } from "@/lib/axios"
import { loginSchema } from "@/lib/validator/auth"
import { Session, useAuth } from "@/providers/AuthProvider"
import { isAxiosError } from "axios"
import { useNavigation } from "react-router-dom"
import { toast } from "sonner"

export default function LoginForm() {
  const { setSession, setAccessToken, refetch } = useAuth()
  const { state } = useNavigation()
  const form = useForm({
    schema: loginSchema,
    defaultValues: {
      dni: "",
      password: ""
    },
    onSubmit: async values => {
      try {
        const {
          data: { access_token, session }
        } = await axios.post<{ access_token: string; session: Session }>(
          "/auth/login",
          values
        )

        localStorage.setItem("access_token", access_token)

        setSession(session)
        setAccessToken(access_token)
        toast.success("Registrado exitosamente")
        refetch()
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
      />
      <FormInputController
        control={form.control}
        label="Contraseña"
        name="password"
        input={{ type: "password" }}
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

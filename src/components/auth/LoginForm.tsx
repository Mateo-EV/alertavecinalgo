import { SubmitButton } from "@/components/ui/button"
import { FormCompleteProvider, FormInputController } from "@/components/ui/form"
import useForm from "@/hooks/useForm"
import { z } from "zod"

export default function LoginForm() {
  const form = useForm({
    schema: z.object({ code: z.string(), password: z.string() }),
    defaultValues: {
      code: "",
      password: ""
    },
    onSubmit: () => {
      console.log("values")
    }
  })

  return (
    <FormCompleteProvider {...form}>
      <FormInputController
        control={form.control}
        label="Código"
        name="code"
        input={{ placeholder: "U000000" }}
      />
      <FormInputController
        control={form.control}
        label="Contraseña"
        name="password"
        input={{ placeholder: "***********", type: "password" }}
      />
      <SubmitButton
        isSubmitting={form.formState.isSubmitting}
        className="mt-2 w-full"
      >
        Ingresar
      </SubmitButton>
    </FormCompleteProvider>
  )
}

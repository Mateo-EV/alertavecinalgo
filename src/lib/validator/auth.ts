import { z } from "zod"

const dniRegex = new RegExp(/^[0-9]{8}$/)
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const loginSchema = z.object({
  dni: z.string().min(1, "El dni es obligatorio"),
  password: z.string()
})

export const registerSchema = z
  .object({
    dni: z
      .string()
      .refine(
        dni => dniRegex.test(dni),
        "El dni debe ser de 8 dígitos numéricos."
      ),
    first_name: z.string().min(1, "El nombre es obligatorio"),
    last_name: z.string().min(1, "El apellido es obligatorio"),
    phone: z.string().regex(phoneRegex, "El teléfono es inválido"),
    address: z
      .string()
      .min(10, "La dirección debe tener al menos 10 caracteres"),
    email: z.string().email("El email es inválido"),
    password: z
      .string()
      .min(1, "La contraseña es obligatoria")
      .min(8, "La contraseña debe tener como mínimo 8 caracteres"),
    confirmedPassword: z
      .string()
      .min(1, "La confirmación de la contraseña es obligatoria")
  })
  .refine(({ confirmedPassword, password }) => password === confirmedPassword, {
    message: "Las contraseñas deben ser iguales",
    path: ["confirmedPassword"]
  })

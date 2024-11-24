import RegisterForm from "@/components/auth/RegisterForm"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function RegisterPage() {
  return (
    <div className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Regístrate</CardTitle>
        <CardDescription>
          Ingresa tus datos para crear tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <div className="text-center text-sm w-full">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="underline">
            Inicia Sesión
          </Link>
        </div>
      </CardFooter>
    </div>
  )
}

import { useAuth } from "@/providers/AuthProvider"
import { useState } from "react"
import { MdPhotoCamera } from "react-icons/md"

export default function UserProfile() {
  const { session, logOut } = useAuth()
  const [name, setName] = useState(
    session?.first_name + " " + session?.last_name
  )
  const [email, setEmail] = useState(session?.email)
  const [phone, setPhone] = useState(session?.phone)
  const [address, setAddress] = useState(session?.address)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [smsNotifications, setSmsNotifications] = useState(false)

  return (
    <div className="p-6 space-y-6 text-[var(--color-princi)]">
      {/* Card para Perfil de Usuario */}
      <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-semibold mb-2">Perfil de Usuario</h2>
        <p className="text-sm text-gray-400 mb-4">
          Administra tu información personal y preferencias
        </p>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <MdPhotoCamera className="text-3xl text-[var(--color-princi)]" />
          </div>
          <button className="mt-2 px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
            Cambiar Foto
          </button>
        </div>

        <div className="space-y-4">
          {[
            { label: "Nombre Completo", value: name, setValue: setName },
            {
              label: "Correo Electrónico",
              value: email,
              setValue: setEmail,
              type: "email"
            },
            { label: "Teléfono", value: phone, setValue: setPhone },
            { label: "Dirección", value: address, setValue: setAddress }
          ].map(({ label, value, setValue, type = "text" }, index) => (
            <div key={index}>
              <label className="block text-sm font-medium">{label}</label>
              <input
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                className="w-full p-2 border rounded-md bg-white/10 backdrop-blur-sm"
                placeholder={`Ingresa tu ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Card para Notificaciones */}
      <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">Notificaciones</h2>
        {[
          {
            label: "Correo Electrónico",
            value: emailNotifications,
            setValue: setEmailNotifications
          },
          {
            label: "Notificaciones Push",
            value: pushNotifications,
            setValue: setPushNotifications
          },
          {
            label: "SMS",
            value: smsNotifications,
            setValue: setSmsNotifications
          }
        ].map(({ label, value, setValue }, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <span>{label}</span>
            <input
              type="checkbox"
              checked={value}
              onChange={e => setValue(e.target.checked)}
              className="toggle-checkbox accent-[var(--color-princi)]"
            />
          </div>
        ))}
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-between">
        <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors">
          Cancelar
        </button>
        <button className="px-4 py-2 bg-[var(--color-princi)] text-white rounded-md hover:bg-opacity-90 transition-colors">
          Guardar Cambios
        </button>
      </div>

      {/* Card para Seguridad */}
      <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">Seguridad</h2>
        <button className="w-full mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
          Cambiar Contraseña
        </button>
        <button className="w-full px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
          Configurar Alertas de Seguridad
        </button>
      </div>

      {/* Botón de Cerrar Sesión */}
      <button
        onClick={logOut}
        className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Cerrar Sesión
      </button>
    </div>
  )
}

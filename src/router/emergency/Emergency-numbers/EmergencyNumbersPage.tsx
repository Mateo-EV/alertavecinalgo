import { FaAmbulance, FaFireExtinguisher, FaShieldAlt } from "react-icons/fa"
import { MdLocalPhone } from "react-icons/md"

export default function EmergencyNumbers() {
  return (
    <div className="p-4 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Números de Emergencia</h1>

      {/* Sección de Contactos de Emergencia */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Contactos de Emergencia</h2>
        <p className="text-sm text-gray-600 mb-4">
          Números importantes para situaciones de emergencia
        </p>

        <div className="flex flex-col gap-4">
          {/* Policía Nacional */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-2xl text-gray-700" />
              <div>
                <p className="font-medium">Policía Nacional</p>
                <p className="text-sm text-gray-500">105</p>
              </div>
            </div>
            <MdLocalPhone className="text-2xl text-gray-700" />
          </div>

          {/* Bomberos */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <FaFireExtinguisher className="text-2xl text-gray-700" />
              <div>
                <p className="font-medium">Bomberos</p>
                <p className="text-sm text-gray-500">116</p>
              </div>
            </div>
            <MdLocalPhone className="text-2xl text-gray-700" />
          </div>

          {/* Ambulancia */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <FaAmbulance className="text-2xl text-gray-700" />
              <div>
                <p className="font-medium">Ambulancia</p>
                <p className="text-sm text-gray-500">106</p>
              </div>
            </div>
            <MdLocalPhone className="text-2xl text-gray-700" />
          </div>

          {/* Defensa Civil */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-2xl text-gray-700" />
              <div>
                <p className="font-medium">Defensa Civil</p>
                <p className="text-sm text-gray-500">119</p>
              </div>
            </div>
            <MdLocalPhone className="text-2xl text-gray-700" />
          </div>
        </div>
      </div>

      {/* Sección de Consejos de Emergencia */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Consejos de Emergencia</h2>
        <p className="text-sm text-gray-600 mb-4">
          Qué hacer en caso de emergencia
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700">
          <li>Mantenga la calma y evalúe la situación.</li>
          <li>Llame al número de emergencia apropiado según la situación.</li>
          <li>
            Proporcione información clara y precisa sobre su ubicación y la
            emergencia.
          </li>
          <li>Siga las instrucciones del operador de emergencia.</li>
          <li>
            Si es seguro hacerlo, ayude a otros hasta que llegue la ayuda
            profesional.
          </li>
        </ul>
      </div>
    </div>
  )
}

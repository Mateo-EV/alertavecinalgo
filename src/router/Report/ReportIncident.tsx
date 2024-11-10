"use client";

import React, { useState } from "react";
import { Camera, MapPin, Send } from "lucide-react";

export default function ReportIncident() {
    const [location, setLocation] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [incidentType, setIncidentType] = useState<string>("");

    return (
        <div className="p-6 space-y-6">
            {/* Card para Capturar Imagen */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-[var(--color-princi)]">
                    Capturar Imagen
                </h2>
                <div className="flex flex-col items-center">
                    <button className="flex items-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors text-[var(--color-princi)]">
                        <Camera className="mr-2 text-[var(--color-princi)]" />
                        Abrir Cámara
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                        O Cargar Imagen
                    </p>
                </div>
            </div>

            {/* Card para Detalles del Incidente */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-[var(--color-princi)]">
                    Detalles del Incidente
                </h2>

                {/* Tipo de Incidente */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-[var(--color-princi)]">
                        Tipo de Incidente
                    </label>
                    <select
                        value={incidentType}
                        onChange={(e) => setIncidentType(e.target.value)}
                        className="w-full p-2 border rounded-md bg-white text-gray-800"
                    >
                        <option value="" disabled>
                            Selecciona el tipo de incidente
                        </option>
                        <option value="robo">Robo</option>
                        <option value="accidente">Accidente</option>
                        <option value="vandalismo">Vandalismo</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>

                {/* Ubicación */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-[var(--color-princi)]">
                        Ubicación
                    </label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Ingresa la ubicación"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border rounded-md bg-white text-gray-800"
                        />
                        <MapPin className="text-[var(--color-princi)]" />
                    </div>
                </div>

                {/* Descripción */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-[var(--color-princi)]">
                        Descripción
                    </label>
                    <textarea
                        placeholder="Describe el incidente con el mayor detalle posible"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full p-2 border rounded-md bg-white text-gray-800"
                    />
                </div>

                {/* Botón de Enviar */}
                <button className="w-full flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                    <Send className="mr-2" />
                    Enviar Reporte
                </button>
            </div>
        </div>
    );
}

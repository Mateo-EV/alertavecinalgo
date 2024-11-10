import React, { useState } from "react";

export default function CommunityVigilance() {
    const [joined, setJoined] = useState(false);
    const [reports, setReports] = useState([
        "Actividad Sospechosa - Hace 2 horas",
        "Ruido Excesivo - Ayer, 23:30",
        "Vehículo Abandonado - Hace 3 días",
    ]);

    const handleJoinPatrol = () => {
        setJoined(true);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Vigilancia Vecinal
                </h2>
                <p className="text-gray-700">
                    Próxima Patrulla: 15 de Noviembre, 20:00 - 22:00
                </p>
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
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Reportes Recientes
                </h2>
                <ul className="space-y-3 text-gray-700">
                    {reports.map((report, index) => (
                        <li key={index}>{report}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

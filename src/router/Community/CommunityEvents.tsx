import React, { useState } from "react";

export default function CommunityEvents() {
    const [events, setEvents] = useState([
        "Reunión de Seguridad Vecinal - 15/11/2023, 19:00",
        "Taller de Prevención de Robos - 20/11/2023, 18:00",
        "Simulacro de Emergencia - 25/11/2023, 10:00",
    ]);
    const [newEvent, setNewEvent] = useState("");

    const handleCreateEvent = () => {
        if (newEvent.trim() !== "") {
            setEvents([newEvent, ...events]);
            setNewEvent("");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    placeholder="Ingresa un nuevo evento"
                    className="flex-1 p-2 border rounded-md bg-white text-gray-800 placeholder-gray-500"
                />
                <button
                    onClick={handleCreateEvent}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                    + Crear Evento
                </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Próximos Eventos
                </h2>
                <ul className="space-y-3 text-gray-700">
                    {events.map((event, index) => (
                        <li key={index}>{event}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

import React, { useState } from "react";
import { CalendarIcon, ArrowRightIcon, XCircleIcon } from "lucide-react";

type NewsAlert = {
    title: string;
    description: string;
    date: string;
    category: "seguridad" | "alerta" | "comunidad";
    image?: string;
    fullDescription?: string;
};

const newsAlerts: NewsAlert[] = [
    {
        title: "Nueva patrulla vecinal iniciada",
        description:
            "Se ha formado un nuevo grupo de vigilancia en el sector 3. Únete para mantener segura nuestra comunidad.",
        date: "9/11/2023",
        category: "seguridad",
        image: "https://via.placeholder.com/300x200",
        fullDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut vehicula nibh. Praesent id felis euismod, cursus urna in, cursus arcu.",
    },
    {
        title: "Alerta de robo en la zona comercial",
        description:
            "Se reportaron varios incidentes de robo en la calle principal. Tomen precauciones adicionales.",
        date: "8/11/2023",
        category: "alerta",
        image: "https://via.placeholder.com/300x200",
        fullDescription:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    },
    {
        title: "Evento comunitario: Limpieza del parque",
        description:
            "Este sábado, únete a nosotros para limpiar y mejorar nuestro parque local. ¡Todos son bienvenidos!",
        date: "7/11/2023",
        category: "comunidad",
        image: "https://via.placeholder.com/300x200",
        fullDescription:
            "Nulla facilisi. Aenean facilisis mi nec felis sollicitudin, at hendrerit arcu vestibulum.",
    },
];

// Función para obtener la clase de categoría
const getCategoryClass = (category: NewsAlert["category"]) => {
    const classes = {
        seguridad: "bg-blue-600/20 text-blue-600",
        alerta: "bg-red-600/20 text-red-600",
        comunidad: "bg-gray-600/20 text-gray-600",
    };
    return classes[category] || "bg-gray-600/20 text-gray-600";
};

export default function NewsAlerts() {
    const [selectedAlert, setSelectedAlert] = useState<NewsAlert | null>(null);

    const openModal = (alert: NewsAlert) => {
        setSelectedAlert(alert);
    };

    const closeModal = () => {
        setSelectedAlert(null);
    };

    return (
        <div className="p-6 space-y-6 text-[var(--color-princi)]">
            <h2 className="text-3xl font-bold mb-6">Noticias y Alertas</h2>
            {newsAlerts.map((alert, index) => (
                <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10 hover:shadow-xl transition-all"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold">{alert.title}</h3>
                        <span
                            className={`text-sm font-medium px-3 py-1 rounded-full ${getCategoryClass(
                                alert.category
                            )}`}
                        >
                            {alert.category}
                        </span>
                    </div>
                    <p className="text-base mt-3">{alert.description}</p>
                    <div className="flex justify-between items-center mt-5">
                        <div className="flex items-center">
                            <CalendarIcon className="mr-2 w-5 h-5" />
                            <span className="text-sm">{alert.date}</span>
                        </div>
                        <button
                            onClick={() => openModal(alert)}
                            className="flex items-center text-blue-500 hover:text-blue-400 transition-colors"
                        >
                            Leer más <ArrowRightIcon className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}

            {/* Modal */}
            {selectedAlert && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                        <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-semibold">
                                {selectedAlert.title}
                            </h3>
                            <button onClick={closeModal}>
                                <XCircleIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            {selectedAlert.date}
                        </p>
                        <img
                            src={selectedAlert.image}
                            alt={selectedAlert.title}
                            className="w-full rounded-lg mb-4"
                        />
                        <p className="text-base text-gray-700">
                            {selectedAlert.fullDescription}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

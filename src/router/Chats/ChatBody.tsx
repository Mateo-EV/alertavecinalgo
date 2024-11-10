import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiUsers } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { IoChatbubbleOutline, IoSendSharp } from "react-icons/io5";

const ChatBody: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Grupos");
    const [message, setMessage] = useState("");
    const [activeChat, setActiveChat] = useState("Seguridad Vecinal");
    const [chatMessages, setChatMessages] = useState({
        Grupos: {
            "Seguridad Vecinal": [
                {
                    sender: "Ana García",
                    text: "Hola, ¿alguien escuchó ruidos extraños anoche?",
                },
                {
                    sender: "Juan Pérez",
                    text: "Sí, parecía venir de la calle principal.",
                },
            ],
            Mantenimiento: [
                { sender: "Admin", text: "Recuerden sacar la basura mañana." },
                { sender: "Usuario", text: "Gracias por el recordatorio." },
            ],
        },
        Privados: {
            "Ana García": [
                {
                    sender: "Ana García",
                    text: "Hola, ¿viste la alerta de ayer?",
                },
                { sender: "Tú", text: "Sí, la vi, gracias por avisar." },
            ],
            "Carlos Rodríguez": [
                {
                    sender: "Carlos Rodríguez",
                    text: "Gracias por la información.",
                },
                { sender: "Tú", text: "De nada, para eso estamos." },
            ],
        },
    });

    const messageEndRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (tab: string) => setActiveTab(tab);
    const handleChatChange = (chat: string) => setActiveChat(chat);

    const handleMessageSend = () => {
        if (message.trim() === "") return;

        const newMessage = { sender: "Tú", text: message };
        const updatedMessages = {
            ...chatMessages,
            [activeTab]: {
                ...chatMessages[activeTab],
                [activeChat]: [
                    ...chatMessages[activeTab][activeChat],
                    newMessage,
                ],
            },
        };

        setChatMessages(updatedMessages);
        setMessage("");
    };

    // Auto-scroll al último mensaje
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages, activeChat]);

    const TabButton = ({ tab }: { tab: string }) => (
        <button
            className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === tab
                    ? "bg-[var(--color-princi)] text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            onClick={() => handleTabChange(tab)}
        >
            {tab}
        </button>
    );

    return (
        <div className="p-6 space-y-6 font-sans text-[var(--color-princi)]">
            {/* Contenedor de conversaciones */}
            <section>
                <h2 className="text-3xl font-bold mb-4">Conversaciones</h2>
                <div className="flex space-x-2 mb-4">
                    <TabButton tab="Grupos" />
                    <TabButton tab="Privados" />
                </div>
                <div className="space-y-4">
                    {Object.keys(chatMessages[activeTab]).map((chat, index) => (
                        <div
                            key={index}
                            onClick={() => handleChatChange(chat)}
                            className={`flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
                                activeChat === chat
                                    ? "bg-[var(--color-princi)]/20"
                                    : "bg-white/10"
                            }`}
                        >
                            <div className="w-10 h-10 bg-[var(--color-princi)] rounded-full flex items-center justify-center font-bold text-white">
                                {chat[0]}
                            </div>
                            <div className="ml-4">
                                <p className="font-semibold">{chat}</p>
                                <p className="text-gray-500">
                                    {chatMessages[activeTab][chat][0]?.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Área de chat */}
            <section>
                <h2 className="text-3xl font-bold mb-4">{activeChat}</h2>
                <div className="flex space-x-4 mb-4">
                    {[
                        FiSearch,
                        FiUsers,
                        BsCameraVideo,
                        IoChatbubbleOutline,
                    ].map((Icon, index) => (
                        <Icon
                            key={index}
                            size={24}
                            className="text-[var(--color-princi)] cursor-pointer hover:text-opacity-80 transition-colors"
                        />
                    ))}
                </div>
                {/* Contenedor de mensajes con scroll */}
                <div className="h-64 overflow-y-auto space-y-4 mb-4 bg-white/10 p-4 rounded-lg shadow-md">
                    {chatMessages[activeTab][activeChat]?.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg shadow-md ${
                                msg.sender === "Tú"
                                    ? "bg-[var(--color-princi)]/20 self-end"
                                    : "bg-white/10"
                            }`}
                        >
                            <p>
                                <strong>{msg.sender}:</strong> {msg.text}
                            </p>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>

                {/* Input de mensaje */}
                <div className="flex items-center border-t border-gray-300 pt-2">
                    <input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full bg-white focus:outline-none text-gray-800 placeholder-[var(--color-princi)]"
                    />
                    <button
                        onClick={handleMessageSend}
                        className="text-[var(--color-princi)] hover:text-opacity-80 transition-colors"
                    >
                        <IoSendSharp size={24} />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ChatBody;

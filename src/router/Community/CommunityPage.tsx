import React, { useState } from "react";
import CommunityActivity from "./CommunityActivity";
import CommunityEvents from "./CommunityEvents";
import CommunityVigilance from "./CommunityVigilance";

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState("activity");

    const renderContent = () => {
        switch (activeTab) {
            case "activity":
                return <CommunityActivity />;
            case "events":
                return <CommunityEvents />;
            case "vigilance":
                return <CommunityVigilance />;
            default:
                return <CommunityActivity />;
        }
    };

    const TabButton = ({ tab, label }: { tab: string; label: string }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Comunidad</h1>
            <div className="flex justify-around mb-6">
                <TabButton tab="activity" label="Actividad" />
                <TabButton tab="events" label="Eventos" />
                <TabButton tab="vigilance" label="Vigilancia" />
            </div>
            <div className="transition-all">{renderContent()}</div>
        </div>
    );
}

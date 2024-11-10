import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"
import "./index.css"
import AuthProvider from "./providers/AuthProvider"
import QueryProvider from "./providers/QueryProvider"
import MainPage from "./router"

import NewsAlerts from "./router/Alerts/NewsAlerts"
import ChatGroups from "./router/Chats/ChatGroups"
import CommunityPage from "./router/Community/CommunityPage"
import EmergencyNumbersPage from "./router/emergency/Emergency-numbers/EmergencyNumbersPage"
import EmergencyProtocolPage from "./router/emergency/emergency-protocol/EmergencyProtocolPage"
import EmergencyHomePage from "./router/emergency/EmergencyHomePage"
import HelpCenterPage from "./router/emergency/help-center/HelpCenterPage"
import LoginPage from "./router/login"
import UserProfile from "./router/Profile/UserProfile"
import RegisterPage from "./router/register"
import ReportIncident from "./router/Report/ReportIncident"
import RootLayout from "./router/root"
import ChatBox from "./router/Chats/ChatBox"
import EmergencyHelpCenterMap from "./router/emergency/help-center/map/EmergencyHelpCenterMap"
import NotificationInterface from "./router/Notifications/NotificationInterface"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "emergency",
        children: [
          { index: true, element: <EmergencyHomePage /> },
          { path: "help-center", element: <HelpCenterPage /> },
          { path: "help-center/map", element: <EmergencyHelpCenterMap /> },
          {
            path: "emergency-numbers",
            element: <EmergencyNumbersPage />
          },
          {
            path: "emergency-protocol",
            element: <EmergencyProtocolPage />
          }
        ]
      },
      {
        path: "chats",
        children: [
          { index: true, element: <ChatGroups /> },
          { path: ":groupId", element: <ChatBox /> }
        ]
      },
      {
        path: "report",
        element: <ReportIncident />
      },
      {
        path: "alerts", // Añadir esta ruta para noticias
        element: <NewsAlerts />
      },
      {
        path: "profile",
        element: <UserProfile />
      },
      {
        path: "community",
        element: <CommunityPage />
      },
      {
        path: "notifications",
        element: <NotificationInterface />
      }
    ]
  },
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "register",
    element: <RegisterPage />
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center" />
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>
)

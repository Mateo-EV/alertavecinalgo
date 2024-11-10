import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"
import "./index.css"
import AuthProvider from "./providers/AuthProvider"
import QueryProvider from "./providers/QueryProvider"
import MainPage from "./router"

import EmergencyHomePage from "./router/emergency/EmergencyHomePage"
import HelpCenterPage from "./router/emergency/help-center/HelpCenterPage"
import EmergencyNumbersPage from "./router/emergency/Emergency-numbers/EmergencyNumbersPage"
import EmergencyProtocolPage from "./router/emergency/emergency-protocol/EmergencyProtocolPage"
import LoginPage from "./router/login"
import RegisterPage from "./router/register"
import RootLayout from "./router/root"
import ChatBody from "./router/Chats/ChatBody"
import ReportIncident from "./router/Report/ReportIncident"
import NewsAlerts from "./router/Alerts/NewsAlerts"
import UserProfile from "./router/Profile/UserProfile"
import CommunityPage from "./router/Community/CommunityPage"

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
        element: <ChatBody />
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

import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainPage from "./router"
import "./index.css"
import AuthProvider from "./providers/AuthProvider"
import LoginPage from "./router/login"
import QueryProvider from "./providers/QueryProvider"
import RegisterPage from "./router/register"
import { Toaster } from "sonner"
import HelpCenterPage from "./router/emergency/help-center"
import RootLayout from "./router/root"
import EmergencyPage from "./router/emergency"

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
          {
            index: true,
            element: <EmergencyPage />
          },
          {
            path: "help-center",
            element: <HelpCenterPage />
          }
        ]
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

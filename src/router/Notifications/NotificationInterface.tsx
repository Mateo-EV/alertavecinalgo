import { useState, useEffect } from "react"
import { sendNotification, onAction } from "@tauri-apps/plugin-notification"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card"
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose
} from "@/components/ui/toast"

interface NotificationItem {
  id: number
  title: string
  message: string
}

export default function NotificationInterface() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [notificationId, setNotificationId] = useState(1)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [showErrorToast, setShowErrorToast] = useState(false)

  const handleAddNotification = () => {
    if (!title || !message) {
      setShowErrorToast(true)
      return
    }

    const newNotification = {
      id: notificationId,
      title,
      message
    }

    setNotifications(prev => [...prev, newNotification])
    setNotificationId(notificationId + 1)

    sendNotification({
      title: newNotification.title,
      body: newNotification.message
    })

    setTitle("")
    setMessage("")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Notification List
        </h3>
        {notifications.length === 0 && (
          <p className="text-gray-500">No notifications yet.</p>
        )}
        {notifications.map(notification => (
          <Card
            key={notification.id}
            className="mb-4 bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">
                {notification.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {notification.message}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

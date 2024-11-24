// import {
//   sendNotification,
//   isPermissionGranted,
//   requestPermission,
//   registerActionTypes
// } from "@tauri-apps/plugin-notification"

// export type NotificationType = "security" | "fire" | "community"

// const checkPermission = async (): Promise<boolean> => {
//   let permissionGranted = await isPermissionGranted()
//   if (!permissionGranted) {
//     const permission = await requestPermission()
//     permissionGranted = permission === "granted"
//   }
//   return permissionGranted
// }

// // Notificación Simple
// export const sendSimpleNotification = async (title: string, body: string) => {
//   const permissionGranted = await checkPermission()
//   if (permissionGranted) {
//     sendNotification({ title, body })
//   } else {
//     console.error("Permission to send notifications was denied.")
//   }
// }

// // Notificación Dinámica con Tipos
// export const sendDynamicNotification = async (
//   type: NotificationType,
//   title: string,
//   message: string
// ) => {
//   const permissionGranted = await checkPermission()
//   if (permissionGranted) {
//     let actions: { id: string; title: string }[] = []

//     if (type === "security") {
//       actions = [{ id: "mark-read", title: "Mark as Read" }]
//     } else if (type === "fire") {
//       actions = [{ id: "emergency-call", title: "Call 911" }]
//     } else if (type === "community") {
//       actions = [{ id: "join-meeting", title: "Join Meeting" }]
//     }

//     await registerActionTypes([
//       {
//         id: type,
//         actions
//       }
//     ])

//     sendNotification({
//       title,
//       body: message,
//       channelId: type
//     })
//   } else {
//     console.error("Permission to send notifications was denied.")
//   }
// }

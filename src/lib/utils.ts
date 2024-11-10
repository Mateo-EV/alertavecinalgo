import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
    const random = (Math.random() * 16) | 0
    const value = char === "x" ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()

  const seconds = Math.floor(diffInMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) return `hace ${years} año${years > 1 ? "s" : ""}`
  if (months > 0) return `hace ${months} mes${months > 1 ? "es" : ""}`
  if (weeks > 0) return `hace ${weeks} semana${weeks > 1 ? "s" : ""}`
  if (days > 0) return `hace ${days} día${days > 1 ? "s" : ""}`
  if (hours > 0) return `hace ${hours} hora${hours > 1 ? "s" : ""}`
  if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? "s" : ""}`
  return `hace ${seconds} segundo${seconds > 1 ? "s" : ""}`
}

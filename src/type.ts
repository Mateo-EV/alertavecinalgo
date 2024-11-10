export type User = {
  id: string
  first_name: string
  last_name: string
  phone: string
  address: string
  email: string
  dni: string
  password: string
  registration_date: Date
}

export type Alert = {
  id: string
  user_id: string
  alert_type?: string
  timestamp: Date
  location_lat: number
  location_lon: number
  status: string
  group_id?: string
  multimedia?: string
}

export type Group = {
  id: string
  name: string
  description?: string
  creation_date: Date
  private: boolean
  code: string
}

export type GroupUser = {
  user_id: string
  group_id: string
  join_date: Date
}

export type GroupMessage = {
  id: string
  user_id: string
  content: string
  timestamp: Date
}

export type ServiceContact = {
  id: string
  service_type: string
  service_name: string
  phone: string
  lat: number
  lon: number
}

export type News = {
  id: string
  title: string
  content: string
  timestamp: Date
  category: string
}

export type Incident = {
  id: string
  user_id: string
  incident_type: string
  timestamp: Date
  description: string
  location_lat: number
  location_lon: number
  multimedia?: string
}

export type NotificationHistory = {
  id: string
  user_id: string
  notification_type: string
  timestamp: Date
}

export type NotificationConfig = {
  id: string
  user_id: string
  alert_type: string
  start_time: Date
  end_time: Date
}

import { APP_BACKEND_URL } from "@/const"
import Axios from "axios"

export const axios = Axios.create({
  baseURL: APP_BACKEND_URL
})

import { useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  )
}

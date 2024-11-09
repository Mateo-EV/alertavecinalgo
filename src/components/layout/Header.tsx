import { MdMenu, MdNotifications } from "react-icons/md"

type HeaderProps = {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ setIsSidebarOpen }: HeaderProps) {
  return (
    <header className="top-nav flex items-center justify-between p-4 bg-black text-white">
      <MdMenu
        className="text-2xl cursor-pointer"
        onClick={() => setIsSidebarOpen(prev => !prev)}
      />
      <h1 className="text-lg font-bold">Ciudadano</h1>
      <MdNotifications className="text-2xl" />
    </header>
  )
}

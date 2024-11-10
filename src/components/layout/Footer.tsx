import { MdHome, MdOutlineCampaign, MdPerson } from "react-icons/md"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="navigation_bar bottom-nav p-2 bg-black text-white fixed bottom-0 w-full">
      <div className="w-[60%] mx-auto flex justify-around">
        <Link to="." className="flex flex-col items-center">
          <MdHome className="text-2xl" />
          <p className="text-sm">Inicio</p>
        </Link>

        <Link to="report" className="flex flex-col items-center">
          <MdOutlineCampaign className="text-2xl" />
          <p className="text-sm">Reportar</p>
        </Link>

        <Link to="chats" className="flex flex-col items-center">
          <MdPerson className="text-2xl" />
          <p className="text-sm">Chats</p>
        </Link>
      </div>
    </footer>
  )
}

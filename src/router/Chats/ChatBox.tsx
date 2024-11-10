import { useGroupById } from "@/hooks/useApi"
import { Link, useParams } from "react-router-dom"
import { FiSearch, FiUsers } from "react-icons/fi"
import { BsCameraVideo } from "react-icons/bs"
import { IoChatbubbleOutline, IoSendSharp } from "react-icons/io5"
import { useAuth } from "@/providers/AuthProvider"
import { Skeleton } from "@/components/ui/skeleton"
import { Button, buttonVariants } from "@/components/ui/button"
import { MoveLeftIcon } from "lucide-react"

export default function ChatBox() {
  const { groupId } = useParams()
  const { data: group, isLoading } = useGroupById(groupId)
  const { session } = useAuth()

  if (isLoading) {
    return <Skeleton className="w-full h-[60vh] rounded-lg" />
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-[var(--color-princi)]">
          {group.name}
        </h2>
        <Link
          to="/chats"
          className={buttonVariants({ variant: "secondary", size: "icon" })}
        >
          <MoveLeftIcon />
        </Link>
      </div>
      <div className="flex space-x-4 mb-4">
        {[FiSearch, FiUsers, BsCameraVideo, IoChatbubbleOutline].map(
          (Icon, index) => (
            <Icon
              key={index}
              size={24}
              className="text-[var(--color-princi)] cursor-pointer hover:text-opacity-80 transition-colors"
            />
          )
        )}
      </div>

      <div className="h-[calc(60vh)] overflow-y-auto space-y-4 mb-4 bg-white/10 p-4 rounded-lg shadow-md">
        {group.groupMessage?.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${
              msg.user_id === session.id
                ? "bg-[var(--color-princi)]/20 self-end"
                : "bg-white/10"
            }`}
          >
            <p>
              <strong>{msg.user.first_name}:</strong> {msg.content}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center border-t border-gray-300 pt-2">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full bg-white focus:outline-none text-gray-800 placeholder-[var(--color-princi)]"
        />
        <button className="text-[var(--color-princi)] hover:text-opacity-80 transition-colors">
          <IoSendSharp size={24} />
        </button>
      </div>
    </section>
  )
}

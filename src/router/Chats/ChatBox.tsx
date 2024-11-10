import {
  Alert as AlertComponent,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { GroupResponseUnique, useGroupById } from "@/hooks/useApi"
import { axios } from "@/lib/axios"
import { formatRelativeDate, generateUUID } from "@/lib/utils"
import { useAuth } from "@/providers/AuthProvider"
import { Alert, GroupMessage, User } from "@/type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AlertCircleIcon, MoveLeftIcon } from "lucide-react"
import { useState } from "react"
import { BsCameraVideo } from "react-icons/bs"
import { FiSearch, FiUsers } from "react-icons/fi"
import { IoChatbubbleOutline, IoSendSharp } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"

export default function ChatBox() {
  const { groupId } = useParams()
  const { data: group, isLoading } = useGroupById(groupId)
  const { session } = useAuth()

  if (isLoading || !group) {
    return <Skeleton className="w-full h-[calc(100vh-11rem)] rounded-lg" />
  }

  const messages = [...group.groupMessage, ...group.alerts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

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

      <div className="h-[calc(100vh-21rem)] overflow-y-auto  flex flex-col-reverse gap-4 mb-4 bg-white/10 p-4 rounded-lg shadow-md">
        {messages?.map((msg, index) => {
          if ((msg as Alert).location_lat) {
            const alert = msg as Alert & { user: User }
            const isActive = alert.status === "activo"
            return (
              <AlertComponent
                key={msg.id}
                variant={isActive ? "destructive" : "default"}
              >
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>
                  {alert.user.first_name} {!isActive && "estuvo"} en emergencia{" "}
                </AlertTitle>
                <AlertDescription className="flex justify-between">
                  <p>
                    Tipo:{" "}
                    {alert.alert_type ? alert.alert_type : "No especificada"}
                  </p>
                  <p>
                    {formatRelativeDate(alert.timestamp as unknown as string)}
                  </p>
                </AlertDescription>
              </AlertComponent>
            )
          }

          const isMyUser = msg.user_id === session.id

          return (
            <div
              key={msg.id}
              className={`p-4 rounded-lg shadow-md ${
                msg.user_id === session.id
                  ? "bg-[var(--color-princi)] self-end"
                  : "bg-white/10"
              }`}
            >
              <p>
                <strong>{msg.user.first_name}:</strong>{" "}
                {(msg as GroupMessage).content}
              </p>
              <p className={`text-xs ${isMyUser ? "text-right" : "text-left"}`}>
                {formatRelativeDate(msg.timestamp as unknown as string)}
              </p>
            </div>
          )
        })}
      </div>
      <ChatInput groupId={groupId} />
    </section>
  )
}

function ChatInput({ groupId }) {
  const [message, setMessage] = useState("")
  const { accessToken, session } = useAuth()
  const queryClient = useQueryClient()

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (content: string) => {
      const { data: messageCreated } = await axios.post<GroupMessage>(
        "/group/message",
        { content, groupId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )

      return messageCreated
    },
    onMutate: async content => {
      const temporalId = generateUUID()

      await queryClient.cancelQueries({ queryKey: ["unique-group"] })

      queryClient.setQueryData<GroupResponseUnique>(
        ["unique-group", groupId],
        prev => {
          return {
            ...prev,
            groupMessage: [
              {
                id: temporalId,
                content,
                group_id: groupId,
                timestamp: new Date(),
                user_id: session.id,
                user: session as GroupResponseUnique["groupMessage"][number]["user"]
              },
              ...prev.groupMessage
            ]
          }
        }
      )

      await queryClient.invalidateQueries({ queryKey: ["unique-group"] })

      setMessage("")

      return { temporalId }
    },
    onError: (error, content, context) => {
      console.log(error)

      queryClient.setQueryData<GroupResponseUnique>(
        ["unique-group", groupId],
        prev => {
          return {
            ...prev,
            groupMessage: prev.groupMessage.filter(
              value => value.id !== context.temporalId
            )
          }
        }
      )

      setMessage(content)
    }
  })

  return (
    <div className="flex items-center border-t border-gray-300 pt-2 gap-2">
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full bg-white focus:outline-none text-gray-800 placeholder-[var(--color-princi)]"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        onClick={() => sendMessage(message)}
        className="text-[var(--color-princi)] hover:text-opacity-80 transition-colors"
      >
        <IoSendSharp size={24} />
      </button>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"
import { GroupsReponse, useGroups } from "@/hooks/useApi"
import { useMemo, useState } from "react"
import ChatModal from "./ChatModal"
import { Link } from "react-router-dom"
import { AlertCircleIcon } from "lucide-react"

function useDividedGroups() {
  const { data, isLoading } = useGroups()

  const divided = useMemo(() => {
    if (!data) return null

    return data.reduce(
      (acc, curr) => {
        if (curr._count.groupUsers > 2) {
          acc.groups.push(curr)
        } else {
          acc.privates.push(curr)
        }

        return acc
      },
      { groups: [], privates: [] } as {
        groups: GroupsReponse
        privates: GroupsReponse
      }
    )
  }, [data])

  return { divided, isLoading }
}

export default function ChatGroups() {
  const { divided, isLoading } = useDividedGroups()
  const [activeTab, setActiveTab] = useState<keyof typeof divided>("groups")

  const TabButton = ({
    tab,
    label
  }: {
    tab: keyof typeof divided
    label: string
  }) => (
    <button
      className={`px-4 py-2 rounded-full transition-colors ${
        activeTab === tab
          ? "bg-[var(--color-princi)] text-white"
          : "bg-gray-200 text-black hover:bg-gray-300"
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {label}
    </button>
  )

  return (
    <div className="p-6 space-y-6 font-sans text-[var(--color-princi)]">
      <section>
        <div className="flex mb-4 justify-between items-center">
          <h2 className="text-3xl font-bold">Conversaciones</h2>
          <ChatModal />
        </div>
        <div className="flex space-x-2 mb-4">
          <TabButton tab="groups" label="Grupos" />
          <TabButton tab="privates" label="Privados" />
        </div>
        <div className="space-y-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))
            : divided?.[activeTab].map(group => (
                <GroupCard group={group} key={group.id} />
              ))}
        </div>
      </section>
    </div>
  )
}

function GroupCard({ group }: { group: GroupsReponse[number] }) {
  const Content = () => {
    if (group.alerts[0] && group.alerts[0].status === "activo") {
      return (
        <div className="flex items-center">
          <AlertCircleIcon className="size-4 inline text-red-500" />
          <span className="ml-1 text-red-500">Emergencia</span>
        </div>
      )
    }

    return group.groupMessage[0]?.content
  }

  return (
    <Link
      to={`/chats/${group.id}`}
      className="flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="w-10 h-10 bg-[var(--color-princi)] rounded-full flex items-center justify-center font-bold text-white">
        {group.name[0]}
      </div>
      <div className="ml-4">
        <p className="font-semibold">{group.name}</p>
        <p className="text-gray-500">
          <Content />
        </p>
      </div>
    </Link>
  )
}

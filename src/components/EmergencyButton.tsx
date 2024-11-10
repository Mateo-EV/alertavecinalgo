import { useGroups, useIsUserInEmergency } from "@/hooks/useApi"
import {
  useCancelEmergencyAlert,
  useTriggerEmergencyAlert
} from "@/hooks/usePost"
import useTripleClick from "@/hooks/useTripleClick"
import { CircleIcon } from "lucide-react"
import { MdShield } from "react-icons/md"
import { Skeleton } from "./ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip"

export default function EmergencyButton() {
  const { data: groups, isLoading } = useGroups()
  const { data: isUserInEmergency, isLoading: isLoadingEmergency } =
    useIsUserInEmergency()

  if (isLoading || isLoadingEmergency || !groups) {
    return (
      <div className="px-4">
        <Skeleton className="w-full h-20 rounded-lg" />
      </div>
    )
  }

  const thereNoGroups = groups.length === 0

  const button = thereNoGroups ? (
    <TooltipProvider>
      <Tooltip open={true}>
        <TooltipTrigger asChild>
          <button
            disabled
            className="bg-gray-800 text-white rounded-lg p-4 w-full text-lg font-semibold flex items-center justify-center pointer-events-none opacity-70"
          >
            <MdShield className="mr-2 text-2xl" />
            Botón de Emergencia
          </button>
        </TooltipTrigger>
        <TooltipContent>
          Crea o únete a un grupo para poder habilitar esta función
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <EmergencyAction isInEmergency={isUserInEmergency} />
  )

  return (
    <div className="emergency-button-container p-4">
      {button}
      <p className="text-center text-sm mt-2 text-gray-500">
        Toca rápidamente 3 veces para activar
      </p>
    </div>
  )
}

function EmergencyAction({ isInEmergency }: { isInEmergency: boolean }) {
  const { mutate: triggerEmergency } = useTriggerEmergencyAlert()
  const { mutate: cancelEmergencyAlert } = useCancelEmergencyAlert()
  const { handleClick } = useTripleClick(triggerEmergency, 3000)

  if (isInEmergency) {
    return (
      <button
        onClick={() => cancelEmergencyAlert()}
        className="text-white rounded-lg p-4 w-full text-lg font-semibold flex items-center justify-center bg-red-500"
      >
        <CircleIcon className="mr-2 size-6" fill="#fff" />
        Cancelar
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="text-white rounded-lg p-4 w-full text-lg font-semibold flex items-center justify-center ${
        isInEmergency bg-gray-800"
    >
      <MdShield className="mr-2 text-2xl" />
      Botón de Emergencia
    </button>
  )
}

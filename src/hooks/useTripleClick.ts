import { useState, useEffect } from "react"

type UseTripleClickReturn = {
  handleClick: () => void
}

const useTripleClick = (
  onTripleClick: () => void,
  maxTime: number = 3000
): UseTripleClickReturn => {
  const [clickCount, setClickCount] = useState(0)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    setClickCount(prevCount => prevCount + 1)

    // Si es el tercer clic, ejecuta la acción y resetea el contador
    if (clickCount + 1 === 3) {
      onTripleClick()
      resetCounter()
      return
    }

    // Reiniciar el temporizador
    if (timer) {
      clearTimeout(timer)
    }

    // Iniciar un temporizador para restablecer el contador si no se alcanza el tercer clic
    const newTimer = setTimeout(() => {
      resetCounter()
    }, maxTime)
    setTimer(newTimer)
  }

  const resetCounter = () => {
    setClickCount(0)
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
  }

  // Limpiar el temporizador al desmontar el componente
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  return { handleClick }
}

export default useTripleClick

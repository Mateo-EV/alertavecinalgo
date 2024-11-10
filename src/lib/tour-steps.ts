import { useEffect } from "react"
import Shepherd from "shepherd.js"
import "shepherd.js/dist/css/shepherd.css"

const TourComponent = () => {
  useEffect(() => {
    const isNewUser = localStorage.getItem("isNewUser")

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        arrow: true,
        classes: "shadow-md bg-purple-dark",
        scrollTo: true
      }
    })

    tour.addStep({
      id: "step-1",
      text: "Este es el botón de emergencia, úsalo en caso de peligro.",
      attachTo: {
        element: ".emergencyButton",
        on: "bottom"
      },
      buttons: [{ text: "Siguiente", action: tour.next }]
    })

    tour.addStep({
      id: "step-2",
      text: "Aquí puedes ver el mapa con incidentes reportados.",
      attachTo: {
        element: ".map-container",
        on: "top"
      },
      buttons: [{ text: "Siguiente", action: tour.next }]
    })

    tour.addStep({
      id: "step-3",
      text: "Accede a números importantes de emergencia aquí.",
      attachTo: {
        element: ".emergency-option",
        on: "top"
      },
      buttons: [{ text: "Siguiente", action: tour.next }]
    })

    tour.addStep({
      id: "step-4",
      text: "Conéctate con tu comunidad y ve quiénes están activos.",
      attachTo: {
        element: ".community-option",
        on: "top"
      },
      buttons: [{ text: "Siguiente", action: tour.next }]
    })

    tour.addStep({
      id: "step-5",
      text: "Aquí puedes acceder a tu perfil y otras opciones.",
      attachTo: {
        element: ".profile-dropdown",
        on: "bottom"
      },
      buttons: [{ text: "Siguiente", action: tour.next }]
    })

    tour.addStep({
      id: "step-6",
      text: "Navega por las diferentes secciones de la aplicación.",
      attachTo: {
        element: ".navigation_bar",
        on: "top" // Cambia a 'top' para que el tooltip aparezca arriba del elemento
      },
      buttons: [{ text: "Finalizar", action: tour.complete }]
    })

    let curr = undefined

    if (isNewUser === "true") {
      curr = setTimeout(() => {
        tour.start()
        localStorage.removeItem("isNewUser") // Elimina la clave para que no se repita
      }, 500)
    }

    return () => {
      tour.cancel()
      if (curr) {
        clearTimeout(curr)
      }
    }
  }, [])

  return null
}

export default TourComponent

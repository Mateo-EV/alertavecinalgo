import { MdInfo, MdMap } from "react-icons/md"
import "./HelpCenter.css"

interface Center {
  id: number
  name: string
  type: string
  address: string
}

const centers: Center[] = [
  {
    id: 1,
    name: "Hospital Nacional Dos de Mayo",
    type: "Hospital",
    address: "Av. Grau 13, Cercado de Lima"
  },
  {
    id: 2,
    name: "Clínica San Pablo",
    type: "Clínica Privada",
    address: "Av. El Polo 759, Santiago de Surco"
  },
  {
    id: 3,
    name: "Centro de Salud Mental Comunitario",
    type: "Salud Mental",
    address: "Jr. Camaná 618, Cercado de Lima"
  },
  {
    id: 4,
    name: "Cruz Roja Peruana",
    type: "Ayuda Humanitaria",
    address: "Av. Angamos 1288, Lince"
  }
]

export default function HelpCenterPage() {
  return (
    <div className="help-centers-container">
      <h2 className="title">Centros de Ayuda</h2>
      <div className="centers-list">
        {centers.map(center => (
          <div key={center.id} className="center-card">
            <h3 className="center-name">{center.name}</h3>
            <p className="center-type">{center.type}</p>
            <p className="center-address">{center.address}</p>
            <div className="center-buttons">
              <button className="map-button">
                <MdMap className="icon" />
                Ver en Mapa
              </button>
              <button className="info-button">
                <MdInfo className="icon" />
                Más info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

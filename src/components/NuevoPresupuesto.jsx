import { useEffect, useState } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPresupuesto}) => {

    
    const [mensaje,setMensaje] = useState("")

    const handlePrespuesto = (e) =>{
        e.preventDefault()
        if(!presupuesto || presupuesto === "" || presupuesto <= 0 || isNaN(presupuesto)){
            setMensaje("Presupuesto Invalido")
            return
        }

        setMensaje("")

        setIsValidPresupuesto(true)

    }
    return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePrespuesto} className='formulario'>
            <div className='campo'>
                <label htmlFor="">Definir Prepuesto</label>
                <input 
                    className='nuevo-presupuesto'
                    type="number"
                    placeholder='Añade tu presupuesto'
                    value={presupuesto}
                    onChange={(e)=> setPresupuesto(Number(e.target.value))}
                />
            </div>

            <input 
                type="submit" 
                value="añadir"    
            />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        </form>
    </div>
  )
}

export default NuevoPresupuesto
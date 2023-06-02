import { useEffect, useState } from 'react'
import Header from './components/Header'
import ListadoGasto from './components/ListadoGasto'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from "./assets/img/nuevo-gasto.svg"

function App() {

  const [gastos,setGastos] = useState([])

  const [presupuesto,setPresupuesto] = useState(0)
  const [isValidPrespuesto,setIsValidPresupuesto] = useState(false)

  const [modal,setModal] = useState(false)
  const [animarModal,setAnimarModal] = useState(false)

  const [gastoEditar,setGastoEditar] = useState({})

  const [commit,setComit] = useState(false)

  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
      }
  },[gastoEditar])


  const handleNuevoGasto = () =>{
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto =>{
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState=>gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualizados)
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos,gasto])
      
    } 
    setAnimarModal(false)  
      setTimeout(() => {
        setModal(false)
      }, 500);
}

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPrespuesto={isValidPrespuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPrespuesto && (
        <>
        <main>
          <ListadoGasto
            gastos={gastos}
            setGastoEditar={setGastoEditar}
          />
        </main>
        <div className='nuevo-gasto'>
          <img 
            src={IconoNuevoGasto} 
            alt="Icono Nuevo-gasto" 
            onClick={handleNuevoGasto}
          />
        </div>
        </>
      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
      />}
    </div>
  )
}

export default App

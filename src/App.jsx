import { useEffect, useState } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGasto from './components/ListadoGasto'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from "./assets/img/nuevo-gasto.svg"

function App() {

  const [gastos,setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  )

  const [presupuesto,setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  )
  const [isValidPrespuesto,setIsValidPresupuesto] = useState(false)

  const [modal,setModal] = useState(false)
  const [animarModal,setAnimarModal] = useState(false)

  const [gastoEditar,setGastoEditar] = useState({})

  const [filtros,setFiltros] = useState("") 
  const [gastosFiltrados,setGastosFiltrados] = useState([])


  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
      }
  },[gastoEditar])

  useEffect(()=>{
    localStorage.setItem("presupuesto",presupuesto ?? 0)
  }, [presupuesto])

  useEffect(()=>{
    localStorage.setItem("gastos",JSON.stringify(gastos) ?? [])
  },[gastos])

  useEffect(()=>{
    const presupuestoLs = Number(localStorage.getItem("presupuesto") ?? 0)
    if(presupuestoLs > 0){
      setIsValidPresupuesto(true)
    }
  },[])

  useEffect(()=>{
    if(filtros){
      const gastosFiltrados = gastos.filter(gasto=>gasto.categoria === filtros)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtros])


  const handleNuevoGasto = () =>{
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter(gasto=>gasto.id !== id)
    setGastos(gastosActualizados)
  }

  const guardarGasto = gasto =>{
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState=>gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualizados)
      setGastoEditar({})
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
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPrespuesto={isValidPrespuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPrespuesto && (
        <>
        <main>
          <Filtros 
            filtros={filtros}
            setFiltros={setFiltros}
          />
          <ListadoGasto
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            gastosFiltrados={gastosFiltrados}
            filtros={filtros}
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
        setGastoEditar={setGastoEditar}
      />}
    </div>
  )
}

export default App

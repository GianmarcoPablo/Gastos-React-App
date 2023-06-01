import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
  isValidPrespuesto,
  gastos
}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {isValidPrespuesto ? (
          <ControlPresupuesto
            presupuesto={presupuesto}
            gastos={gastos}
          />
        ):(
         <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
        />
        )}

        
        
    </header>
  )
}

export default Header
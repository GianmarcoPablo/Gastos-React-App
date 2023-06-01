
export const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

export const formatearFecha = fecha => {
  
    const fechaNueva = new Date(fecha);
    
    if (isNaN(fechaNueva)) {
      return "Fecha inválida";
    }
  
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
  
    return fechaNueva.toLocaleDateString("es-ES", opciones);
  };
  
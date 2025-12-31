import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Button } from "react-bootstrap";
import PaginatorInput from "./PaginatorInput";
// Componente que muestra los botones de paginación

const Pagination = ({currentPage, setCurrentPage, totalPages, className}) => {

  nprogress.configure({ 
    speed: 500,     // Velocidad de la animación de cierre
    trickleSpeed: 200 // Velocidad del avance automático
  });
    // Cambia a una página específica si está dentro del rango
  const irAPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPages) {
      
        nprogress.start();
        nprogress.set(0.25);
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
        const timer = setTimeout(() => {
          nprogress.done();
          setCurrentPage(numeroPagina);
        }, 500); 
      
        return () => clearTimeout(timer);
    }
  };



  return (
    <div className={`${totalPages <= 1 ?  'd-none' :'d-flex'} mt-4 my-5 flex-wrap small ${className}`}>
      {/* Botón Anterior */}

      <Button
        variant="outline-primary"
        className={`rounded border text-dark transitions mx-1 mb-2 hover-color-white`}
        disabled={currentPage === 1}
        onClick={() => irAPagina(currentPage - 1)}
      >
      <i className="bi bi-chevron-left"></i>
      {/* <i className="bi bi-caret-left"></i> */}
      </Button>

     {/* Botones numerados */}
      <PaginatorInput
          currentPage={currentPage} 
          totalPages={totalPages}
          irAPagina={irAPagina}
      />
            {/* Botón Siguiente */}
      <Button
        variant="outline-primary"
        className={`rounded border text-dark mx-1 mb-2 hover-color-white`}
        disabled={currentPage === totalPages}
        onClick={() => irAPagina(currentPage + 1)}
      >
        <i className={`bi bi-chevron-right`}></i>
      </Button>
    </div>
  );
};

export default Pagination;
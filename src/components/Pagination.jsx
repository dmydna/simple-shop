import { Button, Container } from 'react-bootstrap';
import { useProducts } from "../contexts/ProductContext";
import left from "/src/assets/angle-ts-left.svg";
import LinkArrow from './LinkArrow';
import { useEffect, useMemo } from 'react';
import { useUIContext } from '../contexts/UIContext';
// Componente que muestra los botones de paginación

const Pagination = ({currentPage, setCurrentPage, totalPages, className}) => {

    // Cambia a una página específica si está dentro del rango
const irAPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPages) {
      setCurrentPage(numeroPagina);
    }
  };


  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [currentPage]);


  return (
    <Container fluid="xl" className={`d-flex mt-4 my-5 flex-wrap small ${className}`}>
      {/* Botón Anterior */}
      <Button
        variant="outline-primary"
        className={`rounded border text-dark transitions h-white mx-1 mb-2
             ${currentPage == 1 ? 'd-none' : ''} `}
        disabled={currentPage === 1}
        onClick={() => irAPagina(currentPage - 1)}
      >
      <i class="bi bi-chevron-left"></i>
      {/* <i class="bi bi-caret-left"></i> */}
      </Button>

     {/* Botones numerados */}
      {Array.from({ length: totalPages }, (_, indice) => (
        <Button
          key={indice + 1}
          variant={currentPage === indice + 1 ? 'primary' : 'outline-primary'}
          className={`rounded border h-white mx-1 mb-2 
              ${(currentPage === indice + 1 ? 'text-white': 'text-dark')} 
              ${(totalPages == 1 && 'd-none')}`}
          onClick={() => irAPagina(indice + 1)}
        >
          {indice + 1}
        </Button>
      ))}

            {/* Botón Siguiente */}
      <Button
        variant="outline-primary"
        className={`rounded border text-dark h-white mx-1 mb-2
             ${currentPage == totalPages ? 'd-none' : ''}`}
        disabled={currentPage === totalPages}
        onClick={() => irAPagina(currentPage + 1)}
      >
        <i class={`bi bi-chevron-right ${totalPages == 0 ? 'd-none': ''}`}></i>
      </Button>
    </Container>
  );
};

export default Pagination;
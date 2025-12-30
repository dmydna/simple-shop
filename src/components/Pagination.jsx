import { useProducts } from "../contexts/ProductContext";
import left from "/src/assets/angle-ts-left.svg";
import LinkArrow from './LinkArrow';
import { useEffect, useMemo } from 'react';
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useUIContext } from '../contexts/UIContext';
import PaginatorInput from "./PaginatorInput";
// Componente que muestra los botones de paginación

const Pagination = ({currentPage, setCurrentPage, totalPages, className}) => {

    // Cambia a una página específica si está dentro del rango
const irAPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPages) {
      setCurrentPage(numeroPagina);
    }
  };


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Fuerza el salto inmediato
    });
  }, [currentPage]);


  return (
    <Container fluid="xl" className={`${totalPages == 0 ?  'd-none' :'d-flex'} mt-4 my-5 flex-wrap small ${className}`}>
      {/* Botón Anterior */}

      <Button
        variant="outline-primary"
        className={`rounded border text-dark transitions h-white mx-1 mb-2`}
        disabled={currentPage === 1}
        onClick={() => irAPagina(currentPage - 1)}
      >
      <i class="bi bi-chevron-left"></i>
      {/* <i class="bi bi-caret-left"></i> */}
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
        className={`rounded border text-dark h-white mx-1 mb-2`}
        disabled={currentPage === totalPages}
        onClick={() => irAPagina(currentPage + 1)}
      >
        <i class={`bi bi-chevron-right`}></i>
      </Button>
    </Container>
  );
};

export default Pagination;
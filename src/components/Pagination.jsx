import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { useProducts } from "../contexts/ProductContext";
import left from "/src/assets/angle-ts-left.svg";
import LinkArrow from './LinkArrow';
import { useEffect, useMemo } from 'react';
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useUIContext } from '../contexts/UIContext';
import PaginatorInput from "./PaginatorInput";
// Componente que muestra los botones de paginación

const Pagination = ({fluid,currentPage, setCurrentPage, totalPages, className}) => {

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
    <div className={`${totalPages == 0 ?  'd-none' :'d-flex'} mt-4 my-5 flex-wrap small ${className}`}>
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
    </div>
  );
};

export default Pagination;
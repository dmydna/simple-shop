import { Button } from "react-bootstrap";
import PaginatorInput from "./PaginatorInput.jsx";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
// Componente que muestra los botones de paginación

const Pagination = ({currentPage, setCurrentPage, totalPages, className}) => {


  const irAPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPages) {
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
          setCurrentPage(numeroPagina);
    }
  };

    useEffect(() => {
        console.log(currentPage);
    }, [currentPage]);

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

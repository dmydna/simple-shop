import { useEffect, useState } from "react";
import { usePaginacion } from "../../../contexts/PaginationContext";
import { listingService } from "../../../services/listingService";
import { Button } from "react-bootstrap";
import PaginationInput from "../../pagination/PaginatorInput";

function PaginatedListing({service}){

    const {currentPage, totalPages}  = usePaginacion()


    const irAPagina = (numeroPagina) => {
        if (numeroPagina >= 1 && numeroPagina <= totalPages) {
            window.scrollTo({
              top: 0,
              behavior: 'instant'
            });
            fetchItems(numeroPagina);
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
          <PaginationInput
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
}
export default PaginatedListing
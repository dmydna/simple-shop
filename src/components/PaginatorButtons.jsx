import React from "react";
import { Button, Container, Form, Modal, InputGroup } from "react-bootstrap";

function PaginationButtons({totalPages, irAPagina, currentPage}){

    return(
        Array.from({ length: totalPages }, (_, indice) => (
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
     ))
    )

}

export default PaginationButtons
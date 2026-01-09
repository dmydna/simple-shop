import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, InputGroup } from "react-bootstrap";

function PaginationInput({currentPage, totalPages, irAPagina}){

    const [inputPage, setInputPage] = useState(currentPage);

    useEffect(()=>{
        setInputPage(currentPage)
    },[currentPage])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const val = parseInt(inputPage);
        if (!isNaN(val) && val > 0 && val <= totalPages) {
          irAPagina(val);
        } else {
          setInputPage(currentPage); // Reset si el valor es inválido
        }
    };

    return(
    <Form onSubmit={handleSubmit} className="d-flex align-items-center mx-2 mb-2" style={{ minWidth: "120px" }}>
        <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
            <Form.Control
            className="text-center border-0 fw-bold no-arrows"
            style={{ width: "50px", fontSize: "0.9rem", boxShadow: 'none' }}
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)} // Permite borrar y escribir
            onBlur={handleSubmit} // Opcional: cambia de página al hacer click fuera
            />
            <InputGroup.Text className="bg-light border-0 text-muted ps-1 pe-3" style={{ fontSize: "0.85rem" }}>
            de {totalPages}
            </InputGroup.Text>
        </InputGroup>
     </Form>
    )

}

export default PaginationInput
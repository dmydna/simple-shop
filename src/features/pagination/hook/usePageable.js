import { useState } from "react";

// Usa backend para la logica de paginacion
export const usePageable = () => {

    // Los estados seran pisados por el pageable fecheado desde la api
    // estos valores por default evitan bugs visuales

    const [content, setContent] = useState({});
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(1)
    // cantidad de items por pagina 
    const [pageSize, setPageSize] = useState(1);

    return ({
        totalPages, setTotalPages, currentPage, setCurrentPage, pageSize, setPageSize,
        totalElements, setTotalElements, content, setContent
    })
};
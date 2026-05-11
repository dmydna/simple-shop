import { useState } from "react";

// Usa backend para la logica de paginacion
export const usePageable = () => {

    const [content, setContent] = useState({});
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0)
    /** cantidad de items por pagina */
    const [pageSize, setPageSize] = useState(1);

    return ({
        totalPages, setTotalPages, currentPage, setCurrentPage, pageSize, setPageSize,
        totalElements, setTotalElements, content, setContent
    })
};
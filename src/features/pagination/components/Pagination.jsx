import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaginatorInput from "./PaginatorInput.jsx";
// Componente que muestra los botones de paginación




// NOTA para que paginacion sea autonoma, debe responder solo a searchparams.
const Pagination = ({ totalPages, className }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();


  const pageParam = searchParams.get('page');
  useEffect(() => {
    if(pageParam){setCurrentPage(Number(pageParam))}
  },[pageParam, searchParams])

  const agregarParametro = (numeroPagina) => {
    console.log('cambia de pagina')
    // 1. Crear una instancia de URLSearchParams basada en la URL actual
    const params = new URLSearchParams(searchParams);
    // 2. Agregar o modificar el parámetro
    params.set('page', numeroPagina); 
    // params.append('tags', 'react') // Si quieres agregar múltiples valores para la misma clave
    // 3. Navegar a la misma ruta con los nuevos parámetros
    navigate({
      pathname: window.location.pathname,
      search: params.toString()
    });
  };


  const irAPagina = (numeroPagina) => {
    console.log('ir a pagina:', currentPage)
    console.log('esta en rango', numeroPagina >= 1 && numeroPagina <= totalPages)
    console.log('total de pagina', totalPages)
    console.log('numero de pagina', numeroPagina)
    if (numeroPagina >= 1 && numeroPagina <= totalPages) {
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
          setCurrentPage(numeroPagina);
          agregarParametro(numeroPagina);
    }
  };

    useEffect(() => {
        console.log("current page:",currentPage);
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

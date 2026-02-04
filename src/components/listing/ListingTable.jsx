import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useListings } from '../../contexts/ListingContext';
import { useListingsForm } from '../../contexts/ListingFormContext';
import Pagination from '../pagination/Pagination';
import { Link } from 'react-router-dom';


function ListingTable() {

  const { listings, loading, currentPage, setCurrentPage, totalPages, setFilters } = useListings()
  const { openEditModal, handleDelete, handleVisibility } = useListingsForm()

  useEffect(() => {
    // Lógica de paginación
    setCurrentPage(1)
  }, [])




  return (
    <>
      <div className='shadow-sm border rounded p-2'>
        <Table className="mb-0" striped={true} bordered={false} hover={true}>
          <thead className='d-none'>
            <tr>
              {/* <th>ID</th> */}
              <th style={{ width: '60%' }}>Nombre</th>
              <th style={{ textAlign: 'end' }} ></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Mientras carga, mostramos una fila de carga elegante
              <tr>
                <td colSpan="3" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                  <p className="mt-2">Cargando datos...</p>
                </td>
              </tr>
            ) : listings.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No hay items</td>
              </tr>
            ) : (
              listings.map((item) => (
                <tr style={{ borderStyle: 'hidden' }} key={item.id}>
                  {/* <td><span className='text-secondary'>id: </span>{item.id}</td> */}
                  <td style={{ width: '60%' }}>
                    <Link 
                      to={`/productos/${item.hash}/${item.title}`} 
                      className='mb-2 fw-semibold text-decoration-none hover-link' 
                      style={{ fontSize: "1.20rem", color: "#000" }} 
                    >
                      {item.title}
                    </Link>
                    <p className='text-muted small p-0 m-0'>id: {item.id}</p>
                  </td>
                  <td style={{ textAlign: 'end' }} >

                    {/* Editar  */}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => openEditModal(item)}
                      className="me-3 mb-1"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>

                    {/* Eliminar  */}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="me-3 mb-1"
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </Button>

                    {/* Mostrar/Ocultar  */}
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => handleVisibility(item)}
                      className="mb-1"
                    >
                      <i className="bi bi-eye-fill"></i>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
      />
    </>
  );
}

export default ListingTable;
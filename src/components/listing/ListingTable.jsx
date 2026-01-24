import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useListings } from '../../contexts/ListingContext';
import { useListingsForm } from '../../contexts/ListingFormContext';
import { useUIContext } from '../../contexts/UIContext';
import Pagination from '../pagination/Pagination';

function ListingTable() {

  const { currentItems, setItems, setItemsPerPage } = useUIContext()
  const { listings, loading, currentPage, setCurrentPage, totalPages } = useListings()
  const { openEditModal, handleDelete, openReadModal, handleVisibility } = useListingsForm()

  useEffect(() => {
    // Lógica de paginación
    setCurrentPage(1)
  }, [])



  return (
    <>
    <div className='shadow-sm border rounded p-2'>
      <Table className="mb-0" striped={true} bordered={false} hover={true}>
        <thead>
          <tr>
            <th>ID</th>
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
                <td>{item.id}</td>
                <td style={{ width: '60%' }}>{item.title}</td>
                <td style={{ textAlign: 'end' }} >

                  {/* Editar  */}
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="me-3 mb-1"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>

                  {/* Eliminar  */}
                  <Button
                    variant="outline-dark"
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
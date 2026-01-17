import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useListings } from '../../contexts/ListingContext';
import { useListingsForm } from '../../contexts/ListingFormContext';
import { useUIContext } from '../../contexts/UIContext';
import Pagination from '../pagination/Pagination';

function ListingTable() {

  const { currentItems, setItems, setItemsPerPage, currentPage, setCurrentPage, totalPages } = useUIContext()
  const { filtered, products, loading } = useListings()
  const { openEditModal, handleDelete, openReadModal, handleVisibility } = useListingsForm()

  useEffect(() => {
    // Lógica de paginación
    setItemsPerPage(8)
    setItems(filtered)
  }, [filtered, products, loading])



  return (
    <>
      <Table striped={true} bordered={true} hover={true}>
        <thead>
          <tr>
            <th>ID</th>
            <th style={{ width: '60%' }}>Nombre</th>
            <th>Acciones</th>
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
          ) : currentItems.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No hay items</td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ width: '60%' }}>{item.title}</td>
                <td>

                  {/* Editar  */}
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="me-3 mb-1"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>

                  {/* Eliminar  */}
                  <Button
                    variant="danger"
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
                    className="ms-3 mb-1"
                  >
                    <i className="bi bi-eye-fill"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}

export default ListingTable;
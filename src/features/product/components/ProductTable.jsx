import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useProducts } from '../hooks/ProductContext.jsx';
import { useUIContext } from '../../../contexts/UIContext.jsx';
import Pagination from '../../pagination/components/Pagination.jsx';

function ProductTable({openEditModal, handleDelete,  handleRead}) {

  const { currentItems, setVisibleClients, setItems, setItemsPerPage, currentPage, setCurrentPage, totalPages } = useUIContext()
  const  {filtered, products, loading} =  useProducts()


  useEffect(()=>{
    // Lógica de paginación
    setItemsPerPage(8)
    setItems(filtered)
  },[filtered, products, loading])


  return (
    <>
      <Table striped bordered hover>
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
                <td style={{ width: '60%' }}>{item.name}</td>
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

export default ProductTable;
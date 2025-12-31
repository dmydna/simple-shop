import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useProducts } from '../contexts/ProductContext';
import { useUIContext } from '../contexts/UIContext';
import Pagination from './Pagination';


function ProductTable({openEditModal, handleDelete,  handleInfo}) {

  const { currentItems, setVisibleClients, setItems, setItemsPerPage, currentPage, setCurrentPage, totalPages } = useUIContext()
  const  {filtered, products, loading} =  useProducts()

  useEffect(()=>{
    // Lógica de paginación
    setItemsPerPage(8)
    setItems(filtered)
    console.log(filtered)
  },[filtered, products])



  return (
     loading ? 
       <p>Cargando...</p> : 
      <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th style={{ width: '60%' }} >Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No hay items
              </td>
            </tr>
          )}
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td style={{ width: '60%' }} >{item.title}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => openEditModal(item)}
                  className="me-3 mb-1"
                >
                  <i class="bi bi-pencil-square"></i>
                  {/* <p className="m-0 ms-2 d-none d-md-inline-block">Editar</p> */}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="me-3 mb-1"
                >
                  <i class="bi bi-trash3-fill"></i>
                  {/* <p className="m-0 ms-2 d-none d-md-inline-block">Eliminar</p> */}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleInfo(item)}
                  className="mb-1"
                >
                  <i class="bi bi-info-circle-fill"></i>
                  {/* <p className="m-0 ms-2 d-none d-md-inline-block">ver detalles</p> */}
                </Button>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handleInfo(item)}
                  className="ms-3 mb-1"
                >
                  <i class="bi bi-eye-fill"></i>
                  {/* <p className="m-0 ms-2 d-none d-md-inline-block">ver detalles</p> */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
          fluid=""
          currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} 
      />
      </>
  );
}

export default ProductTable;
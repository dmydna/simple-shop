import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useProducts } from '../contexts/ProductContext';


function ProductTable({openEditModal, handleDelete,  handleInfo}) {

  const{productosVisibles, loading} = useProducts();

  return (
     loading ? 
       <p>Cargando...</p> : 
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th style={{ width: '60%' }} >Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosVisibles.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No hay items
              </td>
            </tr>
          )}
          {productosVisibles.map((item) => (
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
                  <i class="bi bi-eye-fill"></i>
                  {/* <p className="m-0 ms-2 d-none d-md-inline-block">ver detalles</p> */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  );
}

export default ProductTable;
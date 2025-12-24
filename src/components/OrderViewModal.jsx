import React, { useEffect } from 'react';
import { Button, Table, Modal, Container } from 'react-bootstrap';


function OrderViewModal({order, show ,onHide, openEditModal, handleDelete,  handleInfo}) {

  const items = order?.details;

  return (
<Container>
<Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {"Order Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><b>Total: </b>{
            items?.reduce( (acc, curr) => acc + curr.product.price,  0)
          }</p>
          <p><b>Unidades: </b>{
            items?.reduce( (acc, curr) => acc + curr.quantity,  0)
          }</p>

<p><b>Estado: </b> {order?.state} </p>
         <br></br>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th style={{ width: '30%' }} >Nombre</th>
            <th>Cant.</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items?.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No hay order
              </td>
            </tr>
          )}
          {items?.map((item) => (
            <tr key={item.id}>
              <td>{item.product.id}</td>
              <td style={{ width: '60%' }} >{item.product.title}</td>
              <td>{item.quantity}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => openEditModal(item.product)}
                  className="me-3 mb-1"
                >
                  <i class="bi bi-pencil-square"></i>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item.product.id)}
                  className="me-3 mb-1"
                >
                  <i class="bi bi-trash3-fill"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={()=> onHide(false)}>
                Aceptar
        </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    )
}

export default OrderViewModal;
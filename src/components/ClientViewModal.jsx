import React, { useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import OrderViewModal from './OrderViewModal';

function ClientViewModal({client, show ,onHide}){


  const [showOrder, setShowOrder] = useState(false);
  const [currentOrder, setCurrentOrder] = useState()

const showOrderHandle = (item) => {
      setCurrentOrder(item);
      console.log(item);
      setShowOrder(true);
}


return ( 

<Container>
<Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {"Client Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <p><b>Nombre: </b>{client?.name}</p>
           <p><b>Email: </b>{client?.email}</p>
            <>
            <p><b>Pedidos: </b></p>
            <Table striped bordered hover>
           <thead>
            <tr key={{}}>
              <th>ID</th>
              <th>ESTADO</th>
              <th>acciones</th>
            </tr>
            </thead>
            <tbody>
           {client?.orders?.length == 0 && 
           <tr>
              <td colSpan="4" className="text-center">
                       No hay items
              </td>
           </tr>
           }
           {client?.orders?.map((item) => ( 
              <tr key={item.id}>
                 <td>{item.id}</td>
                 <td>{item.state}</td>
                 <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => openEditModal(item.product)}
                  className="me-3 mb-1"
                >
                  <i className="bi bi-pencil-square"></i>
                  {/* <p className="m-0 ms-2 d-none d-md-inline-block">Editar</p> */}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item.product.id)}
                  className="me-3 mb-1"
                >
                  <i className="bi bi-trash3-fill"></i>
                  {/* <p className="m-0 ms-2 d-none d-md-inline-block">Eliminar</p> */}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => showOrderHandle(item)}
                  className="mb-1"
                >
                  <i className="bi bi-eye-fill"></i>
                </Button>
              </td>
              </tr>
           ))}
           </tbody>
           </Table>
            </>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={()=> onHide(false)}>
                Aceptar
        </Button>
        </Modal.Footer>
      </Modal>
      <OrderViewModal 
          order={currentOrder} 
          show={showOrder} 
          onHide={setShowOrder}
          openEditModal={{}} 
          handleDelete={{}}  
          handleInfo={{}}
          >
      </OrderViewModal>
    </Container>
    )
}

export default ClientViewModal;
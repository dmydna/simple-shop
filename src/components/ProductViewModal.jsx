import React from 'react';
import { Button, Container, Modal } from 'react-bootstrap';

function ProductViewModal({product, show ,onHide}){

return ( 

<Container>
<Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {"Product Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <p><b>Title: </b>{product?.title}</p>
           <p>
              <span className='me-3'><b>Rating:</b> {product?.rating}</span> 
              <span className='me-3'><b>Price: </b>{product?.price}</span>
              <span><b>Stock: </b>{product?.stock}</span>
           </p>

           <p><b>Description: </b>{product?.description}</p>

           <p>
              <span className='me-3'><b>Brand: </b>{product?.brand}</span>
              <span className='me-3'><b>Category: </b>{product?.category}</span>
           </p>

           <p><b>Images: </b></p>
           <img src={product?.thumbnail} width={155} />
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

export default ProductViewModal;
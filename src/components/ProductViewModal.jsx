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
            { product?.title === undefined ?  '' : 
                <p><b>Title: </b>{product?.title}</p> } 
            { product?.name  === undefined ? '' : 
                <p><b>Name:  </b>{product?.name} </p> } 
           <p>
              { product?.rating  === undefined ? '' : 
                  <span className='me-3'><b>Rating:</b> {product?.rating}</span> } 
              { product?.price  === undefined ?  '' : 
                  <span className='me-3'><b>Price:</b> {product?.price}</span>   } 
              { product?.stock  === undefined ?  '' : 
                  <span className='me-3'><b>Stock:</b> {product?.stock}</span>   } 
           </p>

           { product?.description === undefined ?  '' : 
              <p><b>Description: </b>{product?.description}</p> } 

           <p>
              { product?.stock  === undefined ?  '' : 
                  <span className='me-3'><b>Brand:</b> {product?.brand}</span>   } 
              { product?.category  === undefined ?  '' : 
                  <span className='me-3'><b>Category:</b> {product?.category}</span>   } 
           </p>
           
           { product?.thumbnail  === undefined ?  '' : 
                <>
                  <p className='me-3'><b>Brand:</b> {product?.thumbnail}</p> 
                  <img src={product?.thumbnail} width={155} />
                </>  } 

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
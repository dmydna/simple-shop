import React, { useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import CarritoItem from "../components/CartItem";
import ProductBuyModal from "../components/ProductBuyModal";
import { useWindowsHeight } from "../components/useWindowSize";
import emptyCaryImg from "/src/assets/empty-cart.png";

function CartModal({show,onHide}) {


  const height = useWindowsHeight()

  const { clearCart, 
      setTotalPrice, 
      totalPrice,
      cartItems 
  } = useCart()

  const [modalShow, setModalShow] = useState(false)


  return (
    <Modal
    show={show}
    onHide={onHide}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {cartItems.length != 0 ? 
          <div className="">Carrito</div> : 
          <div className="">Carrito Vacio</div>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "calc(80vh - 140px)", overflowY: "auto", boxSizing: 'border-box' }}>

      {

cartItems.length != 0 ? 
    <Container className="mt-4 p-0">
      <CarritoItem/>
      <div className="my-3 mx-2 d-flex flex-row-reverse">
          <Button
            type="button"
            className="btn btn-danger"
            onClick={() => clearCart()}
          >
            <i className="bi bi-trash3" /> Vaciar carrito
          </Button>
      </div>

      <ProductBuyModal 
        show={modalShow} 
        onHide={() =>{ setModalShow(false); clearCart() }}
      />
    </Container> :
  <Container className="py-5 mt-5 d-flex justify-content-center align-items-center">
    <div>
    <img style={{
      marginInline: "auto",
      maxWidth: "300px",
      display: "block", 
      position: "relative",
    }} 
      src={emptyCaryImg} />
    <h3 className="text-muted fw-bolder m-4">
      Tu carrito esta vacio!
    </h3>
    </div>
  </Container>


      }


      </Modal.Body>
      <Modal.Footer>
      <Container className="p-0 m-0">
        {cartItems.length != 0 ?

          <Card>
            <Card.Body className="d-flex">
              <Card.Text className="h3"> Total</Card.Text>
              <Card.Text className="h3 ms-auto me-1">$ {totalPrice.toFixed(2)}</Card.Text>
            </Card.Body>
            <Button className="m-2" variant="primary" type="submit"
                  onClick={() => { setModalShow(true) }}
              > Finalizar Compra
              </Button>
          </Card>
            :
          <Button variant="danger" className="col w-100 col-md-2 p-2 " 
              onClick={onHide} as={Link} to={'/productos'} 
          >
            <i className="bi bi-house-door-fill"></i>
            <b className="mx-2"> ir a Comprar </b>   
          </Button>
        }
       </Container>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
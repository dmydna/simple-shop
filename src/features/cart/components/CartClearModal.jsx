import React, { useContext, useState } from "react";
import { Button, Modal,Card, Container } from "react-bootstrap";
import cartImg from "../../../assets/shopping-cart.png"

function CartClearModal({show, onHide, handle}) {

  return (
<Modal
  show={show}
  onHide={onHide}
  size="md"
  aria-labelledby="clear-cart-modal-title"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title id="clear-cart-modal-title">
      Vaciar carrito
    </Modal.Title>
  </Modal.Header>

  <Modal.Body className="text-center">

    <img  className="fs-1 mb-3" src={cartImg} alt="" />
    <h5>¿Vaciar el carrito?</h5>
    <p>Se eliminarán todos los productos. 
      Esta acción no se puede deshacer.</p>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={onHide}>
      Cancelar
    </Button>
    <Button variant="danger" onClick={handle}>
      Vaciar carrito
    </Button>
  </Modal.Footer>
</Modal>

  );
}

export default CartClearModal;
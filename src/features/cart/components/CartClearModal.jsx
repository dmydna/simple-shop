import { Button, Modal } from "react-bootstrap";
import cartImg from "@assets/shopping-cart.png";
import {CartIcon} from "@features/cart/components/CartIcon.jsx"

function CartClearModal({show, onHide, handle}) {

  return (
<Modal
  show={show}
  onHide={onHide}
  size="md"
  aria-labelledby="clear-cart-modal-title"
  centered
>

  <Modal.Body className="text-center">

    <div className='d-flex justify-content-end'>
     <span className='fs-5 fw-semibold visually-hidden'>
        Vaciar cart
     </span>
      <span onClick={()=>onHide(false)} className='btn btn-light rounded-circle'>
          <i className='bi-x-lg fw-semibold'></i>
      </span>
    </div>

   <div className='d-block py-4'>
    {/*<i className='bi bi-trash3 disabled icn-lg'></i>*/}



        <CartIcon icon="bi-exclamation-circle-fill"/>




    <p className='fw-bold'>¿Vaciar el carrito?</p>
    <p className='text-secondary small'>
        Se eliminarán todos los productos. <br></br>
        Esta acción no se puede deshacer.</p>
   </div>

    <div className='d-flex gap-3 justify-content-center my-2'>
    <Button className='btn-sm rounded-3' variant="light" onClick={()=>onHide(false)}>
      Cancelar
    </Button>
    <Button className='btn-sm rounded-3' variant="dark" onClick={handle}>
      Vaciar carrito
    </Button>
    </div>


  </Modal.Body>


</Modal>

  );
}

export default CartClearModal;

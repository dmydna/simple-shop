import React, { useMemo, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useMatch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BuyNowButton from "../components/BuyNowButton";
import CartClearModal from "../components/CartClearModal";
import CartCupon from "../components/CartCupon";
import CarritoItem from "../components/CartItem";
import ProductBuyModal from "../components/ProductBuyModal";
import { useCart } from "../contexts/CartContext";
import { useWindowsHeight, useWindowsWidth } from "../contexts/useWindowSize";
import Img0 from "/src/assets/empty-cart.png";


import CartEmpty from "../components/CartEmpty";

function Carrito() {

  const buyMatch = useMatch("/carrito/:buy")
  const height = useWindowsHeight()
  const width = useWindowsWidth()

  const { clearCart, 
      setTotalPrice, 
      totalPrice,
      cartItems ,
      couponDiscount
  } = useCart()

  const[cuponCheck, setCuponCheck] = useState(false)

  const [modalShow, setModalShow] = useState(false)
  const [showClearCart, onHideClearCart] = useState(false)

  const Order = useMemo(() => {
    const descuento = couponDiscount ? 5.0 : 0;
    const envio = 10.30;
    return {
      envio: envio,
      descuento: descuento,
      subtotal: totalPrice,
      total: totalPrice + envio - descuento
    };
  }, [cuponCheck, totalPrice]);


  return( cartItems.length != 0 ? 
    <Container fluid="xl" className="mt-4">
      <div className="h1 d-none">Carrito</div>
    <Row className="g-0" md={4}>
      <Col className="col-12 col-md-12 col-lg-12 col-xl-7">
      <Card className="m-2 p-4">
      <div className="d-flex align-items-center justify-content-between">
        <p className="h5 fw-bold pt-3">Mi carrito({cartItems.length})</p>
        <i onClick={() => onHideClearCart(true)} 
        style={{fontSize: "xx-large"}} className="bi bi-x hover-icon"></i>
      </div>

      <CartClearModal  
        show={showClearCart}  
        onHide={onHideClearCart}  
        handle={()=>  clearCart()  } 
      />
      <hr/>
      <CarritoItem/>
      </Card>

      </Col>
      <Col className="col-12 col-md-12 col-lg-12 col-xl-5">
      <CartCupon title={'Carrito'} check={cuponCheck} onCheck={setCuponCheck} />
      <Card style={{top: (width > 900 ? "55px" : 0)  }} 
         className={` sticky-md-top m-2 p-4`} >
        <Card.Text className="h5 fw-bold text-secondary py-2">
          Tu pedido
        </Card.Text>
        <hr/>
        <div className="d-flex align-items-center justify-content-between py-2">
          <Card.Text className="text-secondary  m-0">
            Subtotal ({cartItems.length} productos)</Card.Text>
          <Card.Text className="fw-bold">
            ${totalPrice.toFixed(2)}
          </Card.Text>
        </div>
        <hr/>
        <div className="d-flex align-items-center justify-content-between py-2">
          <Card.Text className="text-secondary m-0">Descuento {cuponCheck && '(1 cupon)'} </Card.Text>
          <Card.Text className="fw-bold">
            ${Order.descuento}
          </Card.Text>
        </div>
        <hr/>
        <div className="d-flex align-items-center justify-content-between py-2">
          <Card.Text className="text-secondary m-0">Envio</Card.Text>
          <Card.Text className="fw-bold">
            ${Order.envio}
          </Card.Text>
        </div>
        <hr/>
        <div className="d-flex align-items-center justify-content-between pt-3 pb-4">
          <Card.Text className="hs-5 fw-bold m-0">Total</Card.Text>
          <Card.Text className="h5 fw-bold">
            ${Order.total.toFixed(2)}
          </Card.Text>
        </div>

        <BuyNowButton
          handle={()=>{setModalShow(true)}}
          variant={buyMatch ? 'danger' : 'primary'}
        > 
        { buyMatch ? 
          "Confirma Compra" : 
          "Finalizar Compra"}

        </BuyNowButton>
      </Card>
      </Col>
      <ToastContainer />
    </Row>


      <ProductBuyModal 
        show={modalShow} 
        onHide={() =>{ setModalShow(false)}}
      />
    </Container> :
    <CartEmpty 
      image={Img0} 
      message= "Tu carrito está vacío"
      subtext= "Agregá productos para comenzar tu compra." 
  
  />
  )


  

  //muestro las cards
}

export default Carrito;

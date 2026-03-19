import React, { useMemo, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useMatch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartCupon from "../features/cart/components/CartCupon.jsx";
import CartEmpty from "../features/cart/components/CartEmpty.jsx";
import ProductBuyModal from "../features/product/components/ProductBuyModal.jsx";
import { useCart } from "../features/cart/contexts/CartContext.jsx";
import Img0 from "/src/assets/empty-cart.png";
import {MyCart} from "../features/cart/components/MyCart.jsx";
import {MyOrderCart} from "../features/cart/components/MyOrderCart.jsx";




function Carrito() {


  const {cartItems } = useCart()

  const[cuponCheck, setCuponCheck] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  return( cartItems.length !== 0 ?
          <Container fluid="xl" className="mt-4">
            <div className="h1 d-none">Carrito</div>
            <Row className="g-0" md={4}>

              {/* MY CART */}
              <Col className="col-12 col-md-12 col-lg-12 col-xl-7">
                <MyCart className="p-4 island">
                    <p className="h5 fw-bold pt-3">
                      Mi carrito({cartItems.length})
                    </p>
                </MyCart>
              </Col>

              {/* CUPON */}
              <Col className="col-12 col-md-12 col-lg-12 col-xl-5">
                <CartCupon
                    title={'Cupon'}
                    check={cuponCheck}
                    onCheck={setCuponCheck}
                />

                {/* MY ORDER CART  */}
                <MyOrderCart
                    modalShow={modalShow}
                    onShowModal={setModalShow}
                    oncheck={setCuponCheck}
                    check={cuponCheck}>
                </MyOrderCart>
              </Col>
              <ToastContainer />
            </Row>
            <ProductBuyModal
                show={modalShow}
                onHide={() =>{ setModalShow(false)} }
            />
          </Container> :
          <CartEmpty
              image={Img0}
              message= "Tu carrito está vacío"
              subtext= "Agregá productos para comenzar tu compra."
          />
  )

}

export default Carrito;

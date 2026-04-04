import { useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartCupon from "../../features/cart/components/CartCupon.jsx";
import { MyCart } from "../../features/cart/components/MyCart.jsx";
import { MyOrderCart } from "../../features/cart/components/MyOrderCart.jsx";
import { useCart } from "../../features/cart/contexts/CartContext.jsx";
import PaymentForm from "../../features/payment/components/PaymentForm.jsx";
import { usePayment } from "../../features/payment/hooks/usePayment.js";
import { MyOrderCartPlaceHoder } from "../../features/placeholder/MyOrderCartPlaceHolder.jsx";
import PageLoading from "../../components/common/PageLoading.jsx";
import PageCartEmpty from "./PageCartEmpty.jsx"



function Carrito() {


  const { cartItems } = useCart()
  const [cuponCheck, setCuponCheck] = useState(false)
  const navigate = useNavigate()
 
  const { orderLoading, orderError, payLoading, payError, handleCOrder,  } = usePayment()



  return (cartItems.length !== 0 ?
    <Container fluid="xl" className="mt-4">
      <div className="h1 d-none">Carrito</div>
      <Row className="g-0" md={4}>

        {/* MY CART */}
        <Col className="col-12 col-md-12 col-lg-12 col-xl-7">
          {!orderLoading && !orderError && !payLoading && !payError && step == 0 && (
            <MyCart className="p-4 island">
              <p className="h5 fw-bold pt-3">
                Mi carrito({cartItems.length})
              </p>
            </MyCart>
          )}
          {!payLoading && !payError &&  !orderLoading && !orderError  && step == 1 && (
            <PaymentForm />
          )}
          {orderLoading && (
            <Card className="p-4 island">
              <PageLoading />
            </Card>
          )}
          {orderError && (
            <Card className="p-4 island mt-2">
              <p className="h5 fw-bold pt-3">
                Mi carrito({cartItems.length})
              </p>
              <hr />
              <Alert variant="danger">Hubo un error! Revisa tu coneccion</Alert>
              <Button onClick={handleError} >Aceptar</Button>
            </Card>
          )}

        </Col>

        {/* CUPON */}
        <Col className="col-12 col-md-12 col-lg-12 col-xl-5">
          <CartCupon
            title={'Cupon'}
            check={cuponCheck}
            onCheck={setCuponCheck}
          />

          {/* MY ORDER CART  */}
          {orderLoading || orderError && (
            <MyOrderCartPlaceHoder />

          )}
          {!orderError && !orderLoading && (
            <div className="sticky-md-top">
              <MyOrderCart
                handle={handleCheckOrder}
                oncheck={setCuponCheck}
                check={cuponCheck}>
              </MyOrderCart>
              <div  style={{ marginTop: '10px' }} className="border p-3 mx-2 d-flex justify-content-center gap-3 island">
                <Button style={{ maxWidth: '200px' }}
                  onClick={() => setStep(1)} variant="light" className="small w-100 d-block border rounded-4">
                  Cancelar
                </Button>
                <Button
                  onClick={handleContinue} variant="dark" className="small w-100 d-block border rounded-4">
                  Continuar
                </Button>
              </div>
            </div>

          )}

        </Col>
        <ToastContainer />
      </Row>
    </Container> :
    <PageCartEmpty/>
  )

}

export default Carrito;

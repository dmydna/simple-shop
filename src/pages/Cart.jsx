import React, { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useMatch, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartCupon from "../features/cart/components/CartCupon.jsx";
import CartEmpty from "../features/cart/components/CartEmpty.jsx";
import ProductBuyModal from "../features/product/components/ProductBuyModal.jsx";
import { useCart } from "../features/cart/contexts/CartContext.jsx";
import Img0 from "/src/assets/empty-cart.png";
import { MyCart } from "../features/cart/components/MyCart.jsx";
import { MyOrderCart } from "../features/cart/components/MyOrderCart.jsx";
import { usePayment } from "../features/payment/hooks/usePayment.js";
import PageLoading from "./PageLoading.jsx";
import {FeedbackMessage} from "../components/common/FeedbackMessage.jsx"

import { MyOrderCartPlaceHoder } from "../features/placeholder/MyOrderCartPlaceHolder.jsx";
import PaymentForm from "../features/payment/components/PaymentForm.jsx";


function Carrito() {


  const { cartItems } = useCart()
  const [cuponCheck, setCuponCheck] = useState(false)
  const navigate = useNavigate()
 
  const { loading, error, setError ,handleConfirmOrder, handleConfirmPay, step, success } = usePayment()

   const currentStep = Object.freeze({
      CART: 0, PAY: 1
   });

  return (
<>
{(cartItems.length !== 0 || success) && (
    <Container fluid="xl" className="mt-4">
      <div className="h1 d-none">Carrito</div>
      <Row className="g-0" md={4}>

        {/* MY CART */}
        <Col className={`col-12 col-md-12 col-lg-12 col-xl-7`}>
       
          {step == currentStep.CART && (
           <>
           {!loading && !error && (
            <MyCart className="p-4 island">
              <p className="h5 fw-bold pt-3">
                Mi carrito({cartItems.length})
              </p>
            </MyCart>
          )}
           </>
           )}

          {step == currentStep.PAY && (
           <>
             {!loading && !error && !success && (<PaymentForm />)} 
             {error && ( 
           <Card className="p-4 island mt-2">
             <FeedbackMessage
               title="Error al procesar Pago"
               message={'No pudimos procesar tu pago. Puedes cancelar tu compra o continuar'}
               icon="bi-exclamation-triangle"
               actionLabel="acept"
               onAction={()=>setError(null)}
             />
            </Card>
             )}
           </>
          ) }


          { loading && (
            <Card className="p-4 island">
              <PageLoading />
            </Card>
          )}
          {success && (
            <Card className="p-4 island mt-2">
             <FeedbackMessage
               title="Compra existosa"
               message={'Tu orden de compra fue registrada con exito'}
               icon="bi-check-circle"
               actionLabel="submit"
               onAction={()=>navigate('/')}
             />
            </Card>
          )}
          {error && step == 0 && (
            <Card className="p-4 island mt-2">
             <FeedbackMessage
               title="Order Error"
               message={error || ''}
               icon="bi-exclamation-triangle"
               actionLabel="submit"
               onAction={()=>setError(null)}
             />
            </Card>
          )}


        </Col>

        {/* CUPON */}

        <Col className={`col-12 col-md-12 col-lg-12 col-xl-5 ${success ? '': ''}`}>
         {!success && (
          <CartCupon
             title={'Cupon'}
             check={cuponCheck}
             onCheck={setCuponCheck}
          />
          )}
          {/* MY ORDER CART  */}
          {loading || error && (
            <MyOrderCartPlaceHoder />
          )}
          {!error && !loading  && (
            <div className="sticky-md-top">
              <MyOrderCart
                handle={handleConfirmOrder}
                oncheck={setCuponCheck}
                check={cuponCheck}>
              </MyOrderCart>
              <div  style={{ marginTop: '10px' }} className="border p-3 mx-2 d-flex justify-content-center gap-3 island">
                 {!success && (
                <Button style={{ maxWidth: '200px' }}
                  onClick={() => setStep(1)} variant="light" className="small w-100 d-block border rounded-4">
                  Cancelar
                </Button>
                )}
                {step == currentStep.CART && !success && (
                <Button
                  onClick={handleConfirmOrder} variant="dark" className="small w-100 d-block border rounded-4">
                  Continuar
                </Button>
                )}
                {step == currentStep.PAY && !success && (
                <Button
                  onClick={handleConfirmPay} variant="dark" className="small w-100 d-block border rounded-4">
                  Confirma Compra
                </Button>
                 )}
                {success && (
                <Button
                   variant="success" className="small w-100 d-block border rounded-4 disabled">        <i className='bi bi-check-circle me-2'></i>
                  <span className=''>PAGADO</span>
                </Button>
                 )}
              </div>
            </div>

          )}

        </Col>
        <ToastContainer />
      </Row>
    </Container> )} { !success && cartItems.length == 0 && (
    <CartEmpty
      image={Img0}
      message="Tu carrito está vacío"
      subtext="Agregá productos para comenzar tu compra."
    />
)}
</>
  )

}

export default Carrito;

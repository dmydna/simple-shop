import PageLoading from "@common/PageLoading.jsx";
import CartCupon from "@features/cart/components/CartCupon.jsx";
import { MyCart } from "@features/cart/components/MyCart.jsx";
import { MyOrderCart } from "@features/cart/components/MyOrderCart.jsx";
import { useCart } from "@features/cart/contexts/CartContext.jsx";
import PaymentForm from "@features/payment/components/PaymentForm.jsx";
import { usePayment } from "@features/payment/hooks/usePayment.js";
import { MyOrderCartPlaceHoder } from "@features/placeholder/MyOrderCartPlaceHolder.jsx";
import CartEmpty from "@pages/Cart/PageCartEmpty.jsx";
import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageError from "../errors/PageError";
import PageSuccess from "../errors/PageSuccess";
import Img0 from "/src/assets/empty-cart.png";
import CartNavButton from "@/features/cart/components/CartNavButton";


function Cart() {


  const { cartItems } = useCart()
  const [cuponCheck, setCuponCheck] = useState(false)
  const navigate = useNavigate()
 
  const { loading, error, setError ,handleConfirmOrder, handleConfirmPay, handleCancel ,
    step, success, canceled } = usePayment()

   const currentStep = Object.freeze({
      CART: 0, PAY: 1
   });

  return (
<>
{(cartItems.length !== 0 || success) && (
    <Container fluid="xl" className="mt-4">
      <div className="h1 d-none">Cart</div>
      <Row className="g-0" md={4}>

        {/* MY CART */}
        <Col className={`col-12 col-md-12 col-lg-12 col-xl-7`}>
       
          {step == currentStep.CART && (
           <>
           {!loading && !error && (
            <MyCart className="p-4 island">
              <p className="h5 fw-bold pt-3">
                Mi cart({cartItems.length})
              </p>
            </MyCart>
          )}
           </>
           )}

          {step == currentStep.PAY && (
           <>
             {!loading && !error && !success && (<PaymentForm />)} 
           </>
          ) }


          { loading && (
            <Card className="p-4 island">
              <PageLoading />
            </Card>
          )}
          {success && (
            <Card className="p-4 island mb-2 h-100 border align-items-center justify-content-center d-flex">
             <PageSuccess
               handle={()=>navigate('/')}
             />
            </Card>
          )}
          {error && (
            <div className="p-4 island mb-2 h-100 border align-items-center justify-content-center d-flex">
             <PageError
               handle={()=>setError(null)}
             />
            </div>
          )}
          {canceled && (
            <Card className="p-4 island mt-2">
             <PageSuccess
               handle={()=>navigate('/')}
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
            <div style={{top: '66px'}} className="sticky-md-top">
              
              <MyOrderCart
                handle={handleConfirmOrder}
                oncheck={setCuponCheck}
                check={cuponCheck}>
              </MyOrderCart>

              <div  style={{ marginTop: '10px' }} className="border p-3 mx-2 d-flex justify-content-center gap-3 island">

                <CartNavButton  
                     visible={!success} 
                     handle={handleCancel}
                     variant="light"
                     title="Cancelar" 
                />

                <CartNavButton  
                     visible={step == currentStep.CART && !success} 
                     handle={handleConfirmOrder} 
                     title="Continuar" 
                />

                <CartNavButton  
                     visible={step == currentStep.PAY && !success} 
                     handle={handleConfirmPay} 
                     title="Confirmar Compra" 
                />

                <CartNavButton  
                     visible={success} 
                     variant="success disabled"
                     title="PAGADO" 
                     icon="bi bi-check-circle me-2"
                />

              </div>
            </div>

          )}

        </Col>
        <ToastContainer />
      </Row>
    </Container> )} { !success && cartItems.length == 0 && (
    <CartEmpty
      image={Img0}
      message="Tu cart está vacío"
      subtext="Agregá productos para comenzar tu compra."
    />
)}
</>
  )

}

export default Cart;

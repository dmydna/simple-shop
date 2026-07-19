import { useCart } from "@features/cart/contexts/CartContext.jsx";
import { usePayment } from "@features/payment/hooks/usePayment.js";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { CartLayout } from "../../features/cart/layout/CartLayout";
import MyOrderLayout from "../../features/cart/layout/MyOrderLayout";
import { PaymentProvider } from "../../features/payment/contexts/PaymentContext";
import MyCartLayout from "../../features/cart/layout/MyCartLayout";


function Cart() {

  const { cartItems, clearCart } = useCart()
  const methods  = usePayment()
  const successHandle = () => {
    clearCart()
    methods?.setSuccess(null)
  }

  return (
    <PaymentProvider { ...methods } >

      <CartLayout
        isEmpty={!methods?.success && cartItems?.length == 0}
      >
         <Container fluid="xl" className="mt-4">
          <div className="h1 d-none">Cart</div>
          <Row className="g-0" md={4}>

            {/* MY CART */}

            <Col className={`col-12 col-md-12 col-lg-12 col-xl-7`}>
              
              <MyCartLayout />
              
            </Col>

            {/* ORDER */}

            <Col className={`col-12 col-md-12 col-lg-12 col-xl-5`}>
              
              <MyOrderLayout />

            </Col>
            <ToastContainer />
          </Row>
        </Container>

      </CartLayout>
  </PaymentProvider>
  )

}

export default Cart;

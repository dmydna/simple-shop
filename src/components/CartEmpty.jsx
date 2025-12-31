import { useEffect } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import emptyCaryImg from "/src/assets/empty-cart.png";


function CartEmpty({ 
  image = {emptyCaryImg}, 
  message = "Tu carrito está vacío", 
  subtext = "Agregá productos para comenzar tu compra." 
}) {

  useEffect(()=>{
    window.scrollTo({top: 55});
  },[])
  return (
    <Container
      fluid="xl"
      className="min-vh-75 d-flex flex-column justify-content-center align-items-center text-center py-5"
    >
      
      <img
        src={image}
        alt="Carrito vacío"
        className="mb-5"
        style={{
          maxWidth: "260px",
          width: "100%",
          objectFit: "contain",
        }}
      />

      <h3 className="text-muted fw-semibold fs-5 text-uppercase mb-2">
        {message}
      </h3>

      <p style={{maxWidth: "250px"}} className="text-secondary mb-4">
        {subtext}
      </p>

      <Col xs={12} md={6} lg={5} xl={3}>
        <Button
          as={Link}
          to="/productos"
          variant="danger"
          className="rounded w-100 px-4 py-1 mt-4 "
        >   
           <div className="d-flex gap-3 justify-content-center align-items-center p-2">
              <i style={{scale: "1.2"}} className="bi bi-plus-lg"></i>
              <span className="fw-semibold small text-uppercase"> Agregar al carrito</span>
           </div>
        </Button>
      </Col>
    </Container>
  );
}

export default CartEmpty;

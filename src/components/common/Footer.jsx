import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from './Logo';
import { Link } from 'react-router-dom';


function Footer() {

  return (
    <footer style={{backgroundColor: "var(--bs-gray-100)"}} className="border-top text-center py-5 mt-5">
      <Container fluid="xl">
        <Row>
         <Col className='order-2 mt-4' xs={12} md={6}>
           <div className='d-flex align-items-end justify-content-center justify-content-md-end h-100'>
           <Link className='text-decoration-none text-reset' to={'/contacto'} >
             <p className='small border rounded-pill mb-0 mx-2 py-1 px-3'  
             style={{cursor:"pointer"}} >Contacto</p>
           </Link>
           <Link to={'/login'} className='text-decoration-none text-reset'>
             <p className='small border rounded-pill mb-0 mx-2 py-1 px-3' 
             style={{cursor:"pointer"}}>Mas informacion</p>
           </Link>

           </div>
         </Col>
         <Col className="order-1" xs={12} md={6}>
           <div className='text-center text-md-start  mb-2'> 
            <Logo/>
           </div>
           <div className='border-left d-block'>
           <p className="text-center text-md-start small mb-0">
            © 2025 Simple SHOP. Todos los derechos reservados</p>
           </div>
         </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

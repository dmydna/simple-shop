import React, { useEffect, useState } from "react";
import { Button, Container, Row, Form, Modal } from "react-bootstrap";
import CategoryItem from "../components/CategoryItem.jsx";

import Img1 from "../assets/print-product.png";
import Img2 from '../assets/delivery-time.png';
import Img3 from "../assets/expend.png";
import Img4 from '../assets/paper.png';
import Img5 from "../assets/t-shirt.png"

const Dashboard = () => {

    return (
        <Container className="mt-4">
          <div className="w-100 d-flex flex-wrap mt-2 mb-4">
             <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
                Dashboard
             </span>
             <span style={{lineHeight: '2.3rem'}} className="text-secondary">
              Panel de administracion
             </span>
           </div>
           <Row className={`mb-3 d-md-flex`}> 
             <CategoryItem 
               className="border ps-0"
               category="your listings"
               image={Img1} 
               link={`/dashboard/listing`}
             />
             <CategoryItem 
               // variant="primary"
               className="border"
               category="your products"
               image={Img5} 
               link={`/dashboard/products`}
             />
             <CategoryItem 
               // variant="success"
               className="border"
               category="your clients"
               image={Img3} 
               link={`/dashboard/clients`}
             />
             <CategoryItem 
               // variant="dark"
               className="border pe-0"
               category="your orders" 
               image={Img4} 
               link={`/dashboard/orders`}
             />
           </Row>
        </Container>
    )
}

export default Dashboard;
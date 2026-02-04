import React, { useEffect, useState } from "react";
import { Button, Container, Row, Form, Modal } from "react-bootstrap";
import CategoryItem from "../components/common/CategoryItem.jsx";

import Img1 from "../assets/print-product.png";
import Img2 from '../assets/delivery-time.png';
import Img3 from "../assets/expend.png";
import Img4 from '../assets/paper.png';
import Img5 from "../assets/t-shirt.png"
import Img6 from "../assets/draft.png"
import { useListings } from "../contexts/ListingContext.jsx";


const Dashboard = () => {

    const {totalListings} = useListings()

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
               className="border ps-0 bg-soft-primary"
               category="your posts"
               image={Img1} 
               link={`/dashboard/listing`}
             />
             <CategoryItem 
               // variant="primary"
               className="border bg-soft-primary"
               category="your products"
               image={Img5} 
               link={`/dashboard/products`}
             />
             <CategoryItem 
               // variant="success"
               className="border bg-soft-primary"
               category="your clients"
               image={Img3} 
               link={`/dashboard/clients`}
             />
             <CategoryItem 
               // variant="dark"
               className="border pe-0 bg-soft-primary"
               category="your orders" 
               image={Img4} 
               link={`/dashboard/orders`}
             />
             {totalListings == 0 ? (
                <CategoryItem 
                   // variant="dark"
                   className="border pe-0 bg-soft-primary"
                   category="Dev Posts" 
                   image={Img6} 
                   link={`/dashboard/draft`}
                />
             ) : ''}

           </Row>
        </Container>
    )
}

export default Dashboard;
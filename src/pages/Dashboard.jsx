import React, { useEffect, useState } from "react";
import { Button, Container, Row, Form, Modal } from "react-bootstrap";
import CategoryItem from "../components/common/CategoryItem.jsx";

import Img1 from "../assets/print-product.png";
import Img2 from '../assets/delivery-time.png';
import Img3 from "../assets/expend.png";
import Img4 from '../assets/paper.png';
import Img5 from "../assets/t-shirt.png"
import Img6 from "../assets/draft.png"
import { useListingContext } from "../features/listing/contexts/ListingContext.jsx";
import { useDevContext } from "../dev/contexts/DevContext.jsx";


const Dashboard = ({col}) => {

    const {devMode} = useDevContext()

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
               col={col}
               className="border ps-0 rounded-4"
               category="your posts"
               description="administrar anuncios"
               image={Img1} 
               link={`/dashboard/listing`}
             />
             <CategoryItem 
               // variant="primary"
                col={col}
               className="border rounded-4"
               description="administrar productos"
               category="your products"
               image={Img5} 
               link={`/dashboard/product`}
             />
             <CategoryItem 
               // variant="success"
               col={col}
               className="border rounded-4"
               category="usuarios"
               description="administrar usuarios"
               image={Img3} 
               link={`/dashboard/clients`}
             />
             <CategoryItem 
               // variant="dark"
               col={col}
               className="border pe-0 rounded-4 disabled"
               category="your orders" 
               description="administrar pedidos"
               image={Img4} 
               link={`#`}
             />
             {devMode ? (
                <CategoryItem 
                   // variant="dark"
                   col={col}
                   className="border pe-0"
                   category="Dev Panel" 
                   description="cosas de dev"
                   image={Img6} 
                   link={`/dashboard/dev`}
                />
             ) : ''}

           </Row>
        </Container>
    )
}

export default Dashboard;
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Form, Modal } from "react-bootstrap";
import CategoryItem from "../../../components/common/CategoryItem.jsx";
import { handleBulk, ImgGenApi, color, symbol } from "../../../dev/utils.js";
import { useListing } from "../../listing/hooks/useListing.js";
import { useListingContext } from "../../listing/contexts/ListingContext.jsx";
import { useProductContext } from "../../product/contexts/ProductContext.jsx";
import { useUserContext } from "../../user/contexts/UserContext.jsx";

const Activity = ({col, container=true}) => {


  const {totalElements: totalPublications} = useListingContext()
  const {totalElements: totalProducts} = useProductContext()
  const {totalElements: totalUsers} = useUserContext()
    

    return (
        <div className={` ${container ? 'mt-4 container' : '' }`}>
          <div className="w-100 d-flex flex-wrap mt-2 mb-4">
             <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
                Actividad
             </span>
             <span style={{lineHeight: '2.3rem'}} className="text-secondary">
              ver actividad reciente
             </span>
           </div>
           <Row className={`mb-3 d-md-flex`}> 
             <CategoryItem 
               col={col}
               className="border ps-0 rounded-4"
               category="publicaciones"
               description="cantidad de publicaciones"
               link={`/dashboard/listing`}
               image={
                ImgGenApi("150x150", color.melon, totalPublications > 99 ? '%2B99' : totalPublications, 50, "0000")
              } 
             />
             <CategoryItem 
               // variant="primary"
               col={col}
               category="productos"
               className="border rounded-4"
               description="cantidad de productos"
               link={`/dashboard/product`}
               image={
                ImgGenApi("150x150", color.lila, totalProducts > 99 ? '%2B99' : totalProducts, 50, "0000")
               } 
             />
             <CategoryItem 
               // variant="success"
               col={col}
               className="border rounded-4"
               category="usuarios"
               description="cantidad de usuarios"
               image={
                ImgGenApi("150x150", color.durazno, totalUsers > 99 ? '%2B99' : totalUsers, 50, "0000")} 
               link={`/dashboard/clients`}
             />
             <CategoryItem 
               // variant="dark"
               col={col}
               category="orders"
               className="border pe-0 rounded-4"
               description="cantidad de ordenes"
               link={`#`}
               image={ImgGenApi("150x150", color.menta, '0', 50, "0000")} 
             />
           </Row>
        </div>
    )
}

export default Activity;
import React, { useMemo } from "react";
import { Row } from "react-bootstrap";
import { useMatch } from "react-router-dom";
import CategoryItem from "./CategoryItem";

import { useListingContext } from "../../features/listing/contexts/ListingContext.jsx";
import { useUIContext } from "../../contexts/UIContext";
import Img3 from "../../assets/dressing-table.png";
import Img4 from '../../assets/grocery.png';
import Img1 from "../../assets/lipstick.png";
import Img2 from '../../assets/perfume.png';
import { category } from "../../utils/posts.js";

function CategoryNav(){

    const categoryMatch = useMatch("/productos/category/:category");
    const searchMatch = useMatch("/productos/search/:product");
    const {showFilter} = useUIContext()
    const {listings, setFilters} = useListingContext()


    const handleClick = (category) => {
      setFilters({ page: 0, categories : [category] })
    }
  
    
    
    return(
       <Row className={`mb-3  ${showFilter ? 'd-md-flex' : ''}`}> 
        <CategoryItem 
          className="border ps-0 rounded-4"
          image={Img1} 
          category={category.BEAUTY}
          description='salud e higiene' 
          link={`/productos?category=${category.BEAUTY}`}
          handleClick={() => handleClick(category.BEAUTY)}
        />
        <CategoryItem 
          // variant="primary"
          className="border rounded-4"
          image={Img2} 
          description='perfumeria' 
          category={category.FRAGRANCE} 
          link={`/productos?category=${category.FRAGRANCE}`}
          handleClick={() => handleClick(category.FRAGRANCE)}
        />
        <CategoryItem 
          // variant="success"
          className="border rounded-4"
          image={Img3} 
          category={category.FURNITURE} 
          description='oficina y hogar' 
          link={`/productos?category=${category.FURNITURE}`}
          handleClick={() => handleClick(category.FURNITURE)}
        />
        <CategoryItem 
          // variant="dark"
          className="border pe-0 rounded-4"
          image={Img4} 
          description='comercio y almacen' 
          category={category.GROCERIES} 
          link={`/productos?category=${category.GROCERIES}`}
          handleClick={() => handleClick(category.GROCERIES)}
        />
      </Row>
         
    )

}

export default CategoryNav;
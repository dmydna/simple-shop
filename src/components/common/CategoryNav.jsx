import React, { useMemo } from "react";
import { Row } from "react-bootstrap";
import { useMatch } from "react-router-dom";
import CategoryItem from "./CategoryItem";

import { useListings } from "../../contexts/ListingContext";
import { useUIContext } from "../../contexts/UIContext";
import Img3 from "../../assets/dressing-table.png";
import Img4 from '../../assets/grocery.png';
import Img1 from "../../assets/lipstick.png";
import Img2 from '../../assets/perfume.png';


function CategoryNav(){

    const categoryMatch = useMatch("/productos/category/:category");
    const searchMatch = useMatch("/productos/search/:product");
    const {showFilter} = useUIContext()
    const {products} = useListings()

    const  categories = useMemo(()=>(
      [...new Set(products.map(p => p.category))]
    ),[products])
    
    
    return(
       <Row className={`mb-3 d-none  ${showFilter ? 'd-md-flex' : ''}`}> 
        <CategoryItem 
          className="border ps-0"
          category={categories[0]} 
          image={Img1} 
          link={`/productos/category/${categories[0]}`}
        />
        <CategoryItem 
          // variant="primary"
          className="border"
          category={categories[1]} 
          image={Img2} 
          link={`/productos/category/${categories[1]}`}
        />
        <CategoryItem 
          // variant="success"
          className="border"
          category={categories[2]} 
          image={Img3} 
          link={`/productos/category/${categories[2]}`}
        />
        <CategoryItem 
          // variant="dark"
          className="border pe-0"
          category={categories[3]} 
          image={Img4} 
          link={`/productos/category/${categories[3]}`}
        />
      </Row>
         
    )

}

export default CategoryNav;
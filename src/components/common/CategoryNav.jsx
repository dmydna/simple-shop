import { Row } from "react-bootstrap";
import CategoryItem from "./CategoryItem";

import Img3 from "../../assets/dressing-table.png";
import Img4 from '../../assets/grocery.png';
import Img1 from "../../assets/lipstick.png";
import Img2 from '../../assets/perfume.png';
import { category } from "@utils/enums.js";
import { useParams } from "react-router-dom";


function CategoryNav({className}){

    const {filter} = useParams();

    return(
       <Row className={`mb-3 ${className} ${filter ? 'd-md-flex' : ''}`}> 
        <CategoryItem 
          className="border ps-0 rounded-4"
          image={Img1} 
          category={category.BEAUTY}
          description='salud e higiene' 
          link={`/products?category=${category.BEAUTY}`}
        />
        <CategoryItem 
          // variant="primary"
          className="border rounded-4"
          image={Img2} 
          description='perfumeria' 
          category={category.FRAGRANCES} 
          link={`/products?category=${category.FRAGRANCE}`}
        />
        <CategoryItem 
          // variant="success"
          className="border rounded-4"
          image={Img3} 
          category={category.FURNITURE} 
          description='oficina y hogar' 
          link={`/products?category=${category.FURNITURE}`}
        />
        <CategoryItem 
          // variant="dark"
          className="border pe-0 rounded-4"
          image={Img4} 
          description='comercio y almacen' 
          category={category.GROCERIES} 
          link={`/products?category=${category.GROCERIES}`}
        />
      </Row>
         
    )

}

export default CategoryNav;
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CategoryItem from "./CategoryItem";
import Img3 from "../../assets/dressing-table.png";
import Img4 from '../../assets/grocery.png';
import Img1 from "../../assets/lipstick.png";
import Img2 from '../../assets/perfume.png';
import { category } from "../../utils/posts.js";

function CategoryCarrousel({className}){
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className={`${className}`} activeIndex={index} onSelect={handleSelect}>
      
      <Carousel.Item>
        <CategoryItem 
          col='col-12 col-md-12 col-lg-3'
          className="border ps-0 rounded-4"
          image={Img1} 
          category={category.BEAUTY}
          description='salud e higiene' 
          link={`/productos?category=${category.BEAUTY}`}
          handleClick={() => handleClick(category.BEAUTY)}
        />
      </Carousel.Item>  
      <Carousel.Item>
        <CategoryItem 
          // variant="primary"
          col='col-12 col-md-12 col-lg-3'
          className="border rounded-4"
          image={Img2} 
          description='perfumeria' 
          category={category.FRAGRANCE} 
          link={`/productos?category=${category.FRAGRANCE}`}
          handleClick={() => handleClick(category.FRAGRANCE)}
        />
      </Carousel.Item>
      <Carousel.Item>
        <CategoryItem 
          // variant="success"
          col='col-12 col-md-12 col-lg-3'
          className="border rounded-4"
          image={Img3} 
          category={category.FURNITURE} 
          description='oficina y hogar' 
          link={`/productos?category=${category.FURNITURE}`}
          handleClick={() => handleClick(category.FURNITURE)}
        />
      </Carousel.Item>
      <Carousel.Item>
        <CategoryItem 
          // variant="dark"
          col='col-12 col-md-12 col-lg-3'
          className="border pe-0 rounded-4"
          image={Img4} 
          description='comercio y almacen' 
          category={category.GROCERIES} 
          link={`/productos?category=${category.GROCERIES}`}
          handleClick={() => handleClick(category.GROCERIES)}
        />
      </Carousel.Item>
    </Carousel>
  );

}

export default CategoryCarrousel;




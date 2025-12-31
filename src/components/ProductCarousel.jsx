import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useWindowsWidth } from '../contexts/useWindowSize';
import CardProduct from './CardProduct';
import { useListings } from '../contexts/ListingContext';



function ProductCarousel({children, filterFn, col, className}) {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const { products, filtered } = useListings()


  const [chunkSize, setChunkSize] = useState()
  const width = useWindowsWidth()

  //  copia local de filtered
  const cfiltered = useMemo(()=>{
     return products.filter(p => filterFn(p))
  }, [products, chunkSize])
 
  
   
  const [visibleProducts, setVisibleProducts] = useState(cfiltered);

  useEffect(() => {
    if (width < 576){
      setVisibleProducts(cfiltered.slice(0,3))
      setChunkSize(1);
    } 
    else if(width < 992){
      setVisibleProducts(cfiltered.slice(0,10))
      setChunkSize(2)
    }
    else{ 
      setVisibleProducts(cfiltered)
      setChunkSize(col);
    }
  }, [width, cfiltered]);

  const slides = [];
  for (let i = 0; i < visibleProducts.length; i += chunkSize) {
    slides.push(visibleProducts.slice(i, i + chunkSize));
  }


  return (

    <div className={`${className} rounded  h-100`}>
      <div className='d-flex justify-content-between'>
        <div>
         {children} {/* header */}
        </div>
        <div className="d-flex justify-content-center mt-3 gap-2">
          {slides.map((g, i) => (
            <Button
              key={i}
              variant={i === index ? 'primary' : 'outline-secondary'}
              size="sm"
              onClick={() => setIndex(i)}
              className="rounded-circle"
              style={{ width: 12, height: 12, padding: 0 }}
            />
          ))}
        </div>
      </div>
      
    <Carousel
    indicators={false} variant="dark" activeIndex={index} onSelect={handleSelect}>
      {slides.map((group, index)=>(
          <Carousel.Item>
          <div className="row d-flex justify-content-around"> {/* Use flexbox for item arrangement */}
            {group.map((p)=>(
              <CardProduct 
                className={'border-0'} 
                id={p.id} 
                image={p.thumbnail} 
                title={p.title} 
                stock={p.stock} 
                price={p.price}
                discount={p.discountPercentage}
              />
            ))}
          </div>
        </Carousel.Item>        
      ))}
  </Carousel>
    </div>



  );
}

export default ProductCarousel;
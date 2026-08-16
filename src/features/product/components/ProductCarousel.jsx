import { useWindowsWidth } from '@contexts/useWindowSize.jsx';
import { useListing } from "@f/listing/hooks/useListing.js";
import ProductCard from '@f/product/components/ProductCard.jsx';
import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';





// TODO: actualizar filtro 
function ProductCarousel({ children, filter, maxCols, maxElems, className, imgSize = 180, blacklist = [] }) {

  const [index, setIndex] = useState(0);
  const [chunkSize, setChunkSize] = useState(maxCols || 4)
  const width = useWindowsWidth()

  const { listings, setFilters } = useListing({ autofetch: true }) //LOCAL


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    setFilters(filter)
    // console.log(filter)
  }, [filter])


   
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    if (width < 576) {
      setVisibleProducts(listings.slice(0, 3))
      setChunkSize(1);
    } 
    else if (width < 992) {
      setVisibleProducts(listings.slice(0, 10))
      setChunkSize(2)
    }
    else { 
      setVisibleProducts(listings)
      setChunkSize(maxCols);
    }

    if (blacklist && blacklist.length > 0) {
      setVisibleProducts(prev => prev.filter(
        (item) => {
          for (let b of blacklist) {
            if (b === item.id) {
              return false
            }
          }
          return true;
        }  
      ))      
    }

  }, [width, listings, maxCols]);

  const slides = useMemo(() => {


    if (visibleProducts.length === 0) return [];
    
    const arr = [];
    // Recorremos la lista original de i en i según el chunkSize
    for (let i = 0; i < visibleProducts.length; i += chunkSize) {

      const chunk = [];
      // Para cada grupo, tomamos exactamente 'chunkSize' elementos
      for (let j = 0; j < chunkSize; j++) {

        // (i + j) % length hace que cuando lleguemos al final, 
        // el índice vuelva a 0, 1, 2...
        const index = (i + j) % visibleProducts.length;

        // if(currentListing && currentListing.id == visibleProducts[index]?.id){
        //   continue
        // }

        chunk.push(visibleProducts[index]);

      }
      arr.push(chunk);
    }

    return arr;
  }, [visibleProducts, chunkSize]);


  return (

    <>
      {slides?.length > 0 && (
        <div className={`row ${className} rounded  h-100`}>
          <div className='col-12 d-flex justify-content-between'>
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

          <Carousel className="col-12"
            indicators={false} variant="dark" activeIndex={index} onSelect={handleSelect}>
            {slides.map((group, index) => (
              <Carousel.Item key={index}>
                <div className="row d-flex justify-content-around">
                  {group.map((p) => (
                    <ProductCard
                      {...p}
                      key={p.id}
                      className={'border-0'}
                      imgSize={imgSize}
                    />
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

      )}
       
    </>
        
  );
}

export default ProductCarousel;
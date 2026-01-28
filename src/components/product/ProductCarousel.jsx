import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useListings } from '../../contexts/ListingContext';
import { useWindowsWidth } from '../../contexts/useWindowSize';
import CardProduct from './CardProduct';
import { listingService } from '../../services/listingService';
import { useFetchListings } from '../../contexts/useFetchListings';




function ProductCarousel({children, filterFn, col, className, imgSize = 180}) {

  const [index, setIndex] = useState(0);
  const [chunkSize, setChunkSize] = useState(col)
  const width = useWindowsWidth()

  const {listings, setFilters} = useFetchListings(8) //LOCAL
  // Evitados mostrar el current Listing
  const {currentListing} = useListings()               //Global

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(()=>{
    setFilters(filterFn)
    console.log(filterFn)
  },[filterFn])


   
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    if (width < 576){
      setVisibleProducts(listings.slice(0,3))
      setChunkSize(1);
    } 
    else if(width < 992){
      setVisibleProducts(listings.slice(0,10))
      setChunkSize(2)
    }
    else{ 
      setVisibleProducts(listings)
      setChunkSize(col);
    }
  }, [width, listings]);

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
        if(currentListing?.id == visibleProducts[index]?.id){
          continue
        }
        chunk.push(visibleProducts[index]);
      }
      arr.push(chunk);
    }

    console.log(arr)
    return arr;
  }, [visibleProducts, chunkSize]);


  return (

       <>
       { slides?.length > 0 && (
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
                    <CardProduct
                      key={p.id}
                      className={'border-0'}
                      id={p.id}
                      hash={p.hash}
                      image={p.thumbnail}
                      imgSize={imgSize}
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

       )}
       
       </>
        
  );
}

export default ProductCarousel;
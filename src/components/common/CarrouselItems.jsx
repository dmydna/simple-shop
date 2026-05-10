import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';


export default function CarouselItems({ items, title, children, className, chunkSize = 3, order = false }) {

  const [index, setIndex] = useState(0);


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };


  const slides = useMemo(() => {
    if (items.length === 0) return [];
    const arr = [];
    // Recorremos la lista original de i en i según el chunkSize
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = [];
      for (let j = 0; j < chunkSize; j++) {
        //FIXME produce chunks completos con repeditos 
        const index = (i + j) % items.length;
        chunk.push(items[index]);
      }
      arr.push(chunk);
    }
    return arr;
  }, [items, chunkSize]);



  useEffect(() => {
    console.log("slides:", slides)
  }, [slides])

  return (

    <div className={`row ${className}  position-relative rounded  h-100`} >
      <div className={`top-0 col-12 d-flex justify-content-${order ? 'center' : 'between'}  order-${order ? 2 : 1}`}>
        {/* carrousel dots */}
        <div style={{ zIndex: 99 }} className="d-flex justify-content-between flex-fill align-items-center mb-2">
          <div className="fs-5 fw-medium">{title}</div>
          <div className='d-flex gap-2'>
            {slides && slides.length > 1 && slides.map((g, i) => (
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
      </div>

      {slides?.length > 1 &&
        <Carousel className={`col-12 order-${order ? 1 : 2}`}
          indicators={false} variant="dark" activeIndex={index} onSelect={handleSelect}>
          {slides?.map((chunk, index) => (
            <Carousel.Item key={index}>
              {chunk.map((item) => (
                <> {children(item)} </>
              ))}
            </Carousel.Item>
          ))}
        </Carousel>
      }
      {slides?.length == 1 &&
        <div className=" d-flex justify-content-around">
          {slides?.map((chunk, index) => (
            <Carousel.Item key={index}>
              {chunk.map((item) => (
                <> {children(item)} </>
              ))}
            </Carousel.Item>
          ))}
        </div>
      }
    </div>
  );
}

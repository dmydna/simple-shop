import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';


function CarouselImages({images, children, col, className}) {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (

    <div className={`${className} rounded  h-100`}>
      <div className='d-flex justify-content-between'>
        <div>
         {children} {/* header */}
        </div>
          <div className="d-flex justify-content-center mt-3 gap-2">
          {images.length > 1 && images.map((g, i) => (
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
      
    {images.length > 1 && 
    <Carousel
    indicators={false} variant="dark" activeIndex={index} onSelect={handleSelect}>
      {images.map((img, index)=>(
          <Carousel.Item>
          <div className=" d-flex justify-content-around"> 
              <img src={img} height={300} />
          </div>
        </Carousel.Item>        
      ))}
     </Carousel>
    }
    {images.length == 1 && 
      <div className=" d-flex justify-content-around"> 
          <img src={images[0]} height={300} />
      </div>
    }
    </div>
  );
}

export default CarouselImages;
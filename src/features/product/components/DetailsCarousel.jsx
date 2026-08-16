import { useMemo } from 'react';
import { useWindowsWidth } from '@contexts/useWindowSize.jsx';

function DetailsCarousel({children, filterFn, count, className, images}){



    const width = useWindowsWidth();
    
    const colClass = useMemo(() => {
      if (count >= 4) return 'col-lg-3 col-md-4 col-sm-6 col-12'
    
      const fix = Math.floor(12 / count)
      return `col-lg-${fix} col-md-${fix} col-sm-12 col-12`
    }, [count])



    return(
      <div className={`${className} rounded  h-100 p-4`}>
        <div className='row'>
          {children}
          {images.map((p) => (
              <img key={p.id} src={p.thumbnail} />
          ))}
        </div>
        </div>

    )
}
export default DetailsCarousel;
import { useMemo } from 'react';
import { useWindowsWidth } from '../contexts/useWindowSize';
import CardProduct from './CardProduct';
import { useListings } from '../contexts/ListingContext';

function ProductSection({children, filterFn, count, className, borders}){

    const { products } = useListings() 

    const width = useWindowsWidth()
    const cfiltered = useMemo(()=>{
       const filtered = products.filter(p => filterFn(p))
       return count ? filtered.slice(0, (count)) : filtered
     }, [products])

    
    const colClass = useMemo(() => {
      if (count >= 4) return 'col-lg-3 col-md-4 col-sm-6 col-12'
    
      const fix = Math.floor(12 / count)
      return `col-lg-${fix} col-md-${fix} col-sm-12 col-12`
    }, [count])



    return(
      <div className={`${className} rounded  h-100 p-4`}>
        <div className='row'>
          {children}
        {cfiltered.map((p, i) => (
            <CardProduct 
              className={'border-0 m-0 p-0'} 
              id={p.id} 
              image={p.thumbnail} 
              title={p.title} 
              stock={p.stock} 
              price={p.price}
              cols={colClass}
              discount={p.discountPercentage}
            />
        ))}
        </div>
        </div>

    )
}
export default ProductSection;
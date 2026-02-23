import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import {useListing} from "../../listing/hooks/useListing.js";

function ProductSection({children, filterFn, count, className, borders}){

    const { listings, setFilters } = useListing(count)

    useEffect(()=>{
      setFilters(filterFn)
    },[filterFn])


    
    const colClass = useMemo(() => {
      if (count >= 4) return 'col-lg-3 col-md-4 col-sm-6 col-12'
    
      const fix = Math.floor(12 / count)
      return `col-lg-${fix} col-md-${fix} col-sm-12 col-12`
    }, [count])



    return(
      <div className={`${className} rounded  h-100 p-4`}>
        <div className='row'>
          {children}
        {listings.map((p) => (
            <ProductCard
              key={p.id}
              className={'border-0 m-0 p-0'} 
              id={p.id} 
              hash={p.hash}
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
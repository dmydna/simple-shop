import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import {useListing} from "../../listing/hooks/useListing.js";

function ProductSection({children, maxElems=1 ,filter, maxCols, className, borders}){

    const { listings, setFilters } = useListing({autofetch: true, size: maxElems})

    useEffect(()=>{
      setFilters(filter)
    },[filter])


    
    const colClass = useMemo(() => {
      if (maxCols >= 4) return 'col-lg-3 col-md-4 col-sm-6 col-12'
    
      const fix = Math.floor(12 / maxCols)
      return `col-lg-${fix} col-md-${fix} col-sm-12 col-12`
    }, [maxCols])



    return(
      <div className={`${className} rounded  h-100 p-4`}>
        <div className='row'>
          {children}
        {listings.slice(0, maxElems).map((p) => (
            <ProductCard
              {...p}
              key={p.id}
              className={'border-0 m-0 p-0'} 
              cols={colClass}
            />
        ))}
        </div>
        </div>

    )
}
export default ProductSection;
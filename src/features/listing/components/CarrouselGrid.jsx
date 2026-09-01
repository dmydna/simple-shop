import ListingCard from '@/features/listing/components/ListingCard.jsx';
import { useWindowsWidth } from '@contexts/useWindowSize.jsx';
import { useListing } from "@f/listing/hooks/useListing.js";
import { useEffect, useMemo, useState } from 'react';
import { CarrouselChunk } from '../../../components/common/CarrouselChunk';
import FetchLoader from '@/components/common/FetchLoader';


function CarouselGrid({ children, filter, elems, maxCols, className, imgSize = 180, blacklist = [] }) {

  const [chunkSize, setChunkSize] = useState(maxCols || 4)
  const width = useWindowsWidth()

  const { listings, setFilters, loading, error } = useListing({ autofetch: true }) //LOCAL

  useEffect(()=>{
    setFilters(filter)
  },[filter])

  useEffect(() => {
    // Segun la vista:
    if (width < 576) {
      // Cambiar la cantidad total de elementos 
      setFilters(prev => ({...prev, size: 3}) )
      // Cambiar la cantidad de elementos por slide 
      setChunkSize(1);
    } 
    else if (width < 992) {
      // Cambiar la cantidad total de elementos 
      setFilters(prev => ({...prev, size: 10}) )
      // Cambiar la cantidad de elementos por slide
      setChunkSize(2)
    }
    else { 
      setChunkSize(maxCols);
    }
  }, [width, elems, maxCols]);


  const visibleListings = useMemo(()=>{
      return listings.filter( (item) => {
        for (let b of blacklist) {
          if (b === item.id) return false
        }
        return true;
    })
  },[listings, blacklist])

  return (

    <FetchLoader
      loading={loading}
      error={error}
    >

        <CarrouselChunk
            title={children}
            className={className}
            chunkSize={chunkSize}
            elems={visibleListings} >
            {(item) => (
                <ListingCard
                    className={"border-0"}
                    key={item.id}
                    {...item}
                    imgSize={imgSize}
                />
            )}
        </CarrouselChunk>

    </FetchLoader>

        
  );
}

export default CarouselGrid;
import { CarrouselChunk } from '@/components/common/CarrouselChunk';
import FetchLoader from '@/components/common/FetchLoader';
import ListingCard from '@/features/listing/components/ListingCard.jsx';
import { statsService } from '@/features/stats/services/statsService.js';
import { useFetchTrigger } from '@/hooks/useFetchTrigger.js';
import { useWindowsWidth } from '@contexts/useWindowSize.jsx';
import { useEffect, useState } from 'react';



// TODO: actualizar filtro 
function TopCarousel({ children, top,maxCols, maxElems, className, imgSize = 180}) {


  const [limit, setLimit] = useState(maxElems);
  const {data, loading, error} = useFetchTrigger({ 
    fetchMethod: statsService.getTop, 
    initialTriggers: {limit:limit, type:top} 
  })

  const [chunkSize, setChunkSize] = useState(maxCols || 4)
  const width = useWindowsWidth()

  useEffect(() => {
    if (width < 576) {
      setLimit(3)
      setChunkSize(1);
    } 
    else if (width < 992) {
      setLimit(10)
      setChunkSize(2)
    }
    else { 
      setLimit(maxElems)
      setChunkSize(maxCols);
    }

  }, [width, data, maxCols]);

  return (

    <FetchLoader
      loading={loading}
      error={error}
    >

        <CarrouselChunk
            title={children}
            className={className}
            chunkSize={chunkSize}
            elems={data} >
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

export default TopCarousel;
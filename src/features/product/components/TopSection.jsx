import { useMemo } from 'react';
import ProductCard from '@f/product/components/ProductCard.jsx';
import PageLoading from '@features/fallback/PageLoading.jsx';
import { statsService } from '@/features/stats/services/statsService.js';
import { useFetchTrigger } from '@/hooks/useFetchTrigger.js';
import PageError from '@/features/fallback/PageError.jsx';


function TopSection({ children, maxElems = 1, top, maxCols, className }) {

    const {data, loading, error} = useFetchTrigger({ 
        fetchMethod: statsService.getTop, 
        initialTriggers: {limit:maxElems, type:top} 
    })

    // Lógica de clases de columna (sin cambios, solo limpieza)
    const colClass = useMemo(() => {
        if (maxCols >= 4) return 'col-lg-3 col-md-4 col-sm-6 col-12';
        const fix = Math.floor(12 / maxCols);
        return `col-lg-${fix} col-md-${fix} col-sm-12 col-12`;
    }, [maxCols]);


    if (loading) {
        return (
        <div className={className}>
          <PageLoading />
        </div>
        );
    }

    if (error) {
        return (
        <div className={className}>
          <PageError error={error} />
        </div>
        );
    }

    return (
        <div className={`${className} rounded h-100 p-4`}>
            <div className='row'>
                {children}
                {data?.map((p) => (
                    <ProductCard
                        {...p}
                        key={p.id}
                        className='border-0 m-0 p-0'
                        cols={colClass}
                    />
                ))}
            </div>
        </div>
    );
}

export default TopSection;
import PageEmpty from '@/pages/fallback/PageEmpty.jsx';
import PageError from '@/pages/fallback/PageError';
import PageLoading from '../../pages/fallback/PageLoading';

export default function DataView({ 
    children, 
    data, 
    error,
    onRetry,
    loading, 
    emptyIcon,
    emptyMessage 
}) {

    const isEmpty = data?.length === 0 ;

    if(loading) return <PageLoading />
    if(error)   return <PageError error={error}  handle={() => onRetry()} />
    if(isEmpty) return <PageEmpty ico={emptyIcon} message={emptyMessage}/>

    return <>  {children} </>;
}
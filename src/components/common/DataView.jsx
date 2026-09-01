import FallbackEmpty from '@/features/fallback/components/FallbackEmpty.jsx';
import FallbackError from '@/features/fallback/components/FallbackError';
import PageLoading from '@/features/fallback/pages/PageLoading';
import { useNavigate } from 'react-router-dom';

export default function DataView({ 
    children, 
    data, 
    error,
    onRetry,
    loading, 
    emptyIcon,
    emptyVariant,
    emptyMessage, 
    emptyConfig,
    listFix=false,
}) {

    const isEmpty = data?.length === 0 ;
    const navigate = useNavigate();
 

    const heightFix = listFix ? 'min-vh-md-70' : '';

    if (loading) return <PageLoading />
    if (error?.code === 'TOKEN_EXPIRED') {
      navigate('/home?dialog=expiredsession')
      return  <>{children}</>
    }
    if(error)   return <FallbackError fixes error={error}  handle={() => onRetry()} />
    if(isEmpty) return <FallbackEmpty fixes variant={emptyVariant} ico={emptyIcon} message={emptyMessage}/>

    return <>  {children} </>;
}
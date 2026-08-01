import PageEmpty from '@features/fallback/PageEmpty.jsx';
import PageError from '@features/fallback/PageError';
import PageLoading from '@features/fallback/PageLoading';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    if(loading) return <PageLoading />
    if (error?.code === 'TOKEN_EXPIRED') {
      navigate('/home?dialog=expiredsession')
      return  <>{children}</>
    }
    if(error)   return <PageError error={error}  handle={() => onRetry()} />
    if(isEmpty) return <PageEmpty ico={emptyIcon} message={emptyMessage}/>

    return <>  {children} </>;
}
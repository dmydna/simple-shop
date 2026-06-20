import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

function BreadCrumb({category, tags}) {
    const migasDePan = tags.length >= 2 ?  tags.slice(0,1) : tags
    const BASE_URL = '/products'
    return (
        <Breadcrumb className='small'>
            <Breadcrumb.Item>
                <Link to="/" >Home</Link>
            </Breadcrumb.Item>
            { category && 
                <Breadcrumb.Item>
                     <Link to={`${BASE_URL}?category=${category}`}>{category}</Link>
                </Breadcrumb.Item>}
            { migasDePan.map((tag, index) => {
                if(tag != category){
                  return ( 
                  <Breadcrumb.Item  key={`bc-item-${index}`}>
                    <Link to={`${BASE_URL}/filter?tags=${tag}&page=1`}>
                       {tag}
                    </Link>
                  </Breadcrumb.Item>)
                }
               
            } )}
        </Breadcrumb>
    );
}

export default BreadCrumb;
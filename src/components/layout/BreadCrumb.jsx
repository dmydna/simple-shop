import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';


// FIXME: no filtra category desde BreadCrumb
function BreadCrumb({ category, tags }) {
    const migasDePan = tags.length >= 2 ? tags.slice(0, 1) : tags
    const BASE_URL = '/products/filter'
    return (
        <Breadcrumb className='small'>
            <Breadcrumb.Item
                linkAs={Link} 
                linkProps={{ to: '/' }}
            >
                Home
            </Breadcrumb.Item>
            {category && 
                <Breadcrumb.Item 
                    linkAs={Link} 
                    linkProps={{ to: `${BASE_URL}?category=${category}` }}
                >
                    {category}
                </Breadcrumb.Item>}
            {migasDePan.map((tag, index) => {
                if (tag != category) {
                    return ( 
                        <Breadcrumb.Item  
                            key={`bc-item-${index}`}
                            linkAs={Link} 
                            linkProps={{ to: `${BASE_URL}?tags=${tag}&filter=true&page=1` }}
                        >
                            {tag}
                        </Breadcrumb.Item>)
                }
               
            })}
        </Breadcrumb>
    );
}

export default BreadCrumb;
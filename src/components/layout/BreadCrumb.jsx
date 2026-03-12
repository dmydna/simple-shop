import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadCrumb({category, tags}) {
    const migasDePan = tags.length >= 2 ?  tags.slice(0,1) : tags
    return (
        <Breadcrumb >
            <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">{category || "Library"}</Breadcrumb.Item>
            { migasDePan.map((tag, index) => (
               <Breadcrumb.Item key={`bc-item-${index}`}>
                   {tag}
               </Breadcrumb.Item>
            )) }
        </Breadcrumb>
    );
}

export default BreadCrumb;
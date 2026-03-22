import Accordion from 'react-bootstrap/Accordion';
import {useProductCrud} from "../contexts/ProductCrudContex.jsx";

function AccordionInfo({children, eventKey, className}) {
    const {currentProduct} = useProductCrud();

    return (
    <Accordion.Item className={className} eventKey={eventKey || "0"}>
        <Accordion.Header>{children}</Accordion.Header>
        <Accordion.Body>
            <p className='h4'>{currentProduct.name}</p>

            <p style={{ opacity: '.5' }} className="mt-3 bg-white">
                {currentProduct.id}
            </p>
        </Accordion.Body>
    </Accordion.Item>)
}

export default AccordionInfo;

import Accordion from 'react-bootstrap/Accordion';


function CrudAccordionItem({children, eventKey, className}) {
    return (
        <Accordion.Item className={className} eventKey={eventKey || "0"}>
            <Accordion.Header>{children("header")}</Accordion.Header>
            <Accordion.Body>
                {children("body")}
            </Accordion.Body>
        </Accordion.Item>)
}

export default CrudAccordionItem;
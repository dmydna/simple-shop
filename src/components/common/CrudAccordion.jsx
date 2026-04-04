import { useEffect, useState } from "react";
import { Accordion } from 'react-bootstrap';
import AccordionEdit from "@f/listing/components/AccordionEdit.jsx";
import AccordionInfo from "@f/listing/components/AccordionInfo.jsx";
import AccordionDanger from "@f/listing/components/AccordionDanger.jsx";
import { useListingCrud } from "@f/listing/contexts/ListingCrudContext.jsx";

function CrudAccordion({children ,defaultKey="0", currentItem}) {

    const [activeKey, setActiveKey] = useState(defaultKey);

    useEffect(() => {
        setActiveKey(defaultKey);
    }, [currentItem]);

    return (
        <Accordion
            activeKey={activeKey}
            onSelect={(k) => setActiveKey(k)}
        >
            {children}
        </Accordion>
    );
}


export default CrudAccordion;
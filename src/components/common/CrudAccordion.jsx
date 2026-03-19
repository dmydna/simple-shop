import { useEffect, useState } from "react";
import { Accordion } from 'react-bootstrap';
import AccordionEdit from "../../features/listing/components/AccordionEdit.jsx";
import AccordionInfo from "../../features/listing/components/AccordionInfo.jsx";
import AccordionDanger from "../../features/listing/components/AccordionDanger.jsx";
import { useListingCrud } from "../../features/listing/contexts/ListingCrudContext.jsx";

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
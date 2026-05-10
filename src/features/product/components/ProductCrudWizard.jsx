import { useEffect } from "react";
import { CRUD } from "../../../utils/crud.js";
import StepBadge from '../../wizardCrud/components/StepBadge.jsx';
import WizardCrud from "../../wizardCrud/components/WizardCrud.jsx";
import WizardItem from "../../wizardCrud/components/WizardItem.jsx";
import { useProductCrud } from "../contexts/ProductCrudContex.jsx";
import { WIZARD_CONFIG } from "../hooks/wizardProductConfig.js";
import AccordionInfo from "./AccordionInfo.jsx";
import FormProduct from "./FormProduct.jsx";
import CrudAccordion from "../../../components/common/CrudAccordion.jsx";
import AccordionDanger from "./AccordionDanger.jsx";
import AccordionEdit from "./AccordionEdit.jsx";

// @deprecated 
function ProductCrudWizard() {

    const crudHook = useProductCrud()
    const { crudMode, handleUpdate, handleCreate, setExpandx, currentItem } = crudHook


    const handleSubmit = () => {
        if (crudMode === CRUD.UPDATE) handleUpdate();
        if (crudMode === CRUD.CREATE) handleCreate();
    }
    const handleClose = () => {
        setExpandx(false)
    }

    useEffect(() => {
        console.log(currentItem)
    }, [currentItem])


    return (
        <WizardCrud
            steps={WIZARD_CONFIG}
            onCancel={handleClose}
            onSubmit={handleSubmit}
            crudHook={crudHook}
        >
            <WizardItem eventKey={2}>
                <AccordionInfo />
            </WizardItem>
            <WizardCrud.Item eventKey={1}>
                <CrudAccordion
                    defaultKey="0" 
                    currentItem={currentItem}>
                    <AccordionInfo 
                        className='border-0 border-bottom'
                        eventKey="0">Informacion
                    </AccordionInfo>
                    <AccordionEdit
                        className='border-0 border-bottom'
                        eventKey="2">Edit Zone
                    </AccordionEdit>
                    <AccordionDanger
                        className='border-0'
                        eventKey="1">Danger Zone
                    </AccordionDanger>
                </CrudAccordion>
            </WizardCrud.Item>
            <WizardItem eventKey={2}>
                <FormProduct />
            </WizardItem>
        </WizardCrud>
    )
}

export default ProductCrudWizard

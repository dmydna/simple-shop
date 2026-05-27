import { CRUD } from "@utils/enums.js";
import CrudAccordion from "../../../components/common/CrudAccordion.jsx";
import WizardCrud from "../../wizardCrud/components/WizardCrud.jsx";
import WizardItem from "../../wizardCrud/components/WizardItem.jsx";
import { useListingCrud } from "../contexts/ListingCrudContext.jsx";
import { WIZARD_CONFIG } from "../hooks/wizardConfig.js";
import AccordionDanger from "./AccordionDanger.jsx";
import AccordionEdit from "./AccordionEdit.jsx";
import AccordionInfo from "./AccordionInfo.jsx";
import FormBasic from "./FormBasic.jsx";
import FormDetails from "./FormDetails.jsx";
import FormProducts from "./FormProduct.jsx";
import FormUploadImage from "./FormUploadImage.jsx";
import SearchProductForCreate from "./SearchProductForCreate.jsx";


// @deprecated
function ListingCrudWizard(){

    const crudHook = useListingCrud()
    const {crudMode, handleUpdate, handleCreate,setExpandx, showCrud,
     currentItem, selectedFile, formData} = crudHook


    const handleSubmit = () => {
        if(crudMode === CRUD.UPDATE) 
            handleUpdate(currentItem.id, formData, selectedFile);
        if(crudMode === CRUD.CREATE) 
            handleCreate();
    }
    const handleClose = () => {
        setExpandx(false)
    }

    return (
        <WizardCrud
            steps={ WIZARD_CONFIG }
            onCancel={ handleClose }
            onSubmit={ handleSubmit }
            crudHook={ crudHook }
        >
            <WizardItem eventKey={0}>
                <SearchProductForCreate />
            </WizardItem>
            <WizardItem eventKey={1}>
                <CrudAccordion
                    defaultKey="0" currentItem={currentItem}>
                    <AccordionInfo
                        className='border-0 border-bottom'
                        eventKey="0" >Information
                    </AccordionInfo>
                    <AccordionEdit
                        className='border-0 border-bottom'
                        eventKey="1">Edit Zone
                    </AccordionEdit>
                    <AccordionDanger
                        className='border-0'
                        eventKey="2">Danger Zone
                    </AccordionDanger>
                </CrudAccordion>
            </WizardItem>
            <WizardCrud.Item eventKey={2}>
                <FormBasic  >
                    <p
                        style={{ opacity: '.5' }}
                        className="d-none my-4 small">
                        Los campos a completar son necesarios para finalizar el proceso.
                    </p>
                </FormBasic>
            </WizardCrud.Item>
            <WizardCrud.Item eventKey={3}>
                <FormProducts/>
            </WizardCrud.Item>
            <WizardCrud.Item eventKey={4}>
                <FormDetails/>
            </WizardCrud.Item>
            <WizardCrud.Item eventKey={5}>
                <FormUploadImage productId={currentItem.id} />
            </WizardCrud.Item>
        </WizardCrud>
    )
}

export default ListingCrudWizard
import { useEffect } from "react";
import { useUserCrud } from "../contexts/UserCrudContext.jsx";
import { WIZARD_CONFIG } from "../hooks/wizardConfigUser";
import WizardCrud from "../../wizardCrud/components/WizardCrud.jsx";
import WizardItem from "../../wizardCrud/components/WizardItem.jsx";
import CrudAccordion from "../../../components/common/CrudAccordion.jsx";


//@deprecated 
function UserCrudWizard() {

    const crudHook = useUserCrud()
    const { crudMode, handleUpdate, handleCreate, setExpandx, currentItem, formData }
        = crudHook

    const handleSubmit = () => {
        if (crudMode === CRUD.UPDATE)
            handleUpdate(currentItem.id, formData);
        if (crudMode === CRUD.CREATE)
            handleCreate();
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
            </WizardItem>
            <WizardCrud.Item eventKey={1}>
                <CrudAccordion
                    defaultKey="0"
                    currentItem={currentItem}>
                    <div className="d-flex flex-wrap">
                        <div className="m-2">
                            {currentItem?.image ? (
                                <img
                                    className="rounded"
                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                    width={130} height={130} src={currentItem.image} />
                            ) : (
                                <div className="d-block border rounded" style={{ width: '130px', height: '130px', backgroundColor: 'rgb(0 0 0 / 11%)' }}  ></div>
                            )}
                        </div>
                        <div className="m-2 my-4">
                            {currentItem?.id && (
                                <small className="d-block"> <b>id : </b> {currentItem?.id} </small>
                            )}
                            {currentItem?.username && (
                                <small className="d-block"> <b>username: </b> {currentItem?.username} </small>
                            )}
                            {currentItem?.email && (
                                <small className="d-block"> <b>email: </b> {currentItem?.email} </small>
                            )}
                            {currentItem?.clientName && (
                                <small className="d-block"> <b>clientname: </b> {currentItem?.clientName} </small>
                            )}
                        </div>
                    </div>


                </CrudAccordion>
            </WizardCrud.Item>
            <WizardItem eventKey={2}>
            </WizardItem>
        </WizardCrud>
    )
}

export default UserCrudWizard

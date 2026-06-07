import FetchState from "@/components/common/FetchState";
import FormWarning from "@/features/dashboard/common/FormWarning";
import { useDashboardParams } from "@/hooks/useDashboardParams";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonCrud from "./ButtonCrud";
import ModalCrud from "./ModalCrud";
import { useCustomParams } from "@/hooks/useCustomParams";


// NOTA este componente es multi-contexto, 
// hay que mandar un crud-hook compatible.
function FormCrud({ children, type, useCrudHook, crudHook }) {


    const { handleUpdate, handleStatus, handleCreate, setShowModal,
        currentItem, setId, formData, setFormData, setEnableEditableField,
        loading, setLoading, error, errorItem, setError, success,
        setSuccess, refreshElem, fetchElem, ...props } = crudHook

    const {setSearchParams} = useCustomParams()

    const navigate = useNavigate()
    const location = useLocation();

    const { editMode, viewMode, createMode, copyMode, draftMode } = useDashboardParams(crudHook)

    const title = useMemo(() => {
        // -- Nota: 
        // 1. El modo draft solo permite editar
        // 2. El modo create incluye crear draft
        let action = null;
        if (editMode) action = `Edit ${type}`;
        if (createMode || copyMode) action = `Add ${type}`;
        if (viewMode) action = `${type} Summary`;
        if (draftMode) action = `Edit ${type} draft`
        return action;
    }, [editMode, viewMode, createMode, type])


    const [showWarn, setShowWarn] = useState(false)

    const handleConfig = () => {
        setShowModal(true)
    }

    const handlePublish = useCallback(() => {
          handleCreate({...formData, status: "ACTIVE"}, props?.selectedFile || null)
    },[formData, props])

   const handlePublishDraft = useCallback(() => {
         () => props?.handleStatus(currentItem.id, "ACTIVE")
    },[currentItem, props])

    const handleEdit = useCallback(() => {
         handleUpdate(currentItem?.id, formData, props?.selectedFile || null)
    },[currentItem, formData, props])

    const handleCreateDraft = useCallback(() => {
        handleCreate(
          { ...formData, status: "DRAFT" }, 
          props?.selectedFile || null
       )
    },[currentItem, formData, props])


    useEffect(()=>{
        if(!createMode){
            refreshElem()
        }
        refreshElem()
    },[success, createMode])

    return (

        <div className="border island p-4 mb-3 mx-0 mx-md-2">

            <FetchState.Modal 
                hook={{ loading, error, setError, success, setSuccess }} 
            >
                <div>

                    <div className="d-flex justify-content-between mb-3">
                        <p className="fw-medium text-capitalize fs-5">{title}</p>
                        <i onClick={() => setSearchParams(prev => ({...prev, dialog: "action"}))} 
                           className="d-block d-md-none btn btn-light mb-3 bi bi-gear">
                        </i>
                    </div>

                    {children}

                    <div className="d-flex mt-5 justify-content-center gap-3">

                                <ButtonCrud
                                    icon="bi-pencil"
                                    title="Save Changes"
                                    visible={editMode || draftMode}
                                    handle={handleEdit}
                                />

                                <ButtonCrud
                                    icon="bi-plus"
                                    title="Draft"
                                    visible={createMode}
                                    handle={handleCreateDraft}
                                />

                                <ButtonCrud
                                    icon="bi-send"
                                    title="Publicar"
                                    variant="dark"
                                    visible={createMode || copyMode}
                                    handle={handlePublish}
                                />

                                <ButtonCrud
                                    icon="bi-send"
                                    variant="dark"
                                    title="Publish Draft"
                                    visible={draftMode}
                                    handle={handlePublishDraft}
                                />

                    </div>
                </div>

            </FetchState.Modal>

            <ModalCrud
                show={showWarn}
            >
                <FormWarning close={() => setShowWarn(false)} />
            </ModalCrud>

        </div>

    )
}

export default FormCrud;

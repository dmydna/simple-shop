import FetchState from "@/components/common/FetchState";
import FormWarning from "@/features/dashboard/common/FormWarning";
import { useDashboardParams } from "@/hooks/useDashboardParams";
import {  useEffect, useMemo, useState } from "react";
import ButtonCrud from "./ButtonCrud";
import ModalCrud from "./ModalCrud";
import { useCustomParams } from "@/hooks/useCustomParams";


// NOTA este componente es multi-contexto, 
// hay que mandar un crud-hook compatible.
function FormCrud({ children, type, crudHook }) {


    const { handleUpdate, handleCreate, loading, error, setError, success,
        setSuccess, refreshElem, handleAction, ...props }  = crudHook

    const { setSearchParams } = useCustomParams()

    const { editMode, viewMode, createMode, copyMode, edit_draftMode, draftMode } = useDashboardParams(crudHook)

    const title = useMemo(() => {
        // -- Nota: 
        // 1. El modo draft solo permite editar
        // 2. El modo create incluye crear draft
        let action = `${type}`
        if (editMode) action = `Edit ${type}`;
        if (createMode || copyMode) action = `Add ${type}`;
        if (viewMode) action = `${type} Summary`;
        if (edit_draftMode) action = `Edit ${type} draft`
        return action;
    }, [editMode, type, createMode, copyMode, viewMode, edit_draftMode])


    const [showWarn, setShowWarn] = useState(false)



    const handlePublish = async (data, selectedFile = null) => {
        await handleCreate({ ...data, status: "ACTIVE" }, selectedFile)
    }


    // eslint-disable-next-line no-unused-vars
    const handlePublishDraft = async (data, selectedFile = null) => {
        await props?.handleStatus(data.id, "ACTIVE")
    }


    const handleEdit = async (data, selectedFile = null) => {
        await handleUpdate(data.id, data, selectedFile)
    }


    const handleCreateDraft = async (data, selectedFile = null) => {
        await handleCreate({ ...data, status: "DRAFT" }, selectedFile)
    }


    useEffect(() => {
        refreshElem()
    }, [success, createMode, refreshElem])

    return (

        <div className="border island p-4 mb-3 mx-0 mx-md-2">

            <FetchState.Modal 
                hook={{ loading, error, setError, success, setSuccess }} 
            >
                <div>

                    <div className="d-flex justify-content-between mb-3">
                        <p className="fw-medium fs-5">{ title }</p>
                        <i onClick={() => setSearchParams(prev => ({ ...prev, dialog: "action" }))} 
                            className="d-block d-md-none btn btn-light mb-3 bi bi-gear">
                        </i>
                    </div>

                    {children}

                    <div className="d-flex mt-5 justify-content-center gap-3">

                        <ButtonCrud
                            icon="bi-pencil"
                            title="Save Changes"
                            visible={editMode || draftMode}
                            handle={async () => await handleAction(handleEdit)}
                        />

                        <ButtonCrud
                            icon="bi-plus"
                            title="Draft"
                            visible={createMode}
                            handle={() => handleAction(handleCreateDraft)}
                        />

                        <ButtonCrud
                            icon="bi-send"
                            title="Publicar"
                            variant="dark"
                            visible={createMode || copyMode}
                            handle={() => handleAction(handlePublish)}
                        />

                        <ButtonCrud
                            icon="bi-send"
                            variant="dark"
                            title="Publish Draft"
                            visible={draftMode}
                            handle={() => handleAction(handlePublishDraft)}
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

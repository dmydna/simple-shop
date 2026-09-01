import ButtonCrud from "@/components/common/ButtonCreate";
import FetchState from "@/components/common/FetchState";
import { useFormCrudSync } from "@/features/crud/hooks/useFormCrudSync";
import { useUrlState } from "@/hooks/useUrlState";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


// NOTA este componente es multi-contexto, 
// hay que mandar un crud-hook compatible.
function FormCrud({ 
    children, 
    type, 
    enableDraft = false, 
    enableEdit = false, 
    enableCreate = false,
    ...crudHook 

}) {

    const { update, create, loading, error, setError, success,
        setSuccess, refreshElem, handleAction, ...props }  = crudHook

    const navigate = useNavigate()
    const { setSearchParams } = useUrlState()

    const { editMode, viewMode, createMode, copyMode, edit_draftMode, draftMode } 
    = useFormCrudSync({...crudHook})

    const [root, dashboard, current] = window.location.pathname.split("/")

    const alias = {
        'product-form': 'Products',
        'listing-form': 'Posts',
        'user-form': 'Users',
    }


    const title = useMemo(() => {
        // -- Nota: 
        // 1. El modo draft solo permite editar
        // 2. El modo create incluye crear draft
        let action = `${alias[current]}`
        if (editMode) action = `Edit ${alias[current]}`;
        if (createMode || copyMode) action = `Add ${alias[current]}`;
        if (viewMode) action =  `${alias[current]} Summary `;
        if (edit_draftMode) action = `Edit ${alias[current]} draft`
        return action;
    }, [editMode, type, createMode, copyMode, viewMode, edit_draftMode])

    const [showWarn, setShowWarn] = useState(false)



    const handlePublish = async (data, selectedFile = null) => {
        const response = await create({ ...data, status: "ACTIVE" }, selectedFile)
        setSearchParams(prev => ({...prev, id: response.id, mode: 'view'}) )
    }


    // eslint-disable-next-line no-unused-vars
    const handlePublishDraft = async (data, selectedFile = null) => {
        await props?.handleStatus(data.id, "ACTIVE")
    }


    const handleEdit = async (data, selectedFile = null) => {
        await update(data.id, data, selectedFile)
    }

    const handleEditDraft = async (data, selectedFile = null) => {
        // console.log("handleEditDraft:",  data);
        await update(data.id, data, selectedFile)
    }

    const handleCreateDraft = async (data, selectedFile = null) => {
        await create({ ...data, status: "DRAFT" }, selectedFile)
    }

    useEffect(() => {
        refreshElem()
    }, [success, createMode, refreshElem])

    return (

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
                            visible={editMode && enableEdit}
                            handle={async () => await handleAction(handleEdit)}
                        />


                        <ButtonCrud
                            icon="bi-pencil"
                            title="Save Changes"
                            visible={edit_draftMode && enableDraft}
                            handle={async () => await handleAction(handleEditDraft)}
                        />

                        <ButtonCrud
                            icon="bi-plus"
                            title="Draft"
                            visible={createMode && enableDraft}
                            handle={() => handleAction(handleCreateDraft)}
                        />

                        <ButtonCrud
                            icon="bi-send"
                            title="Send"
                            variant="dark"
                            visible={(createMode || copyMode) && enableCreate}
                            handle={() => handleAction(handlePublish)}
                        />

                        <ButtonCrud
                            icon="bi-send"
                            variant="dark"
                            title="Publish Draft"
                            visible={(draftMode || edit_draftMode) && enableDraft}
                            handle={() => handleAction(handlePublishDraft)}
                        />

                    </div>
                </div>

            </FetchState.Modal>
    )
}

export default FormCrud;

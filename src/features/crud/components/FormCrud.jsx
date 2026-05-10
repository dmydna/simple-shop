import PageLoading from "@/components/common/PageLoading";
import FormWarning from "@/features/dashboard/common/FormWarning";
import PageError from "@/pages/errors/PageError";
import PageSuccess from "@/pages/errors/PageSuccess";
import { CRUD } from "@/utils/crud";
import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ModalCrud from "./ModalCrud";


function FormCrud({ children, type, useCrudHook }) {

    const [searchParams] = useSearchParams();
    const itemId = searchParams.get('hash') || searchParams.get('id');
    const copyMode = searchParams.get('mode') === 'copy';
    const editMode = searchParams.get('mode') === 'edit';
    const draftMode = searchParams.get('mode') === 'draft';
    const viewMode = searchParams.get('mode') === 'view';
    const createMode = searchParams.get('mode') === 'create';

    const { handleUpdate, handleStatus,handleCreate, setShowModal,
        currentItem, setId, formData, setFormData, setCrudMode,
        setEnableEditableField,
        loading,
        setLoading,
        error,
        errorItem,
        setError,
        success,
        setSuccess, refreshElem,fetchElem, ...props } = useCrudHook()

    const [showWarn, setShowWarn] = useState(false)

    useEffect(() => {
        if (copyMode) { setCrudMode(CRUD.COPY) }
        if (createMode) { setCrudMode(CRUD.CREATE) }
        if (editMode) { setCrudMode(CRUD.UPDATE) }
        if (viewMode) { 
            setEnableEditableField(true) 
            setCrudMode(CRUD.READ) 
        }
        if (draftMode) { setEnableEditableField(false) }
        if (itemId) { setId(itemId) }
        if (editMode && !itemId) {setShowWarn(true)}
    }, [itemId, formData, createMode, viewMode, draftMode, editMode])

    const title = useMemo(() => {
        let action = null;
        if (editMode) action = `Edit ${type}`;
        if (createMode || copyMode) action = `Add ${type}`;
        if (viewMode) action = `${type} Summary`;
        if (draftMode) action = `Edit ${type} Draft`
        return action;
    }, [editMode, viewMode, createMode, type])

    const handleConfig = () => {
        setShowModal(true)
    }

    const handlePublish = async () => {
        handleCreate()
    }

    const handleSave = () => {
        
    }



    return (
        <div className="border island p-4 mb-3 mx-0 mx-md-2">

            {errorItem && <PageError handle={()=>setShowWarn(true)} />}
            {loading && <PageLoading />}
            {error && <PageError handle={()=> setError(null)} />}
            {success && <PageSuccess handle={()=>{
               refreshElem()
               setSuccess(false)} 
            }/>}

            {!loading && !error && !errorItem && !success && (
                <div>

                    <div className="d-flex justify-content-between mb-3">
                        <p className="fw-medium text-capitalize fs-5">{title}</p>
                        <i onClick={handleConfig} className="d-block d-md-none btn btn-light mb-3 bi bi-gear"></i>
                    </div>

                    {children}

                    {editMode && !viewMode && (
                        <div className="d-flex mt-5 justify-content-center">
                            <Button 
                                className="rounded-3 border-1 fw-medium"
                                onClick={() => handleUpdate(currentItem?.id, formData, props?.selectedFile || null)}
                                variant="outline-dark">
                                <i className='bi-floppy'></i>
                                <span className="mx-3">Save Changes</span>
                            </Button>
                        </div>
                    )}
                    {createMode && (
                        <div className="d-flex gap-3 mt-5 justify-content-center">
                            <Button 
                                 onClick={() => handleStatus(currentItem?.id, "DRAFT") }
                                className="border-1 fw-medium" variant="outline-dark">
                                <i class="bi bi-paperclip me-2"></i>
                                <span>Draft</span>
                            </Button>
                            <Button
                                onClick={() => handleCreate(formData, props?.selectedFile || null) }
                                variant="dark">
                             <i class="bi bi-send me-2"></i>
                             <span>Publish</span>
                            </Button>
                        </div>
                    )}

                    {copyMode && (
                        <div className="d-flex gap-3 mt-5 justify-content-center">
                            <Button className="border-1 fw-medium" variant="light">
                                save
                            </Button>
                            <Button
                                onClick={handlePublish}
                                variant="dark">Publish
                            </Button>
                        </div>
                    )}

                </div>

            )}

            <ModalCrud
                show={showWarn}
            >
                <FormWarning  close={() => setShowWarn(false)}/>
            </ModalCrud>

        </div>

    )
}

export default FormCrud;

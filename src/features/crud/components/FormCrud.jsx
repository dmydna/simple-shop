import PageLoading from "@/components/common/PageLoading";
import FormWarning from "@/features/dashboard/common/FormWarning";
import { useCrudParams } from "@/hooks/useCrudParams";
import PageError from "@/pages/errors/PageError";
import PageSuccess from "@/pages/errors/PageSuccess";
import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import ModalCrud from "./ModalCrud";

// NOTA este componente es multi-contexto, 
// hay que mandar un crud-hook compatible.
function FormCrud({ children, type, useCrudHook, crudHook }) {


    const { handleUpdate, handleStatus,handleCreate, setShowModal,
        currentItem, setId, formData, setFormData, setEnableEditableField,
        loading, setLoading, error, errorItem, setError, success,
        setSuccess, refreshElem,fetchElem, ...props } = crudHook

  

    const {editMode, viewMode, createMode, copyMode, draftMode} = useCrudParams(crudHook)

    const title = useMemo(() => {
        let action = null;
        if (editMode) action = `Edit ${type}`;
        if (createMode || copyMode) action = `Add ${type}`;
        if (viewMode) action = `${type} Summary`;
        if (draftMode) action = `Add ${type} Draft`
        return action;
    }, [editMode, viewMode, createMode, type])


    const [showWarn, setShowWarn] = useState(false)

    const handleConfig = () => {
        setShowModal(true)
    }

    const handlePublish = async () => {
        handleCreate()
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

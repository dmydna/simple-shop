import FormCrud from "@/features/crud/components/FormCrud";
import ModalCrud from "@/features/crud/components/ModalCrud";
import MultiImageUploaderCrud from "@/features/crud/components/MultiImageUploaderCrud";
import ListingActions from "@/features/listing/components/ListingActions";
import FormBasic from "@/features/listing/components/ListingForm/FormBasic";
import FormDetails from "@/features/listing/components/ListingForm/FormDetails";
import FormSku from "@/features/listing/components/ListingForm/FormSku";
import { useListingForm } from "@/features/listing/hooks/useListingForm";
import { useUrlParams } from "@/hooks/useUrlParams";
import { ListingDraftDTO, ListingDTO } from "@/utils/schemas";
import { useEffect } from "react";

function ListingFormPage() {

    const baseHook = useListingForm()
    const { showModal, setShowModal, setScheme } = baseHook

    const { edit_draftMode, create_draftMode, createMode } = useUrlParams()

    // Validaciones Zod Especificas:
    useEffect(()=>{
        if(createMode)       { setScheme(ListingDTO) }
        if(create_draftMode) { setScheme(ListingDraftDTO) }
        if(edit_draftMode)   { setScheme(ListingDraftDTO) }
    },[edit_draftMode, create_draftMode, createMode, setScheme])


    return (
        <>
            <FormCrud
                type="Listing"
                {...baseHook}
                enableEdit
                enableDraft
                enableCreate
            >
                <>

                    <div className="mb-4">
                        <p className="fw-medium">Post & description</p>
                        <FormBasic 
                            baseHook={baseHook}
                        />
                    </div>

                    <div className="mb-4">
                        <p className="fw-medium">Details & Shipping</p>
                        <FormDetails 
                            baseHook={baseHook}
                        />
                    </div>

                    <div className="mb-4">
                        <p className="fw-medium">Product Specs</p>
                        <FormSku 
                            baseHook={baseHook}
                        />
                    </div>


                    <div className="mb-4">
                        <p className="fw-medium">Product Images</p>
                        <MultiImageUploaderCrud
                            baseHook={baseHook}
                        />
                    </div>


                    <ModalCrud
                        show={showModal}
                        onHide={setShowModal}
                    >
                        <ListingActions
                            close={() => setShowModal(false)}
                        />
                    </ModalCrud>

                </>
            </FormCrud>
        </>

    )
}

export default ListingFormPage;

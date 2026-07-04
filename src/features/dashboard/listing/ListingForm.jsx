import FormCrud from "@/features/crud/components/FormCrud";
import ModalCrud from "@/features/crud/components/ModalCrud";
import MultiImageUploaderCrud from "@/features/crud/components/MultiImageUploaderCrud";
import ListingActions from "@/features/dashboard/listing/ListingActions";
import FormBasic from "@/features/listing/components/FormBasic";
import FormDetails from "@/features/listing/components/FormDetails";
import FormSku from "@/features/listing/components/FormSku";
import { useListingCrud } from "@/features/listing/hooks/useListingCrud";
import { useUrlParams } from "@/hooks/useUrlParams";
import { ListingDraftDTO, ListingDTO } from "@/utils/schemas";
import { useEffect } from "react";

function ListingForm() {

    const baseHook = useListingCrud()
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

export default ListingForm;

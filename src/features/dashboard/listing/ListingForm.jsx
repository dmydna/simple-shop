import FormCrud from "@/features/crud/components/FormCrud";
import ModalCrud from "@/features/crud/components/ModalCrud";
import MultiImageUploaderCrud from "@/features/crud/components/MultiImageUploaderCrud";
import ListingActions from "@/features/dashboard/listing/ListingActions";
import FormBasic from "@/features/listing/components/FormBasic";
import FormDetails from "@/features/listing/components/FormDetails";
import FormSku from "@/features/listing/components/FormSku";
import { useListingCrud } from "@/features/listing/hooks/useListingCrud";
import {ListingDTO} from "@/utils/schemas"


function ListingForm() {

    const baseHook = useListingCrud()
    const { showModal, setShowModal} = baseHook

    return (
        <>



        <FormCrud
            type="listing"
            crudHook = {baseHook}
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

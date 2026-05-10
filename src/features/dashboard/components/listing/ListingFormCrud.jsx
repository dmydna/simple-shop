import ModalCrud from "@/features/crud/components/ModalCrud";
import MultiImageUploaderCrud from "@/features/crud/components/MultiImageUploaderCrud";
import ListingFormConfig from "@/features/dashboard/components/listing/ListingFormConfig";
import FormBasic from "@/features/listing/components/FormBasic";
import FormDetails from "@/features/listing/components/FormDetails";
import { useListingCrudContext } from "@/features/listing/contexts/ListingCrudContext";
import FormCrud from "../../../crud/components/FormCrud";
import FormSku from "../../../listing/components/FormSku";



function ListingFormCrud() {

    const { showModal, setShowModal, ...props } = useListingCrudContext()


    return (
        <FormCrud
            type="listing"
            useCrudHook={useListingCrudContext}
        >
            <>
                <div className="mb-4">
                    <p className="fw-medium">Post & description</p>
                    <FormBasic 
                       useCrudHook={useListingCrudContext}
                    />
                </div>

                <div className="mb-4">
                    <p className="fw-medium">Details & Shipping</p>
                    <FormDetails />
                </div>

                <div className="mb-4">
                    <p className="fw-medium">Product Specs</p>
                    <FormSku />
                </div>


                <div className="mb-4">
                    <p className="fw-medium">Product Images</p>
                   <MultiImageUploaderCrud
                       useCrudHook={useListingCrudContext}
                   />
                </div>


                <ModalCrud
                    show={showModal}
                    onHide={setShowModal}
                >
                    <ListingFormConfig
                        close={() => setShowModal(false)}
                    />
                </ModalCrud>

            </>
        </FormCrud>


    )
}

export default ListingFormCrud;

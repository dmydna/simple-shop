import ModalCrud from "@/features/crud/components/ModalCrud";
import FormCrud from "../../../crud/components/FormCrud";
import FormBasic from "@/features/user/components/FormBasic";
import FormAccount from "@/features/user/components/FormAccount";
import UserFormConfig from "./UserFormConfig";
import { useUserCrudContext } from "@/features/user/contexts/UserCrudContext";

function UserFormCrud() {

    const { showModal, setShowModal, ...props } = useUserCrudContext()

    return (
        <FormCrud
            type="user"
            useCrudHook={useUserCrudContext}
        >

            <p className="fw-medium">
                User Information
            </p>

            <FormBasic />
            
            <p className="fw-medium">
                Personal Information
            </p>
            <FormAccount />
            
            <ModalCrud
                show={showModal}
                onHide={setShowModal}
            >
                <UserFormConfig
                    close={() => setShowModal(false)}
                />
            </ModalCrud>
        </FormCrud>
    )
}

export default UserFormCrud;
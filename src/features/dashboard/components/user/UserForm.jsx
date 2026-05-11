import ModalCrud from "@/features/crud/components/ModalCrud";
import FormCrud from "../../../crud/components/FormCrud";
import FormBasic from "@/features/user/components/FormBasic";
import FormAccount from "@/features/user/components/FormAccount";
import UserActions from "./UserActions";
import { useUserCrud } from "@/features/user/hooks/useUserCrud";

function UserForm() {

    const crudHook = useUserCrud()
    const { showModal, setShowModal } = crudHook


    return (
        <FormCrud
            type="user"
            crudHook={crudHook}
        >

            <p className="fw-medium">
                User Information
            </p>

            <FormBasic crudHook={crudHook} />
            
            <p className="fw-medium">
                Personal Information
            </p>
            
            <FormAccount crudHook={crudHook} />
            
            <ModalCrud
                show={showModal}
                onHide={setShowModal}
            >
                <UserActions
                    close={() => setShowModal(false)}
                />
            </ModalCrud>
        </FormCrud>
    )
}

export default UserForm;
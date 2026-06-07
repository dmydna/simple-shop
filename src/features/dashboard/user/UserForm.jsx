import ModalCrud from "@/features/crud/components/ModalCrud";
import FormAccount from "@/features/user/components/FormAccount";
import FormBasic from "@/features/user/components/FormBasic";
import { useUserCrud } from "@/features/user/hooks/useUserCrud";
import FormCrud from "../../crud/components/FormCrud";
import UserActions from "./UserActions";

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
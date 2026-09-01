import FormCrud from "@/features/crud/components/FormCrud";
import ModalCrud from "@/features/crud/components/ModalCrud";
import FormAccount from "@/features/user/components/UserForm/FormAccount";
import FormBasic from "@/features/user/components/UserForm/FormBasic";
import { useUserForm } from "@/features/user/hooks/useUserForm";
import UserActions from "@/features/user/components/UserActions";
import FormRole from "@/features/user/components/UserForm/FormRole";

export default function UserFormPage() {

    const crudHook = useUserForm()
    const { showModal, setShowModal } = crudHook


    return (
        <FormCrud
            {...crudHook}
            enableEdit
            enableCreate
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

import { Modal } from "react-bootstrap";

export default function ModalConfirm({ children, show, close, size = "sm" }) {
	return (
    <Modal
        show={show}
        onHide={close}
        size={size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static" 
        keyboard={false}
    >
        <Modal.Body className="p-0">
            {children}
        </Modal.Body>
        </Modal>
    );

}
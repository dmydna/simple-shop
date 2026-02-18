import Toast from 'react-bootstrap/Toast';

function AlertToast({children, show, onClose}) {

    return (
        <Toast onClose={() => onClose(false)} show={show} delay={3000} autohide>
            <Toast.Body closeButton={true}>
                {children}
            </Toast.Body>
        </Toast>
    );
}

export default AlertToast;
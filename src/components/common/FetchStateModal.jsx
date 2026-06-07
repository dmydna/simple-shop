import PageError from "@/pages/fallback/PageError";
import PageLoading from "@/pages/fallback/PageLoading";
import PageSuccess from "@/pages/fallback/PageSuccess";
import { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";



export default function FetchStateModal({ children, hook }) {
    const { loading, error, setError, success, setSuccess } = hook;

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (success == true || error){
            setShow(true)
        }
    }, [error, success]);

    return (
        <>
            {children}
            <Modal
                backdrop="static" 
                keyboard={false}
                show={show}
                onHide={setShow}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="p-3">
                    <>
                        {loading && <PageLoading />}
                        {error && !loading && 
                            <PageError error={error} handle={() => {
                                setShow(false)
                                setError(null) 
                            }} />}
                        {success && !error && !loading && 
                            <PageSuccess handle={() => {
                                setShow(false)
                                setSuccess(null) 
                            }} />}
                    </>
                </Modal.Body>
            </Modal>
        </>
    );
}

import PageError from "@features/fallback/PageError";
import PageLoading from "@features/fallback/PageLoading";
import PageSuccess from "@features/fallback/PageSuccess";
import { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export default function FetchStateModal({ children, hook }) {
    const { loading, error, setError, success, setSuccess } = hook;

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        if (error?.code === 'TOKEN_EXPIRED'){
            navigate(`${window.location.pathname}?dialog=expiredsession`)
            return  <>{children}</>
        }

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
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body style={{overflowY: 'auto'}} className="p-3">
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

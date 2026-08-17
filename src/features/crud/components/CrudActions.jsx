import FetchState from "@/components/common/FetchState";
import { Button } from "react-bootstrap";

export function CrudActions ({children , close, className, loading, error, setError, success, setSuccess}){
	
	return (
        <div className={className}>

            <FetchState.Toast 
                hook={{ loading, error, setError, success, setSuccess }}
            >
                <>
                    <div className="d-flex justify-content-between mb-2">
                        <p style={{ lineHeight: '1.25rem' }} 
                            className="small mb-0 fw-medium p-1 w-100">
                            <i className="bi-gear"></i>
                            <span className="ms-3">Config</span>
                        </p>
                        {close && (
                            <Button style={{ lineHeight: '1.25rem' }}  onClick={close} variant="light" className="p-1">
                                <i className="bi-x-lg "></i>
                            </Button>
                        )}

                    </div>

                    <hr className="my-2" />

                    {children}
                </>
              
            </FetchState.Toast>

        </div>


	)
}
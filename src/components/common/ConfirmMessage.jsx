import {Button} from "react-bootstrap";

export const ConfirmMessage = ({
                                    icon = "bi-exclamation-circle",
                                    title,
                                    message,
                                    onAction,
                                    onClose
                                }) => {
    return (
        <div style={{maxWidth: '600px'}} className="d-block mx-3 mx-md-auto my-4">
            <div className="row justify-content-center flex-fill">
                <div className="col-12 text-center">

                    <div className="mb-3 text-secondary" style={{ opacity: 0.3 }}>
                        <i className={`bi ${icon}`} style={{ fontSize: "3.5rem" }}></i>
                    </div>

                    <h3 className="fs-5 fw-light text-dark mb-2">{title}</h3>
                    <p className="text-muted small mx-auto mb-4" 
                       style={{ overflow: 'auto', maxWidth: '280px', lineHeight: '1.4' }}>
                        {message}
                    </p>

                    <div className='mt-5 d-flex gap-3 justify-content-center'>
                        {onAction && (
                            <Button
                                variant='ligth'
                                className="btn-sm px-2 py-2 border-secondary-subtle rounded-4 text-secondary fw-medium shadow-sm"
                                style={{ fontSize: '0.75rem', letterSpacing: '0.05rem' }}
                                onClick={onAction}

                            >
                                Continuar
                                <i className='bi bi-chevron-right'></i>
                            </Button>
                        )}

                        {onClose && (
                            <Button
                                variant='dark'
                                className="btn-sm px-2 py-2  border-secondary-subtle rounded-4 fw-medium shadow-sm"
                                style={{ fontSize: '0.75rem', letterSpacing: '0.05rem'}}
                                onClick={onClose}
                            >
                                <i className='bi bi-x-lg me-1'></i>
                                Cancelar
                            </Button>
                        )}
                    </div>



                </div>
            </div>
        </div>
    );
};
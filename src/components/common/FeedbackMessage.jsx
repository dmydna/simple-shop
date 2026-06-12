import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import FeedbackError from "@common/FeedbackError"


export const FeedbackMessage = ({
                             icon = "bi-exclamation-circle",
                             title,
                             error,
                             actionLabel,
                             onAction,
                             children,
                             message
                         }) => {



    const {isAdmin} = useAuthContext()

    const detailedMessage = error?.message || error?.error || "Ocurrió un error desconocido.";
    const genericMessage = "Hubo un error al procesar la solicitud. Intente nuevamente.";
    
    const displayMessage = isAdmin ? detailedMessage : genericMessage;
    const hasDetails = isAdmin && detailedMessage !== genericMessage;

    return (
        <div style={{maxWidth: '600px'}} className="d-block mx-3 mx-md-auto vh-50 h-100">
            <div className="row justify-content-center align-items-center flex-fill h-100">
                <div className="col-12 text-center">
                    {/* Icono sutil */}
                     {children?.icon || 
                    <div className="mb-3 text-secondary" style={{ opacity: 0.3 }}>
                       <i className={`bi ${icon}`} style={{ fontSize: "3.5rem" }}></i> 
                    </div> }

                    {/* Texto refinado */}
                    <h3 className="fs-5 fw-light text-dark mb-2">{title}</h3>
                    <p 
                       className="text-muted small mx-auto mb-4" 
                       style={{ overflow: 'auto', maxWidth: '280px', lineHeight: '1.4' }}>
                        { error ? displayMessage : message }
                    </p>
                   { error && hasDetails && (
                       <FeedbackError 
                           detailedMessage={detailedMessage} 
                           error={error} 
                        />
                    )}
                    {/* Botón condicional (solo aparece si hay una acción) */}
                    {onAction && (
                        <button
                            className="btn btn-sm px-4 py-2 border-secondary-subtle text-secondary fw-medium shadow-sm"
                            style={{ fontSize: '0.75rem', letterSpacing: '0.05rem', borderRadius: '20px' }}
                            onClick={onAction}
                        >
                            {actionLabel?.toUpperCase()}
                        </button>
                    )}
                </div>
            </div>
        </div>    
    );
};

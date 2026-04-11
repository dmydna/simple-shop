export const FeedbackMessage = ({
                             icon = "bi-exclamation-circle",
                             title,
                             message,
                             actionLabel,
                             onAction,
                             children
                         }) => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 text-center">
                    {/* Icono sutil */}
                     {children?.icon || 
                    <div className="mb-3 text-secondary" style={{ opacity: 0.3 }}>
                       <i className={`bi ${icon}`} style={{ fontSize: "3.5rem" }}></i> 
                    </div> }

                    {/* Texto refinado */}
                    <h3 className="fs-5 fw-light text-dark mb-2">{title}</h3>
                    <p className="text-muted small mx-auto mb-4" style={{ maxWidth: '280px', lineHeight: '1.4' }}>
                        {message}
                    </p>

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

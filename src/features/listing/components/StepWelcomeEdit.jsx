import React from "react";

function StepWelcomeEdit ({className}) {

    return (
        <div className={`w-100 pb-5 bg-listing-welcome ${className || ''}`}>
            <div>
                <p className="fs-6 text-secondary mt-2 text-uppercase mb-3">
                    Editar publicacion
                </p>
                <hr></hr>
                <p style={{ opacity: '.5' }} className="mt-4 bg-white">

                    Puedes <b>editar</b> rapidamente una publicacion presionando el boton
                    <i className="bi bi-pencil"></i> de los campos.

                </p>

            </div>
        </div>
    )
}

export default StepWelcomeEdit;
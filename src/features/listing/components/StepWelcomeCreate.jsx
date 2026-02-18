import React from "react";

function StepWelcomeCreate({className}){

    return (
        <div className={`w-100 pb-5 bg-listing-welcome ${className || ''}`}>
            <p className="fs-4 mb-4">
                Crear publicacion
            </p>
            <hr></hr>
            <p
                style={{ opacity: '.5' }}
                className="mt-4 mb-5 bg-white">
                Puedes crear una publicacion rapidamente
                usando el <b>mismo producto</b> de otra o
                creando un nuevo producto
            </p>
        </div>
    )
}

export  default StepWelcomeCreate
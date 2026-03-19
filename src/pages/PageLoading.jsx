import React from "react";

function PageLoading({message}){
    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 my-5 py-5">
            <div style={{ left: "10px", top: "1px" }}
                 className="spinner-border text-primary"
                 role="status" ></div>
            <p className="my-3">
                {message || 'Cargando...'}
            </p>
        </div>
    )
}

export default PageLoading;
import {useNavigate} from "react-router-dom";
import {FeedbackMessage} from "@common/FeedbackMessage.jsx";
import React from "react";

function PageError({handle}){

    const msg = 'No se guardaron los cambios';
    return (
        <FeedbackMessage
            title="Hubo un error"
            message={msg}
            icon="bi-x-circle"
            actionLabel={handle ? "aceptar" : null}
            onAction={handle || null}
        />
    )
}

export default PageError;
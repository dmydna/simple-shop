import React from "react";
import {FeedbackMessage} from "@common/FeedbackMessage.jsx";

function PageSuccess({handle}){

    const msg = 'Se guardaron los cambios';
    return (
        <FeedbackMessage
            title="Operacion exitosa"
            message={msg}
            icon="bi-check-circle"
            actionLabel={handle ? "aceptar" : null}
            onAction={handle || null}
        />
    )
}

export default PageSuccess;
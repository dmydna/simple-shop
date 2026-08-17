import React from "react";
import {FeedbackMessage} from "@common/FeedbackMessage.jsx";

function PageSuccess({handle}){

    const msg = 'Se guardaron los cambios';
    return (
        <FeedbackMessage
            title="Operacion exitosa"
            message={msg}
            variant="success"
            icon="bi-check"
            actionLabel={handle ? "aceptar" : null}
            onAction={handle || null}
        />
    )
}

export default PageSuccess;
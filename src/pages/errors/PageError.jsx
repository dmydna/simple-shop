import {FeedbackMessage} from "@common/FeedbackMessage.jsx";
import React from "react";

function PageError({handle, error}){

    return (
        <FeedbackMessage
            title="Hubo un error"
            icon="bi-x-circle"
            actionLabel={handle ? "aceptar" : null}
            onAction={handle || null }
            error={error}
        />
    )
}

export default PageError;
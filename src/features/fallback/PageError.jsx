import {FeedbackMessage} from "@common/FeedbackMessage.jsx";
import React, { useEffect } from "react";

function PageError({handle, error, variant="light"}){

    return (
        <div className={`m-auto h-100`}>
        <FeedbackMessage
            title="Hubo un error"
            icon="bi-x"
            actionLabel={handle ? "aceptar" : null}
            onAction={handle || null }
            error={error}
            variant={"danger"}
        />
        </div>
    )
}

export default PageError;
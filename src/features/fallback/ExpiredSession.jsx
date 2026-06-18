import {FeedbackMessage} from "@common/FeedbackMessage.jsx";
import React from "react";


// TODO: Se debe incluir ExpiredSession en los componentes manejadores de fallbacks.
// Nota: seguir comportamiente segun caso:
//  1. route protected: mostrar Feedback y rediriguir a \login
//  2. route unprotected: mostrar Feedback y refrescar o mostra contenido. 
function ExpiredSession({handle, message}){

    return (
        <FeedbackMessage
            title="Sesion expirada"
            message={message || "vuelve a iniciar session, para acceder a tu cuenta."}
            icon="bi-x-circle"
            actionLabel={handle ? "aceptar" : null}
            onAction={handle || null }
        />
    )
}

export default ExpiredSession;
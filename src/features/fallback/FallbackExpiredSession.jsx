import { FeedbackMessage } from "@common/FeedbackMessage.jsx";


// TODO: Se debe incluir ExpiredSession en los componentes manejadores de fallbacks.
// Nota: seguir comportamiente segun caso:
//  1. route protected: mostrar Feedback y rediriguir a \login
//  2. route unprotected: mostrar Feedback y refrescar o mostra contenido. 
function FallbackExpiredSession({handle, message}){

    const defaultMsg = "La sesion ha expirado. Por favor, vuelve a iniciar sesion." 
    return (
        <FeedbackMessage
            title="Sesion expirada"
            message={ message || defaultMsg }
            icon="bi-exclamation-circle"
            actionLabel={handle ? "aceptar" : null}
            onAction={handle || null }
        />
    )
}

export default FallbackExpiredSession;
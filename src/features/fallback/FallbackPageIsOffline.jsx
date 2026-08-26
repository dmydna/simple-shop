import { FeedbackMessage } from "@common/FeedbackMessage.jsx";
import { useNavigate } from "react-router-dom";

function FallbackIsOffline(){

    const navigate = useNavigate();
    const reload = () => {window.location.reload()}
    const msg = 'Parece que no estas conectado a internet o el servidor no esta en linea';
    return (
        <FeedbackMessage
            title="Sin Coneccion"
            message={msg}
            icon="bi-cloud-slash"
            actionLabel="reintentar"
            onAction={reload}
        />
    )
}

export default FallbackIsOffline;
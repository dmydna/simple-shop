import {useNavigate} from "react-router-dom";
import {FeedbackMessage} from "../../components/common/FeedbackMessage.jsx";
import React from "react";

function PageNotReady(){

    const navigate = useNavigate();

    const msg = 'Esta sección aun no esta disponible.';
    return (
        <FeedbackMessage
            title="Pagina en Construccion"
            message={msg}
            icon="bi bi-cone-striped"
        />
    )
}

export default PageNotReady;

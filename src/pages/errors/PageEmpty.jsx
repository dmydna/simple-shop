import {useNavigate} from "react-router-dom";
import {FeedbackMessage} from "../../components/common/FeedbackMessage.jsx";
import React from "react";

function PageEmpty({ico}){

    const navigate = useNavigate();

    const msg = 'No hay elementos en esta sección. Agrega alguno para comenzar.';
    return (
        <FeedbackMessage
            title="Sin contenido"
            message={msg}
            icon={ico || "bi-journal-plus"}
        />
    )
}

export default PageEmpty;

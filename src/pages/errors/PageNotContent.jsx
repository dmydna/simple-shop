import {useNavigate} from "react-router-dom";
import {FeedbackMessage} from "../../components/common/FeedbackMessage.jsx";
import React from "react";

function PageNotContent(){

    const navigate = useNavigate();
    const addContent = () => {
        navigate('/dashboard/dev/uploader/')
    }
    const msg = 'Parece que aún no hay elementos en esta sección...';
    return (
        <FeedbackMessage
            title="Sin contenido"
            message={msg}
            icon="bi-journal-plus"
            actionLabel="+ Agregar Contenido"
            onAction={addContent}
        />
    )
}

export default PageNotContent;

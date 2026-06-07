import {useNavigate} from "react-router-dom";
import {FeedbackMessage} from "../../components/common/FeedbackMessage.jsx";
import React from "react";

function PageServerDown(){

    const navigate = useNavigate();
    const addContent = () => {
        navigate('/dashboard/dev/uploader/')
    }
    const msg = 'Parece que estas en linea pero el servidor no esta disponible.';
    return (
        <FeedbackMessage
            title="Servidor Caido"
            message={msg}
            icon="bi-database-fill-x"
        />
    )
}

export default PageServerDown;

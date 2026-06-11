import { useNavigate } from "react-router-dom";
import { FeedbackMessage } from "@common/FeedbackMessage.jsx";

function PageEmpty({ico, message}){

    const navigate = useNavigate();

    const defaultMsg = 'No hay elementos en esta sección. Agrega alguno para comenzar.';
    return (
        <FeedbackMessage
            title="Sin contenido"
            message={message || defaultMsg}
            icon={ico || "bi-journal-plus"}
        />
    )
}

export default PageEmpty;

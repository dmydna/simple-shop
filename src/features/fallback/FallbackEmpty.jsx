import { FeedbackMessage } from "@common/FeedbackMessage.jsx";
import { useNavigate } from "react-router-dom";

function FallbackEmpty({ico, message, variant, className, fixes}){

    const navigate = useNavigate();

    const defaultMsg = 'No hay elementos en esta sección. Agrega alguno para comenzar.';
    return (
        <FeedbackMessage
            title="Sin contenido"
            message={message || defaultMsg}
            icon={ico || "bi-journal-plus"}
            variant={variant}
            listFix={fixes}
        />
    )
}

export default FallbackEmpty;

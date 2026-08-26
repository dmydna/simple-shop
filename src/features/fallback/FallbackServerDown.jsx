import { FeedbackMessage } from "@common/FeedbackMessage.jsx";
import { useNavigate } from "react-router-dom";

function FallbackServerDown(){

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

export default FallbackServerDown;

import CenterLayout from "@/components/layout/CenterLayout";
import { FeedbackMessage } from "@common/FeedbackMessage.jsx";

function FallbackWip() {

    const msg = 'Esta sección aun no esta disponible.';
    return (
        <FeedbackMessage
            title="Pagina en Construccion"
            message={msg}
            icon="bi bi-cone-striped"
        />
    )
}

export default FallbackWip;

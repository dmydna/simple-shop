import { FeedbackMessage } from "@common/FeedbackMessage.jsx";

export default function FallbackNotSearchResults(){

    const msg = 'No se encontraron elementos. Intenta con otra busqueda o filtros.';
    return (

        <FeedbackMessage
            title="Busqueda sin resultados"
            message={msg}
            icon="bi-emoji-frown"
        />
    )
}

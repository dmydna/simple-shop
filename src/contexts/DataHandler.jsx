import {FeedbackMessage} from "../components/common/FeedbackMessage.jsx";

// DataHandler.jsx
export const DataHandler = ({ loading, error, children, onRetry, isEmpty = false, placeholder }) => {

    // 1. ¿Está cargando?
    if (loading) {
        return <>{placeholder}</>;
    }

    // 2. ¿Hubo un error técnico?
    if (error) {
        return (
            <FeedbackMessage
                title="Algo no salió bien"
                message={error}
                icon="bi-exclamation-triangle"
                actionLabel="Reintentar carga"
                onAction={onRetry}
            />
        );
    }

    // 3. Si no carga y no hay error, ¿está vacío?
    if (isEmpty) {
        return (
            <FeedbackMessage
                title="Sin contenido disponible"
                message="Parece que aún no hay elementos en esta sección."
                icon="bi-cloud-slash"
            />
        )
    }

    return <>{children}</>;
};

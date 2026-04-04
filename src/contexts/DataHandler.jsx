import {useNavigate} from "react-router-dom";
import {FeedbackMessage} from "@common/FeedbackMessage.jsx";
import PageNotContent from "@pages/errors/PageNotContent";

// DataHandler.jsx
export const DataHandler = ({ loading, error, children, onRetry, isEmpty = false, placeholder }) => {

    const navigate = useNavigate()

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
                icon="bi-cloud-slash"
                actionLabel="Reintentar carga"
                onAction={onRetry}
            />
        );
    }

    // 3. Si no carga y no hay error, ¿está vacío?
    if (isEmpty) { return  <PageNotContent /> }

    return <>{children}</>;
};

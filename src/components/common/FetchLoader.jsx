import PageLoading from "@/features/fallback/pages/PageLoading";
import { FeedbackMessage } from "@common/FeedbackMessage.jsx";

function FetchLoader({ children, loading, error }) {
 
    if(loading) {return <PageLoading />};

    if(error)   {
        return (
            <div className="island p-3 border m-auto h-100">
                <FeedbackMessage
                    title="Error al cargar"
                    icon="bi-exclamation-triangle"
                    error={error}
                    showDetails={false}
                />
            </div>
        )
    }

    return <>{children}</>;
}


export default FetchLoader;

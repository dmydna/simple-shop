import {useNavigate} from "react-router-dom";
import {FeedbackMessage} from "@common/FeedbackMessage.jsx";
import React from "react";
import CenterLayout from "@/components/layout/CenterLayout";

function Page404NotFound(){

    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/")
    }
    const error = 'Parece que no encontramos la pagina';
    return (
        <CenterLayout>
            <FeedbackMessage
                title="404 page not found"
                message={error}
                icon="bi-exclamation-triangle"
                actionLabel="volver a Incio"
                onAction={goToHome}
            />
        </CenterLayout>
    )
}

export default Page404NotFound

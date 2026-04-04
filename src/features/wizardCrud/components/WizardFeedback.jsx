import PageLoading from "../../../components/common/PageLoading.jsx";
import {FeedbackMessage} from "../../../components/common/FeedbackMessage.jsx";

function WizardFeedback({loading, error, onAction}){

    if(loading){
        return <PageLoading message='Guardando Cambios...'/>
    }

    if(error){
        return(
            <FeedbackMessage
                icon='bi-x-circle'
                title='Hubo un error'
                message={error.message}
                actionLabel='salir'
                onAction={onAction}
            />
        )
    }

    return(
        <FeedbackMessage
            icon='bi-check-circle'
            title='Operacion Existosa!'
            message='Todos los cambios fueron guardados con exito'
            actionLabel='salir'
            onAction={onAction}
        />
    )


}

export default WizardFeedback;
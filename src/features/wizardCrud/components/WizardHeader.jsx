import { CRUD } from "../../../utils/crud.js";
import { useWizard } from "../contexts/WisardContext.jsx";


function WizardHeader({onClose}) {

    const { visibleSteps, mode, currentStep, 
            firstStep, goTo, currentStepData, reset, prev } = useWizard();

    const handleGetCurrentName = () => {
        if (!currentStepData) return
        return currentStepData?.url
    }

    const handleClose = () => {
        reset();
        onClose();
    }

    const gotostart = () => {
        if(mode === CRUD.UPDATE) goTo(firstStep)
        if(mode === CRUD.CREATE) prev()
    }


    return (
        <>
            <div className='d-flex justify-content-between mb-2 mb-4'>

                <div className='normalize-breadcrumb '>
                    <div style={{maxWidth:'270px', fontSize: '1rem'}}
                         className='p-1 px-0 fw-medium m-0'>
                        {handleGetCurrentName()}
                    </div>
                </div>


                <div className='d-flex gap-3'>
                    <i  onClick={handleClose}
                        style={{scale: '1.3', opacity: '.8', fontSize: '1rem', lineHeight: '2px', height: '1.5rem', backgroundColor: '#eeee'}}
                        className='bi bi-x onhover p-1 rounded'></i>
                </div>

            </div>


        </>


    )
}

export default WizardHeader;

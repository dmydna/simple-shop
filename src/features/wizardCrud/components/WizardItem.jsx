import {useWizard} from "../contexts/WisardContext.jsx";


function WizardItem({children, eventKey}){


    const { currentStep } = useWizard()

    return (
        <div key={eventKey}>
            {currentStep === eventKey && (
                <>
                    {children}
                </>
            )}
        </div>
    )
}

export default WizardItem;
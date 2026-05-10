import {useWizard} from "../contexts/WisardContext.jsx";
import {CRUD} from "../../../utils/crud.js";
import StepBadge from "./StepBadge"

// @deprecated 
function  StepNavbar({className}) {

    const { currentStep, visibleSteps, mode, goTo, prev, firstStep, lastStep } = useWizard()

    const handleClick = () => {
        if(mode === CRUD.UPDATE) goTo(firstStep)
        if(mode === CRUD.CREATE) prev()
    }

    return (
        <div
            style={{maxHeight:"40px", fontWeight: "500", backgroundColor: '#eeee'}}
            className={`${className} text-secondary rounded-4 p-2 px-3`} >
            <i onClick={handleClick} className="bi bi-chevron-left me-3 fw-5 onhover"></i>
            <span>step<b className='mx-2'> {currentStep - 1 < 0 ? 0 : currentStep - 1} </b>
                         of {" " + visibleSteps.length - 1} </span>
            {/*<i className="bi bi-three-dots-vertical ms-3 onhover"></i>*/}
            <StepBadge
                style={{opacity: '.6'}}
                className='d-inline-block mx-2 small'
                ico='bi-three-dots-vertical'
            ></StepBadge>
        </div>
    )
}

export default StepNavbar;

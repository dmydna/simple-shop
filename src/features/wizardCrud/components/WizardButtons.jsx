import {Button} from "react-bootstrap";
import React from "react";
import {useWizard} from "../contexts/WisardContext.jsx";
import StepNavbar from "./StepNavbar.jsx";

// @deprecated 
function WizardButtons({ configButtons, onCancel, onSubmit, prev, next }) {

    const {
        isVisibleCancel,
        isVisibleBack,
        isVisibleContinue,
        isVisibleSubmitUpdate,
        isVisibleSubmitCreate,
        isDisabledContinue,
        isDisabledUpdate,
        isDisabledCreate,
        isVisibleStepNavbar,
        show
    } = configButtons;



    return (
        <>
        {show && (
            <div className="mt-4 pt-3 d-flex w-100 justify-content-between">

                { false && isVisibleCancel && (
                    <Button
                        variant="dark border rounded-3 btn-sm"
                        onClick={onCancel}>
                        Cancelar
                    </Button>
                )}

                <div className="w-100 d-flex justify-content-between gap-3">

                    { isVisibleStepNavbar && (
                        <StepNavbar className="small" />
                    )}

                    {isVisibleBack && (
                        <>
                            <Button
                                variant="outline-secondary border btn-sm rounded-3"
                                onClick={prev}>
                                <i className={`bi bi-chevron-left`}></i>
                                Atras
                            </Button>
                        </>
                    )}
                    { isVisibleContinue && (
                        <Button
                            disabled={isDisabledContinue}
                            variant="outline-secondary border btn-sm rounded-3 p-2 px-3 rounded-4"
                            onClick={ next }>
                            Continuar <i className={`bi bi-chevron-right`}></i>
                        </Button>
                    )}

                    { (isVisibleSubmitUpdate || isVisibleSubmitCreate) && (
                        <>
                            <Button
                                className='border rounded-4'
                                variant={isDisabledUpdate || isDisabledCreate ?
                                    "outline-secondary" : "primary"}
                                onClick={onSubmit}
                                disabled={isDisabledCreate || isDisabledUpdate}
                            >
                                Submit
                                <i className="bi bi-check-circle ms-2"></i>
                            </Button>
                        </>
                    )}
                </div>



            </div>
        )}
        </>
    )
}

export default WizardButtons;

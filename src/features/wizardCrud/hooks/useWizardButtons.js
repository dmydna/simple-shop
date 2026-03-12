import {useState} from "react";

function useWizardButtons(){

    const [isVisibleCancel, setIsVisibleCancel] = useState(false)
    const [isVisibleContinue, setIsVisibleContinue] = useState(false)
    const [isVisibleSubmitUpdate, setIsVisibleSubmitUpdate] = useState(false)
    const [isVisibleSubmitCreate, setIsVisibleSubmitCreate] = useState(false)
    const [isDisabledContinue, setIsDisabledContinue] = useState(false)
    const [isDisabledUpdate, setIsDisabledUpdate] = useState(false)
    const [isDisabledCreate, setIsDisabledCreate] = useState(false)


    return{
    isVisibleCancel,
    setIsVisibleCancel,
    isVisibleContinue,
    setIsVisibleContinue,
    isVisibleSubmitUpdate,
    setIsVisibleSubmitUpdate,
    isVisibleSubmitCreate,
    setIsVisibleSubmitCreate,
    isDisabledContinue,
    setIsDisabledContinue,
    isDisabledUpdate,
    setIsDisabledUpdate,
    isDisabledCreate,
    setIsDisabledCreate
    }

}

export default useWizardButtons;
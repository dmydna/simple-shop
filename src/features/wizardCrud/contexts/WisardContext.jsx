import {createContext, useContext, useEffect, useMemo, useState} from "react";
import useWizardButtons from "../hooks/useWizardButtons.js";
import {wizardSteps} from "../../listing/hooks/wizardConfig.js";
import {CRUD} from "../../../utils/crud.js";




// eslint-disable-next-line react-refresh/only-export-components
export const WizardContext = createContext(null)

// Se hace uso de estaticos para evitar recursiones.
// getVisible, step ...
export const WizardProvider = (
    { children, mode, getVisibleSteps, step, updateRef, show }) => {

    const navigationButtons = useWizardButtons()
    const [currentStep, setCurrentStep] = useState(1);

    const visibleSteps = useMemo(() => {
        return getVisibleSteps(mode);
    }, [getVisibleSteps, mode]);

    // reinicia cuando cambia de item.
    useEffect(()=>{
        console.log('VISIBLE STEPS: ', visibleSteps)
        if(visibleSteps.length !== 0)
            setCurrentStep(visibleSteps[0].id);
    },[updateRef, show])


    useEffect(()=>{
    console.log('CURRENT STEP: ', currentStep)
    },[currentStep])


    // 3. Calculamos la navegación basándonos en ese filtro
    const navigation = useMemo(() => {
        const currentIndex = visibleSteps.findIndex(s => s.id === currentStep);

        return {
            next: () => {
                const nextStep = visibleSteps[currentIndex + 1];
                if (nextStep) setCurrentStep(nextStep.id);
            },
            prev: () => {
                const prevStep = visibleSteps[currentIndex - 1];
                if (prevStep) setCurrentStep(prevStep.id);
            },
            reset: () => {
                if(visibleSteps.length !== 0)
                    setCurrentStep(visibleSteps[0]);
            },

            firstStep: (visibleSteps.length === 0 ?
                -1 : visibleSteps[0].id),
            lastStep:  (visibleSteps.length === 0 ?
                -1 : visibleSteps[visibleSteps.length - 1].id),
            steps: visibleSteps,
            currentStepData: visibleSteps[currentIndex],// El objeto del paso actual
            goTo: (stepId) => setCurrentStep(stepId),
            isFirst: currentIndex === 0,
            isLast: currentIndex === visibleSteps.length - 1,
            currentProgress: ((currentIndex + 1) / visibleSteps.length) * 100
        };
    }, [currentStep, visibleSteps]);

    return (
        <WizardContext.Provider
            value={{ ...navigation, mode, step, visibleSteps,
                currentStep, setCurrentStep,
                ...navigationButtons }}>
            {children}
        </WizardContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWizard = () => useContext(WizardContext);
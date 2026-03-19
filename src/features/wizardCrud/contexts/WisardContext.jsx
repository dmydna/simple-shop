import {createContext, useContext, useEffect, useMemo, useState} from "react";
import useWizardButtons from "../hooks/useWizardButtons.js";
import {CRUD} from "../../../utils/crud.js";


export const stepIndex = (WIZARD_CONFIG) => Object.freeze(
    WIZARD_CONFIG?.reduce((acc, curr, index) => {
        acc[curr.key] = index;
        return acc;
    }, {})
);

// 3. Helper para obtener pasos visibles
export const getVisibleSteps = (WIZARD_CONFIG, modalMode) => {
    return WIZARD_CONFIG?.filter(s => !s.skipIf?.(modalMode)) || [];
};


// eslint-disable-next-line react-refresh/only-export-components
export const WizardContext = createContext(null)

// Se hace uso de estaticos para evitar recursiones.
// getVisible, step ...
export const WizardProvider = (
    { children, mode, steps, updateRef, show }) => {

    const navigationButtons = useWizardButtons()
    const [currentStep, setCurrentStep] = useState(1);

    const step = useMemo(() => {
        console.log(steps)
        return stepIndex(steps)
    },[steps] )

    const visibleSteps = useMemo(() => {
        console.log('VISIBLE STEPS: ', getVisibleSteps(steps, mode))
        return getVisibleSteps(steps, mode);
    }, [steps, mode]);

    // reinicia cuando cambia de item.
    useEffect(()=>{
        if(visibleSteps.length !== 0)
            setCurrentStep(step[visibleSteps[0].key]);
    },[updateRef, show])


    useEffect(()=>{
    console.log('CURRENT STEP: ', currentStep)
    },[currentStep])


    // 3. Calculamos la navegación basándonos en ese filtro
    const navigation = useMemo(() => {
        const currentIndex = visibleSteps?.findIndex(s => step[s.key] === currentStep);

        return {
            next: () => {
                const nextStep = visibleSteps[currentIndex + 1];
                if (nextStep) setCurrentStep(step[nextStep.key]);
            },
            prev: () => {
                const prevStep = visibleSteps[currentIndex - 1];
                if (prevStep) setCurrentStep(step[prevStep.key]);
            },
            reset: () => {
                if(visibleSteps.length !== 0)
                    setCurrentStep(step[visibleSteps[0].key]);
            },

            firstStep: (visibleSteps.length === 0 ?
                -1 : step[visibleSteps[0].key]),
            lastStep:  (visibleSteps.length === 0 ?
                -1 : step[visibleSteps[visibleSteps.length - 1].key]),
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
            value={{ ...navigation, mode, step, visibleSteps, steps,
                currentStep, setCurrentStep,
                ...navigationButtons }}>
            {children}
        </WizardContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWizard = () => useContext(WizardContext);

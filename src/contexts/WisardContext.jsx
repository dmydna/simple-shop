import {createContext, useContext, useEffect, useMemo, useState} from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const WizardContext = createContext(null)

// Se hace uso de estaticos para evitar recursiones.
// getVisible, step ...
export const WizardProvider = ({ children, mode, getVisibleSteps, step }) => {

    const [currentStep, setCurrentStep] = useState(step.OPTIONS_CREATE);
    const [wizardMode, setWizardMode] = useState(mode || null);

    const visibleSteps = useMemo(() => {
        return getVisibleSteps(wizardMode);
    }, [getVisibleSteps, wizardMode]);

    useEffect(()=>{
        setWizardMode(mode);
    },[mode])

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
            value={{ ...navigation, step, wizardMode,
                currentStep, setCurrentStep, setWizardMode }}>
            {children}
        </WizardContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWizard = () => useContext(WizardContext);
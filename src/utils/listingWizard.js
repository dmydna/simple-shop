import { CRUD } from "./crud"

const step = Object.freeze({
  WELCOME: 0,
  PUBLICATION: 1,
  OPTIONS: 2,
  TABLE: 3,
  PRODUCT: 4,
  DETAILS: 5,
  UPLOAD: 6,
})


const wizardSteps = [
  { id: step.WELCOME,     url: '/panel/welcome' },
  { id: step.PUBLICATION, url: '/panel/publication' },
  { id: step.OPTIONS,     url: '/panel/options', 
    skipIf: mode => mode !== CRUD.CREATE},
  { id: step.TABLE,       url: '/panel/productTable', 
    skipIf: mode => mode !== CRUD.CREATE },
  { id: step.PRODUCT,     url: '/panel/product' },
  { id: step.DETAILS,     url: '/panel/details' },
  { id: step.UPLOAD,      url: '/panel/imageUpload' },
]


const getVisibleSteps = (modalMode) => {
  return wizardSteps.filter(s => !s.skipIf?.(modalMode))
}

const getCurrentIndex = (currentStep, modalMode) => {
  return getVisibleSteps(modalMode).findIndex(s => s.id === currentStep)
}

const getNextStep = (currentStep, modalMode) => {
  const steps = getVisibleSteps(modalMode)
  const index = getCurrentIndex(currentStep, modalMode)
  return steps[index + 1]
}

const getPrevStep = (currentStep, modalMode) => {
  const steps = getVisibleSteps(modalMode)
  const index = getCurrentIndex(currentStep, modalMode)
  return steps[index - 1]
}

export { step, wizardSteps, getVisibleSteps, getCurrentIndex, getNextStep, getPrevStep }
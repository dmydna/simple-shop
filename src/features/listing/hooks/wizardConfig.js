import {CRUD} from "../../../utils/crud.js";

export const step = Object.freeze({
    OPTIONS_CREATE: 0,
    OPTIONS_UPDATE: 1,
    PRODUCT: 2,
    PUBLICATION: 3,
    DETAILS: 4,
    UPLOAD: 5,
})


export const wizardSteps = [
    // nota : se debe seguir el formato:
    // wizardSteps[step[x]] = { id: step[x], ... }
    { id: step.OPTIONS_CREATE,     url: 'options_CREATE' ,
        skipIf: (modalMode)=> modalMode === CRUD.UPDATE},
    { id: step.OPTIONS_UPDATE,     url: 'options_UPDATE',
        skipIf: (modalMode)=> modalMode === CRUD.CREATE },
    { id: step.PRODUCT,            url: 'product' },
    { id: step.PUBLICATION,        url: 'publication' },
    { id: step.DETAILS,            url: 'details' },
    { id: step.UPLOAD,             url: 'imageUpload' },
]


export const getVisibleSteps = (modalMode) => {
    return wizardSteps.filter(s => !s.skipIf?.(modalMode))
}
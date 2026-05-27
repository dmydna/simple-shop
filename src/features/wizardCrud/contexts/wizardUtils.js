import { CRUD } from "@utils/enums.js";

// @deprecated 
export const getVisibleSteps = (steps, modalMode) => {
    return steps.filter(s => !s.skipIf?.(modalMode))
}

export const skipIfUpdateMode = (modalMode) =>  modalMode === CRUD.UPDATE
export const skipIfCreateMode = (modalMode) =>  modalMode === CRUD.CREATE
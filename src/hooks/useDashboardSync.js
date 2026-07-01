import { CRUD } from "@/utils/enums";
import { useEffect } from "react";
import { useUrlModes } from "./useUrlModes";


// TODO: renombrar a useFormParams
// TODO: mover a @dashboard
export const useDashboardSync = ({setId, changeMode}) => {


    const { editMode, viewMode, createMode, copyMode, draftMode, 
    edit_draftMode,create_draftMode,itemId} = useUrlModes();
    

    useEffect(() => {
        
        if (copyMode)   { changeMode(CRUD.COPY) }
        if (createMode) { changeMode(CRUD.CREATE) }
        if (editMode)   { changeMode(CRUD.UPDATE) }
        if (edit_draftMode)    { changeMode(CRUD.EDIT_DRAFT) }
        if (create_draftMode)  { changeMode(CRUD.CREATE_DRAFT) }
        if (viewMode)          { changeMode(CRUD.READ) }
//      if (draftMode) { setEnableEditableField(false) }
        if (itemId) { setId(itemId) }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId, createMode, viewMode, draftMode, 
        editMode, edit_draftMode, copyMode, 
        create_draftMode, ])



    return {
       editMode, 
       viewMode, 
       createMode, 
       copyMode, 
       draftMode, 
       edit_draftMode
    }
}

import { CRUD } from "@/utils/enums";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


// TODO: renombrar a useFormParams
// TODO: mover a @dashboard
export const useDashboardParams = (baseHook) => {


    const [searchParams, setSearchParams] = useSearchParams();

    const itemId = searchParams.get('hash') || searchParams.get('id');
    const copyMode = searchParams.get('mode') === 'copy';
    const editMode = searchParams.get('mode') === 'edit';
    const draftMode = searchParams.get('mode') === 'draft';
    const viewMode = searchParams.get('mode') === 'view';
    const createMode = searchParams.get('mode') === 'create';
    const create_draftMode = searchParams.get('mode') === 'create.draft';
    const edit_draftMode = searchParams.get('mode') === 'edit.draft';

    const { setId, formData, changeMode, setEnableEditableField, ...props } = baseHook

    useEffect(() => {
        
        if (copyMode)   { changeMode(CRUD.COPY) }
        if (createMode) { changeMode(CRUD.CREATE) }
        if (editMode)   { changeMode(CRUD.UPDATE) }
        if (edit_draftMode)    { changeMode(CRUD.EDIT_DRAFT) }
        if (create_draftMode)  { changeMode(CRUD.CREATE_DRAFT) }
        if (viewMode)          { changeMode(CRUD.READ) }
//      if (draftMode) { setEnableEditableField(false) }
        if (itemId) { setId(itemId) }

    }, [itemId, formData, createMode, viewMode, draftMode, editMode, edit_draftMode])



    return {
       editMode, viewMode, createMode, copyMode, draftMode, edit_draftMode
    }
}

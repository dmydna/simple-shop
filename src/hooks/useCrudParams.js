import { CRUD } from "@/utils/enums";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useCrudParams = (baseHook) => {

    const [searchParams] = useSearchParams();
    const itemId = searchParams.get('hash') || searchParams.get('id');
    const copyMode = searchParams.get('mode') === 'copy';
    const editMode = searchParams.get('mode') === 'edit';
    const draftMode = searchParams.get('mode') === 'draft';
    const viewMode = searchParams.get('mode') === 'view';
    const createMode = searchParams.get('mode') === 'create';

    const { setId, formData, setCrudMode, setEnableEditableField, ...props } = baseHook

    useEffect(() => {
        
        if (copyMode) { setCrudMode(CRUD.COPY) }
        if (createMode) { setCrudMode(CRUD.CREATE) }
        if (editMode) { setCrudMode(CRUD.UPDATE) }
        if (viewMode) { 
            setEnableEditableField(true) 
            setCrudMode(CRUD.READ) 
        }
        if (draftMode) { setEnableEditableField(false) }
        if (itemId) { setId(itemId) }
        if (editMode && !itemId) {setShowWarn(true)}
    }, [itemId, formData, createMode, viewMode, draftMode, editMode])

    return {
       editMode, viewMode, createMode, copyMode, draftMode
    }
}
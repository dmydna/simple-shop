import { CRUD } from "@/utils/enums";
import { ListingDraftDTO } from "@/utils/schemas";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


// TODO: cambiar de nombre pendiente
// TODO: mover a @dashboard

export const useUrlModes = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const itemId = searchParams.get('hash') || searchParams.get('id');
    const copyMode = searchParams.get('mode') === 'copy';
    const editMode = searchParams.get('mode') === 'edit';
    const draftMode = searchParams.get('mode') === 'draft';
    const viewMode = searchParams.get('mode') === 'view';
    const createMode = searchParams.get('mode') === 'create';
    const create_draftMode = searchParams.get('mode') === 'create.draft';
    const edit_draftMode = searchParams.get('mode') === 'edit.draft';

    return {
       editMode, viewMode, createMode, copyMode, 
       draftMode, edit_draftMode,create_draftMode,
       itemId
    }
}

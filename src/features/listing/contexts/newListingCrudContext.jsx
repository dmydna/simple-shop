import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import React, { createContext, useContext } from "react";
import { useListingCrud } from '../hooks/useListingCrud.js';

export const NewListingCrudContext = createContext(null)

export function NewListingCrudProvider({ children }){

    const listingHook = useListingCrud()

    return (

        <NewListingCrudContext.Provider value={listingHook}>
            {children}
        </NewListingCrudContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNewListingCrudContext = () => useContext(NewListingCrudContext);
import 'nprogress/nprogress.css';

import { useListingForm } from '@/features/listing/hooks/useListingForm.js';
import { createContext, useContext } from "react";

export const ListingCrudContext = createContext(null)

export function ListingCrudProvider({ children }){

    const listingHook = useListingForm()

    return (

        <ListingCrudContext.Provider value={listingHook}>
            {children}
        </ListingCrudContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useListingCrudContext = () => useContext(ListingCrudContext);
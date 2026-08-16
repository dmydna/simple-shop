import 'nprogress/nprogress.css';

import { createContext, useContext } from "react";
import { useListingCrud } from '@f/listing/hooks/useListingCrud.js';

export const ListingCrudContext = createContext(null)

export function ListingCrudProvider({ children }){

    const listingHook = useListingCrud()

    return (

        <ListingCrudContext.Provider value={listingHook}>
            {children}
        </ListingCrudContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useListingCrudContext = () => useContext(ListingCrudContext);
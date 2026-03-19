import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import React, { createContext, useContext } from "react";
import {useListing} from "../hooks/useListing.js";

export const ListingContext = createContext(null)

export function ListingProvider({ children }){

    const listingHook = useListing()

    return (

        <ListingContext.Provider value={listingHook}>
            {children}
        </ListingContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useListingContext = () => useContext(ListingContext);
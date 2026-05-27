import { createContext, useContext, useState } from "react";
import { useFetch } from "@/hooks/useFetch";

const FetchContext = createContext(null)

export function FetchProvider({ children }) {

    const hook  = useFetch()

    return (
        <FetchContext.Provider value={hook}>
          {children}
        </FetchContext.Provider>
      )
}


export const useFetchContext = () => useContext(FetchContext);
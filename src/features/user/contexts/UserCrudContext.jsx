import { createContext, useCallback, useContext, useEffect } from "react";

import { useUserCrud } from "@/features/user/hooks/useUserCrud.js";

export const UserCrudContext = createContext(null)

export function UserCrudProvider({ children }) {
    
    const hook = useUserCrud()

    return (

        <UserCrudContext.Provider value={hook}>
            {children}
        </UserCrudContext.Provider>
    
    );
}

export const useUserCrudContext = () => useContext(UserCrudContext);


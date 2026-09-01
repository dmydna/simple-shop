import { createContext, useContext } from "react";

import { useUserForm } from "@/features/user/hooks/useUserForm.js";

export const UserCrudContext = createContext(null)

export function UserCrudProvider({ children }) {
    
    const hook = useUserForm()

    return (

        <UserCrudContext.Provider value={hook}>
            {children}
        </UserCrudContext.Provider>
    
    );
}

export const useUserCrudContext = () => useContext(UserCrudContext);


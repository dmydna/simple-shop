import {createContext, useContext, useEffect, useState} from "react";


const CrudContext = createContext(null)

// TODO
export function CrudProvider({ children }) {

    const [crudHook,setCrudHook] = useState()
    const [wizardCrud, setWizardCrud] = useState()

    return (
        <CrudContext.Provider
            value={{crudHook, setCrudHook}}
        >
            {children}
            {/*<LoginModal*/}
            {/*    show={showLoginModal}*/}
            {/*    onHide={setShowLoginModal}*/}
            {/*/>*/}
        </CrudContext.Provider>
    )
}


export const useCrudContext = () => useContext(CrudContext);

import { createContext, useContext, useState } from "react";
import LoginModal from "../components/LoginModal";
import ContactModal from "../components/ContactModal";

const ModalContext = createContext(null)

export function ModalProvider({ children }) {


    const [showLogin, onHideLogin] = useState(false)
    const [showContact, onHideContact] = useState(false)
  

    return (
        <ModalContext.Provider 
         value={{ 
            showLogin, 
            showContact,
            onHideContact, 
            onHideLogin 
          }}>
          {children}
          <LoginModal show={showLogin} onHide={onHideLogin}/> 
          <ContactModal show={showContact} onHide={onHideContact}/>
        </ModalContext.Provider>
      )
}


export const useModal = () => useContext(ModalContext);
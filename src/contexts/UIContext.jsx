import { createContext, useContext, useState } from "react";
import LoginModal from "@features/auth/components/LoginModal.jsx";
import ContactModal from "@features/contact/ContactModal.jsx";

const UIContext = createContext(null)

export function UIProvider({ children }) {

    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [showContact, onHideContact] = useState(false)

    const [siderbarMode, setSidebarMode] = useState()




    return (
        <UIContext.Provider 
         value={{ 
            showLogin: showLoginModal,
            showContact,
            onHideContact, 
            setShowLoginModal, setShowRegisterModal,
            siderbarMode, setSidebarMode,
          }}>
          {children}
          <LoginModal 
                 show={showLoginModal} 
                 onHide={setShowLoginModal}
         />
          <ContactModal 
                 show={showContact}
                 onHide={onHideContact}
         />
        </UIContext.Provider>
      )
}


export const useUIContext = () => useContext(UIContext);

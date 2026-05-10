import { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { useLocation } from "react-router-dom";
import LoginModal from "../features/auth/components/LoginModal.jsx";
import ContactModal from "../features/contact/ContactModal.jsx";
import { useAdminUI } from "@/hooks/useAdminUI.js";

const UIContext = createContext(null)

export function UIProvider({ children }) {

    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [showContact, onHideContact] = useState(false)
    const [showMenu, onHideMenu] = useState(false)
    const [showFilter, onHideFilter] = useState(false)
    const [selectedTags, setSelectedTags] = useState([]);
    const [iconCrud, setIconCrud] = useState()
    
    const { appMode, setAppMode,  showSidebar,  setShowsider } = useAdminUI()

  

    const isDesktop = useMediaQuery({ minWidth: 768 });
    useEffect(() => {
      if (!isDesktop) onHideMenu(false);
    }, [isDesktop]);

    const location = useLocation()
    useEffect(()=>{ 
      if(!location.pathname.startsWith("/products")){
        onHideFilter(false)
        if(location.pathname.startsWith("/dashboard")){
          onHideFilter(true)
        }
      }
    },[location])


    return (
        <UIContext.Provider 
         value={{ 
            showLogin: showLoginModal,
            showContact,
            onHideContact, 
            setShowLoginModal, setShowRegisterModal,
            showMenu,
            onHideMenu,
            showFilter, 
            onHideFilter,
            selectedTags, setSelectedTags,
            iconCrud, setIconCrud,
            appMode, setAppMode,  showSidebar,  setShowsider
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

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { useLocation } from "react-router-dom";
import ContactModal from "../features/contact/ContactModal.jsx";
import LoginModal from "../features/auth/components/LoginModal.jsx";
import { useUserContext } from "../features/user/contexts/UserContext.jsx";
import { useProductContext } from "../features/product/contexts/ProductContext.jsx";
import { useListingContext } from "../features/listing/contexts/ListingContext.jsx";

const UIContext = createContext(null)

export function UIProvider({ children }) {

    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [showContact, onHideContact] = useState(false)
    const [showMenu, onHideMenu] = useState(false)
    const [showFilter, onHideFilter] = useState(false)
    const [selectedTags, setSelectedTags] = useState([]);

    const isDesktop = useMediaQuery({ minWidth: 768 });
    useEffect(() => {
      if (!isDesktop) onHideMenu(false);
    }, [isDesktop]);

    const location = useLocation()
    useEffect(()=>{ 
      if(!location.pathname.startsWith("/productos")){
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
            selectedTags, setSelectedTags
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

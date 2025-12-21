import { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import ContactModal from "../components/ContactModal";
import LoginModal from "../components/LoginModal";
import { useLocation, useNavigate } from "react-router-dom";

const UIContext = createContext(null)

export function UIProvider({ children }) {

    const [showLogin, onHideLogin] = useState(false)
    const [showContact, onHideContact] = useState(false)
    const [showMenu, onHideMenu] = useState(false)
    const [showFilter, onHideFilter] = useState(false)

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
            showLogin, 
            showContact,
            onHideContact, 
            onHideLogin, 
            showMenu,
            onHideMenu,
            showFilter, 
            onHideFilter
          }}>
          {children}
          <LoginModal show={showLogin} onHide={onHideLogin}/> 
          <ContactModal show={showContact} onHide={onHideContact}/>
        </UIContext.Provider>
      )
}


export const useUIContext = () => useContext(UIContext);
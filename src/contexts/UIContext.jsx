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

    // Paginador
    const [items, setItems] = useState([]); // Todos los datos
    const [currentPage,  setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage ] = useState(10); // Ejemplo: 10 por página
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const lastItemIndex = currentPage * itemsPerPage; 
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = items.slice(firstItemIndex, lastItemIndex);



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
            onHideFilter,
            totalPages,
            currentItems,
            currentPage,
            items,
            setCurrentPage,
            setItemsPerPage,
            setItems
          }}>
          {children}
          <LoginModal show={showLogin} onHide={onHideLogin}/> 
          <ContactModal show={showContact} onHide={onHideContact}/>
        </UIContext.Provider>
      )
}


export const useUIContext = () => useContext(UIContext);
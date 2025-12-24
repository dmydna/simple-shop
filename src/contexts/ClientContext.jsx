import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clientService } from '../services/clientService.js'; 
import { useUIContext } from "./UIContext.jsx";

export const ClientContext = createContext(null)

export function ClientProvider({ children }){
    
    const [visibleClients, setVisibleClients] = useState([])
    const [resetFilter, setResetFilter] = useState(false)
    const [search, setSearch] = useState("");
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setItems, setItemsPerPage, currentItems, setCurrentPage } = useUIContext();

    const fetchData = async () => {
        try {
            const data = await clientService.getAll();
            setClients(data.clients ? data.clients : data);
        } catch (err) {
           console.error("Error de carga de API", err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
      fetchData() ;
    }, []);


    const filtered = useMemo(() => {
        // Si no hay búsqueda, devolvemos todos los clientes
        if (!search) return clients;
    
        const lowerSearch = search.toLowerCase();
    
        return clients.filter(c => {
            const matchName = c.name?.toLowerCase().includes(lowerSearch);
            const matchEmail = c.email?.toLowerCase().includes(lowerSearch);
            return matchName || matchEmail;
        });
    }, [search, clients]);
  



    return (

        <ClientContext.Provider
        value={{
            visibleClients,
            setVisibleClients,
            setSearch,
            clients,
            filtered,
            setClients,
            fetchData
        }}
        >
            {children}
        </ClientContext.Provider>

    )
}


export const useClients = () => useContext(ClientContext);


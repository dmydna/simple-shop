import { createContext, useContext, useEffect, useMemo, useState } from "react";
import nprogress from "nprogress";
import {authService} from "../services/authService.js";

const AuthContext = createContext();


export function AuthProvider({ children }) 
{

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [error, setError] = useState(null);
  const [reset, setReset] = useState(false)

  const isAuth = useMemo(()=>{
    return token && user ? true : false
  },[token, user])

  const isAdmin = useMemo(()=>{
    return role == 'ADMIN' ? true : false
  },[token, user, role])

  useEffect (() => {
     if(reset){
        setError(null)
        setReset(false)
        setLoading(false)
     }
  },[reset])



   useEffect(() => 
    {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");

    if (savedToken && savedUser && savedRole) {
      setToken(savedToken);
      setUser(savedUser);
      setRole(savedRole);
      setLoading(false);
    }
  }, []);


  const login = async (userData) => {
    nprogress.start();
    setLoading(true);
    setError(null)
    try {
      const data = await authService.login(userData);
      setToken(data.accessToken)
      setRole(data.role)
      setUser(data.username || '')
    } catch (err) {
      console.error("Error de carga de API", err);
      setError("No se inicio session. Revisa tus credenciales.")
      throw err;
    } finally {
      setLoading(false);
      nprogress.done();
    }
  };


    const register = async (userData) => {
      nprogress.start();
      setLoading(true)
      setError(null)
      try{
        const data = await authService.register(userData);
      } catch (err){
        console.error("Error de carga de API", err);
        setError("Error. Revisa los campos solicitados.")
        throw err;
      } finally {
        setLoading(false)
        nprogress.done();
      }
    }

    const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

    return (
    <AuthContext.Provider 
     value={{ 
           isAdmin , 
           token, 
           user, 
           login, 
           logout, 
           isAuth,
           register, 
           loading, 
           error,
           setReset 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

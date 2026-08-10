import nprogress from "nprogress";
import { useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService.js";
import { userService } from "@/features/user/service/userService.js";
import { useNavigate } from "react-router-dom";
import { useUrlState } from "@/hooks/useUrlState.js";


export function useAuth() {

  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [reset, setReset] = useState(false);
  const [logged, setLogged] = useState(true)

  useEffect(() => {
    authService.getMe()
      .then(response => {
        setUser(response)
        setLocalStorage({...response})
      })
      .catch(() => setUser(null)) // Si responde 401, no está autenticado
      .finally(() => setLoading(false));
  },[]);

  const isAuth = useMemo(() => {
    return user ? true : false
  }, [user])

  const isAdmin = useMemo(() => {
    return user?.role == 'ADMIN' ? true : false
  }, [user])

  const expiredDate = useMemo(() => {
      return user?.expiredAt 
  },[user])


  useEffect(() => {
    if (reset) {
      setError(null)
      setReset(false)
      setLoading(false)
    }
  }, [reset])



  useEffect(() => {

    const args = ["username", "token", "role", "expiredAt"]
    const savedStorage = getLocalStorage(...args)

    if (savedStorage?.user && savedStorage?.role) {
      setToken(savedStorage?.token);
      setUser({ ...savedStorage });
      setLoading(false);
      setLogged(savedStorage?.token)
    }else{
      setToken(null);
      setUser(null);
      setLoading(false);
      setLogged(false)
    }
    
  }, [localStorage]);


  // DONE: implementar changePassword
  const changePassword = async (passwData) => {
    nprogress.start();
    setLoading(true)
    setError(null)
    try {
      await authService.changePassword(passwData);
    } catch (err) {
      console.error("Error de carga de API", err);
      setError("Error. Revisa los campos solicitados.", err)
      throw err;
    } finally {
      setLoading(false)
      nprogress.done();
    }
  }

  const changeEmail = async (data) => {
    nprogress.start();
    setLoading(true)
    setError(null)
    try {
      await authService.changeEmail(data);
    } catch (err) {
      console.error("Error de carga de API", err);
      setError("Error. Revisa los campos solicitados.", err)
      throw err;
    } finally {
      setLoading(false)
      nprogress.done();
    }
  }


  const login = async (userData) => {
    nprogress.start();
    setLoading(true);
    setError(null)
    setLogged(false)
    try {
      await authService.login(userData);
      const data = await authService.getMe();
      setToken(data?.accessToken || null)
      setUser(data || null)
      setLogged(true);
      setLocalStorage({...data})
      //// console.log(data)
    } catch (err) {
      console.error("Error de carga de API", err);
      setError("No se inicio session. Revisa tus credenciales.")
      throw err;
    } finally {
      setLoading(false);
      nprogress.done();
    }
  };


  const setLocalStorage = (object) =>{
      for(const key in object){
          localStorage.setItem(key, object[key])
      }
  }

  const removeLocalStorage = (...args) =>{
      for (const item of args){
          localStorage.removeItem(item)
      }
  }

  const getLocalStorage = (...args) => {
    const result = {};
    for (const item of args){
        result[item] = localStorage.getItem(item)
    }
  }


  const register = async (userData) => {
    nprogress.start();
    setLoading(true)
    setError(null)
    try {
      await authService.register(userData);
    } catch (err) {
      console.error("Error de carga de API", err);
      setError("Error. Revisa los campos solicitados.")
      throw err;
    } finally {
      setLoading(false)
      nprogress.done();
    }
  }

  const logout = () => {
    const args = ["token", "username", "role", "expiredAt"]
    setLoading(true)
    setError(null)
    authService.logout()
      .then(()=>{
        setToken(null);
        setUser(null);
        setLogged(false)
        removeLocalStorage(...args)
        navigate('/login')
      })
      .catch((err)=> {
        setUser(null)
        setLogged(false)
        setError(err)
      })
      .finally(() => setLoading(false))
  };

  return ({ 
    isAdmin, 
    expiredDate,
    isAuth,
    token, 
    user, 
    login, 
    logout, 
    register, 
    loading, 
    error,
    setReset,
    logged,
    setLogged,
    changePassword,
    changeEmail
  });
}


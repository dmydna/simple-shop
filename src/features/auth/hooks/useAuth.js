import nprogress from "nprogress";
import { useEffect, useMemo, useState } from "react";
import { authService } from "@f/auth/services/authService.js";
import { userService } from "@/features/user/service/userService.js";
import { useNavigate } from "react-router-dom";
import { useUrlState } from "@/hooks/useUrlState.js";
import { useFetch } from "@/hooks/useFetch";


export function useAuth() {

  const navigate = useNavigate()
  

  const {loading, setLoading, error, setError, success, setSuccess} =  useFetch()
  const [token, setToken] = useState(null);
  const [reset, setReset] = useState(false);
  const [logged, setLogged] = useState(true)
  
  const [auth, setAuth] = useState(null) // @ex [user, setUser] 

  useEffect(() => {
    authService.getMe()
      .then(response => {
        setAuth(response) // @ deprecado
        setLocalStorage({...response})
      })
      .catch(() => setAuth(null)) // Si responde 401, no está autenticado
      .finally(() => setLoading(false));
  },[]);

  const isAuth = useMemo(() => {
    return auth ? true : false
  }, [auth])

  const isAdmin = useMemo(() => {
    return auth?.role == 'ADMIN' ? true : false
  }, [auth])

  const expiredDate = useMemo(() => {
      return auth?.expiredAt 
  },[auth])


  useEffect(() => {
    if (reset) {
      setError(null)
      setReset(false)
      setLoading(false)
      setSuccess(null)
    }
  }, [reset])



  useEffect(() => {

    const args = ["username", "token", "role", "expiredAt"]
    const savedStorage = getLocalStorage(...args)

    if (savedStorage?.user && savedStorage?.role) {
      setToken(savedStorage?.token);
      setAuth({ ...savedStorage });
      setLoading(false);
      setLogged(savedStorage?.token)
    }else{
      setToken(null);
      setAuth(null);
      setLoading(false);
      setLogged(false)
    }
    
  }, [localStorage]);


  // DONE: implementar changePassword
  const changePassword = async (passwData) => {
    nprogress.start();
    setLoading(true)
    setSuccess(false)
    setError(null)
    try {
      await authService.changePassword(passwData);
      setSuccess(true)
    } catch (err) {
      console.error("Error de carga de API", err);
      setError(err)
      throw err;
    } finally {
      setLoading(false)
      nprogress.done();
    }
  }

  const changeEmail = async (data) => {
    nprogress.start();
    setSuccess(false)
    setLoading(true)
    setError(null)
    try {
      await authService.changeEmail(data);
      setSuccess(true)
    } catch (err) {
      console.error("Error de carga de API", err);
      setError(err)
      throw err;
    } finally {
      setLoading(false)
      nprogress.done();
    }
  }


  const login = async (userData) => {
    nprogress.start();
    setSuccess(false)
    setLoading(true);
    setError(null)
    setLogged(false)
    try {
      // login API
      await authService.login(userData);
      // login Frontend
      await authentication()
      setSuccess(true)
      setLogged(true)
    } catch (err) {
      console.error("Error de carga de API", err);
      setError(err)
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


  const authentication = async () => {
    const data = await authService.getMe();
    setToken(data?.accessToken || null)
    setAuth(data || null)
    setLogged(true);
    setLocalStorage({...data})
    return data;
  }

  const register = async (userData) => {
    nprogress.start();
    setLoading(true)
    setError(null)
    try {
      // registrar API (logea si es correcto)
      await authService.register(userData);
      // login Frontend
      await authentication()
    } catch (err) {
      console.error("Error de carga de API", err);
      setError(err)
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
        setAuth(null);
        setLogged(false)
        removeLocalStorage(...args)
        navigate('/login')
      })
      .catch((err)=> {
        setAuth(null)
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
    user: auth,
    auth, // reeplaza a user
    login, 
    logout, 
    register, 
    loading, 
    error,
    setReset,
    logged,
    setLogged,
    changePassword,
    changeEmail,
    setError,
    success,
    setSuccess,
    fetchStatus: {loading, setLoading, error, setError, success, setSuccess}
  });
}


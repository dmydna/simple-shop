import nprogress from "nprogress";
import { useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService.js";
import { userService } from "@/features/user/service/userService.js";


export function useAuth() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [reset, setReset] = useState(false);
  const [logged, setLogged] = useState(true)



  useEffect(() => {
    userService.getMe()
      .then(response => setUser(response.username))
      .catch(() => setUser(null)) // Si responde 401, no está autenticado
      .finally(() => setLoading(false));
  }, []);

  const isAuth = useMemo(() => {
    return user ? true : false
  }, [user])

  const isAdmin = useMemo(() => {
    return role == 'ADMIN' && isAuth ? true : false
  }, [token, user, role, isAuth])

  useEffect(() => {
    if (reset) {
      setError(null)
      setReset(false)
      setLoading(false)
    }
  }, [reset])



  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");

    if (savedUser && savedRole) {
      setToken(savedToken);
      setUser(savedUser);
      setRole(savedRole);
      setLoading(false);
      setLogged(savedToken)
    }else{
      setToken(null);
      setUser(null);
      setRole(null);
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
      const data = await authService.changePassword(passwData);
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
      const data = await userService.getMe();
      setToken(data?.accessToken || null)
      setRole(data?.role || null)
      setUser(data?.username || '')
      setLogged(true);
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
    try {
      const data = await authService.register(userData);
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
    setToken(null);
    setUser(null);
    setLogged(false)
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return ({ 
    isAdmin, 
    token, 
    user, 
    login, 
    logout, 
    isAuth,
    register, 
    loading, 
    error,
    setReset,
    logged,
    setLogged,
    changePassword 
  });
}


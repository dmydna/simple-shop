import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "../../auth/hooks/AuthContext.jsx";
import {profileService} from "../services/profileService.js";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { toast } from "react-toastify";

const UserContext = createContext();

export function UserProvider({ children }) {

    const [ loading, setLoading ] = useState(true);
    const [ profile, setProfile ] = useState({})
    const [ error, setError ] = useState(null);
    const { isAuth } = useAuth()

    const fetchData = async () => {
        nprogress.start();
        setLoading(true)
        setError(null)
        try{
            const data = await profileService.getMyUser();
            setProfile(data)
            return data
        } catch (err){
            console.error("Error de carga de API", err);
            setError("No se realizo ninguna accion.")
            throw err;
        } finally {
            setLoading(false)
            nprogress.done();
        }
    }


   const updateImage = async (selectedFile) => {
    if (!selectedFile) return alert("Por favor selecciona un archivo");

    try {
      // Aquí llamas a tu función imageUpload del servicio
        setLoading(true)
        setError(null)
        nprogress.start();
        await profileService.imageUpload(selectedFile);
        toast.success("Imagen subida con éxito");
        fetchData();
    } catch (err) {
       alert("Error al subir: " + error.message);
       setError(err.message);
       throw err
    } finally {
        setLoading(false)
    }
    }

    const updatePerfil = async () => {
        nprogress.start();
        setLoading(true)
        setError(null)
        try{
            await profileService.update(profile);
            toast.success("Se actualizo profile!");
        } catch (err){
            console.error("Error de carga de API", err);
            setError("No se realizo ninguna accion.")
            toast.error("Error No se realizo ninguna accion.");
        } finally {
            setLoading(false)
            nprogress.done();
        }
    }

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;
        setProfile({ ...profile, [name]: val });
    };

    useEffect(()=>{
        fetchData()
    },[isAuth])

    return (
        <UserContext.Provider
            value={{ fetchData, profile, loading, profileService, handleChange, updatePerfil , updateImage }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);

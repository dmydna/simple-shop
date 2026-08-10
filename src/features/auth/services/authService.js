// src/services/authService.js
import { api } from "@/utils/api";
import { ENDPOINT } from "@utils/config.js";


const BASE_ENDPOINT = ENDPOINT.AUTH

export const authService = {

    // Login: Envía credenciales y guarda el token
    login: async (credentials) => {
        const finalEndpoint = `${BASE_ENDPOINT}/login`
        const response = await api.post(finalEndpoint, credentials)
        return response;
    },

    // Registro: Crea el usuario y el profile de cliente
    register: async (userData) => {
        const finalEndpoint = `${BASE_ENDPOINT}/register`
        const response = await api.post(finalEndpoint, userData)
        return response;
    },

    // Logout: Limpia el storage
    logout: async () => {
        const finalEndpoint = `${BASE_ENDPOINT}/logout`
        const response = await api.post(finalEndpoint)
        return response;
    },

    // Helper para obtener el token guardado
    getToken: () => {
        return localStorage.getItem("token");
    },


    // Registro: Crea el usuario y el profile de cliente
    changePassword: async (data) => {
        // data = {newPassword, oldPassword}
        const finalEndpoint = `${BASE_ENDPOINT}/change-password`
        const response = await api.post(finalEndpoint, data)
        return response;    
    },

    changeEmail: async (data) => {
        // data = {password, newEmail}
        const finalEndpoint = `${BASE_ENDPOINT}/change-email`
        const response = await api.post(finalEndpoint, data)
        return response;    
    },


    getMe: async () => {
        const finalEndpoint = `${BASE_ENDPOINT}/me`
        const response = await api.get(finalEndpoint)
        return response;      
    },


};

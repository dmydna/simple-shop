// src/services/authService.js
import { BASE_URL, ENDPOINTS } from "@utils/config.js";
import {responseHandler} from '@utils/service.js';



const ENDPOINT = ENDPOINTS.AUTH

export const authService = {
    // Login: Envía credenciales y guarda el token
    login: async (credentials) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        return responseHandler(response);
    },

    // Registro: Crea el usuario y el profile de cliente
    register: async (userData) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return responseHandler(response);
    },

    // Logout: Limpia el storage
    logout: async () => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        return responseHandler(response);
    },

    // Helper para obtener el token guardado
    getToken: () => {
        return localStorage.getItem("token");
    },


    // Registro: Crea el usuario y el profile de cliente
    changePassword: async (data) => {
        // data = {newPassword, oldPassword}
        console.log(data)
        const TOKEN = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/change-password`, {
            method: 'POST',
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
                ...(TOKEN && {'Authorization': `Bearer ${TOKEN}`})
            },
            body: JSON.stringify(data)
        });
        
        return responseHandler(response);
    }


};

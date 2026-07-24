// src/services/authService.js
import { BASE_URL, ENDPOINTS } from "@utils/config.js";
import { responseError } from '@utils/service.js';



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

        if (!response.ok) {
            return responseError(response)
        }

        const data = await response.json(); // Recibimos { token: "..." }
        console.log(data)

        if (data) {
            // Guardamos para futuras peticiones
            localStorage.setItem("token", data?.accessToken);
            localStorage.setItem("user", data?.username);
            localStorage.setItem("role", data?.role);
        }

        return data;
    },

    // Registro: Crea el usuario y el profile de cliente
    register: async (userData) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response.text();
    },

    // Logout: Limpia el storage
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/auth"; // Redirigir al usuario
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
        if (!response.ok) {
            return responseError(response)
        }
        return await response.text();
    }


};

import { BASE_URL , ENDPOINTS } from "@utils/config.js";

const ENDPOINT = ENDPOINTS.PROFILE;


export const profileService = {

    getMyOrders:  async () => {
        const TOKEN = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/orders`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...( TOKEN && {'Authorization': `Bearer ${TOKEN}`} )
            }
        });
        if (response.ok) {
            const orders = await response.json();
            console.log("My orders: ", orders);
            return orders;
        } else {
            console.error("No autorizado o error de servidor");
        }

    },

    getMyUser : async () => {

        // importante: el token aca. evita errores de sincronizacion.
        const TOKEN = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/my`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(TOKEN && {'Authorization': `Bearer ${TOKEN}`} )
            }
        });

        if (response.ok) {
            const userDto = await response.json();
            // console.log("Datos del profile:", userDto);
            // Aquí userDto ya es un objeto plano, sin recursión
            return userDto;
        } else {
            console.error("No autorizado o error de servidor");
        }
    },

    update: async (profileData) => {

        const TOKEN = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/update`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(TOKEN && { 'Authorization': `Bearer ${TOKEN}` }),
            },
            body: JSON.stringify(profileData)
        });
        if (!response.ok) throw new Error("Error al actualizar producto");
        return await response.json();
    },

    imageUpload: async (selectedFile) => {

        const TOKEN = localStorage.getItem('token');

        const formData = new FormData();
        formData.append("file", selectedFile); // "file" debe coincidir con el @RequestParam de Java

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/upload-image`, {
            method: 'PUT',
            body: formData,
            credentials: 'include',
            ...(TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}` } })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al subir imagen: ${errorText}`);
        }
        return await response.text();
    },



}

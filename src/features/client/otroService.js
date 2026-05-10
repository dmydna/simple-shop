// src/services/clientService.js
import {BASE_URL,ENDPOINTS,TOKEN} from "../../utils/config.js";

const ENDPOINT = ENDPOINTS.PERFIL

// @deprecated
export const clientService = {

    getMyPerfil: async () => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/my`);
        if (!response.ok) throw new Error("Error al obtener clientes");
        return await response.json();
    },

    imageUpload: async (id, selectedFile) => {

        const formData = new FormData();
        formData.append("file", selectedFile); // "file" debe coincidir con el @RequestParam de Java

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/upload-image`, {
            method: 'POST',
            body: formData,
            headers: {
                // Agrega el header de autorización
                'Authorization': `Bearer ${TOKEN}`
                // Nota: No es necesario 'Content-Type' porque no hay 'body'
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al subir imagen: ${errorText}`);
        }
        return await response.text();
    },

    update: async (id, listingData) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(listingData)
        });
        if (!response.ok) throw new Error("Error al actualizar producto");
        return await response.json();
    },


}
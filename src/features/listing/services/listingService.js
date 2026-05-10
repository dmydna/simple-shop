// src/services/listingService.js
import {toUpdateListing, toCreateListing} from '@utils/mapper.js'


import { BASE_URL, ENDPOINTS, mapToURLSearchParams, ROLE, TOKEN } from "../../../utils/config.js";
const ENDPOINT = ENDPOINTS.LISTENING;
const CREDENTIALS = ROLE == 'ADMIN' ? { 'Authorization': `Bearer ${TOKEN}`} : {}

/* ========= HTTP ==========
  - 1XX (Información)
  - 2XX (Éxito)
  - 3XX (Redirección)
  - 4XX (Error del cliente)
  - 5XX (Error del servidor)
 ========================= */

export const listingService = {

    /* ----------- OBSOLETOS  ----------------- */


    // GET ALL: Obtener todos las publicaciones (anuncios)
    getAll: async () => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`);
        if (!response.ok) throw new Error("Error al obtener productos");
        return await response.json();
    },

    /* ---------- FIN OBSOLETOS -------------------  */

    // GET: Obtener un producto por ID
    getById: async (id) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        return await response.json();
    },

    getByHash: async (hash) => {
        console.log("obtiene por hash", hash)
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/hash/${hash}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        const data = await response.json();
        return data?.listing
    },

    // Cambiamos la firma para recibir un objeto desestructurado
    getPage : async ({ page = 0, size = 10, ...filters } = {}) => {

        const TOKEN = localStorage.getItem("token")
        // 1. Creamos un objeto plano para los parámetros
        const cleanParams = new URLSearchParams();

        cleanParams.append('page', page);
        cleanParams.append('size', size);

        // 2. Agregamos los filtros dinámicamente
        mapToURLSearchParams(cleanParams, filters);

        console.log("URL Corregida:", cleanParams.toString());

        const response = await fetch(`${BASE_URL}/${ENDPOINT}?${cleanParams.toString()}`,    
             {headers: CREDENTIALS}
            );
        if (!response.ok) throw new Error("Error en la API");
        return await response.json();
    },


    /* ------------- ACCESO CON TOKEN ------------------ */

    // POST: crear listing con imagenes (permite sin imagenes)
    create: async (data, selectedFile) => {

        const listingData = toCreateListing(data);
        const TOKEN = localStorage.getItem("token");
        const formData = new FormData();

        // Parte 1: JSON con tipo explícito
        formData.append('listing', new Blob([JSON.stringify(listingData)], {
            type: 'application/json'
        }));
    
        // Parte 2: Archivo
        if (selectedFile && selectedFile?.length !== 0) {
            selectedFile?.forEach((file) => {
                formData.append('files', file); // 'images' es el nombre que recibirá tu backend
            });
        }
    
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, {
            method: 'POST',
            headers: {
                // SOLO agregar el TOKEN.
                'Authorization': `Bearer ${TOKEN}`
                // Nota: no se agrega 'Content-Type', el navegador lo hara solo.
            },
            body: formData
        });
    
        if (!response.ok) {
            const errorData = await response.json(); // Intentar leer el error del servidor
            console.error("Detalle del error:", errorData);
            throw new Error("Error 400: Revisa el formato de los datos");
        }
        return await response.json();
    },

    updateStatus: async (id, status) => {
        // Pasa  visibilidad como un Query Parameter (?visibility=...)
        const TOKEN = localStorage.getItem("token")
        const encodedStatus = encodeURIComponent(status);
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}/status?status=${encodedStatus}`, {
            method: 'PATCH',
            headers: {
                // Agrega el header de autorización
                'Authorization': `Bearer ` + TOKEN
                // Nota: No es necesario 'Content-Type' porque no hay 'body'
            }
        });
    
        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || "No se actualizó la visibilidad");
        }
        return await response.json();
    },

    imageUpload: async (id, selectedFile) => {

        const TOKEN = localStorage.getItem("token")
        const formData = new FormData();
        formData.append("file", selectedFile); // "file" debe coincidir con el @RequestParam de Java
      
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}/upload-image`, {
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

    // PUT: Actualiza producto por ID
    update: async (data, selectedFiles = null) => {
        const TOKEN = localStorage.getItem("token")
        const listingData = toUpdateListing(data);
        const formData = new FormData();

        formData.append('data', new Blob([JSON.stringify(listingData)], {
            type: 'application/json'
        }));

        if (selectedFiles?.length !== 0) {
            selectedFiles?.forEach((file) => {
                formData.append('files', file); // 'images' es el nombre que recibirá tu backend
            });
        }

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${data.id}`, {
            method: 'PUT',
            headers: {
                // SOLO agregar el TOKEN.
                'Authorization': `Bearer ${TOKEN}`
                // Nota: no se agrega 'Content-Type', el navegador lo hara solo.
            },
            body: formData
        });

        if (!response.ok) throw new Error("Error al actualizar producto");
        return await response.json();
    },

    // DELETE: Eliminar un producto por ID
    Delete: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'DELETE',
            headers: {
                // Agrega el header de autorización
                'Authorization': `Bearer ${TOKEN}`
                // Nota: No es necesario 'Content-Type' porque no hay 'body'
            }
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el producto");
        }
        return response.status === 204 ? // HTTP 202 Accepted
        { success: true } : await response.json();
    },


};

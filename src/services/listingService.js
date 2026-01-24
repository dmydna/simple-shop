// src/services/listingService.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const ENDPOINT = "api/listing"


export const listingService = {
    // GET ALL: Obtener todos los productos
    getAll: async () => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`);
        if (!response.ok) throw new Error("Error al obtener productos");
        return await response.json();
    },

    // GET: Obtener un producto por ID
    getById: async (id) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        return await response.json();
    },

    getByHash: async (hash) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/hash/${hash}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        return await response.json();
    },

    // Cambiamos la firma para recibir un objeto desestructurado
    getPage : async ({ page = 0, size = 10, ...filters } = {}) => {

        // 1. Creamos un objeto plano para los parámetros
        const cleanParams = new URLSearchParams();

        cleanParams.append('page', page);
        cleanParams.append('size', size);

        // 2. Agregamos los filtros dinámicamente
        Object.entries(filters).forEach(([key, value]) => {
            // Solo agregamos si el valor existe y no es un objeto/array vacío
            if (value !== undefined && value !== null && value !== '') {
                if (Array.isArray(value) && value.length > 0) {
                    cleanParams.append(key, value.join(','));
                } else if (!Array.isArray(value)) {
                    cleanParams.append(key, value);
                }
            }
        });

        console.log("URL Corregida:", cleanParams.toString());

        const response = await fetch(`${BASE_URL}/${ENDPOINT}?${cleanParams.toString()}`);
        if (!response.ok) throw new Error("Error en la API");
        return await response.json();
    },
    // POST: Crear un nuevo producto
    create: async (productData) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error("Error al crear producto");
        return await response.json();
    },


    createWithImage: async (listingDTO, selectedFile) => {
        const formData = new FormData();
    
        // Parte 1: JSON con tipo explícito
        formData.append('listing', new Blob([JSON.stringify(listingDTO)], {
            type: 'application/json'
        }));
    
        // Parte 2: Archivo
        if (selectedFile) {
            formData.append('file', selectedFile);
        }
    
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, {
            method: 'POST',
            // Sin headers manuales de Content-Type
            body: formData
        });
    
        if (!response.ok) {
            const errorData = await response.json(); // Intentar leer el error del servidor
            console.error("Detalle del error:", errorData);
            throw new Error("Error 400: Revisa el formato de los datos");
        }
        return await response.json();
    },

    updateVisibility: async (id, visibility) => {
        // 1. Pasamos la visibilidad como un Query Parameter (?visibility=...)
        // 2. Quitamos la barra final si el backend no la espera
        const response = await fetch(`${BASE_URL}/${id}/visibility?visibility=${visibility}`, {
            method: 'PATCH',
        });
    
        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || "No se actualizó la visibilidad");
        }
        return await response.json();
    }
    ,

    imageUpload: async (id, selectedFile) => {
        const formData = new FormData();
        formData.append("file", selectedFile); // "file" debe coincidir con el @RequestParam de Java
      
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}/upload-image`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al subir imagen: ${errorText}`);
        }
        return await response.text();
      },

    // POST: Crear a partir de una lista producto
    createBulk: async (productDataList) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productDataList)
        });
        if (!response.ok) throw new Error("Error al crear producto");
        return await response.json();
    },

    // PUT: Actualiza producto por ID
    update: async (id, productData) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error("Error al actualizar producto");
        return await response.json();
    },

    // DELETE: Eliminar un producto por ID
    delete: async (id) => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el producto");
        }
        return response.status === 204 ? 
        { success: true } : await response.json();
    },


};

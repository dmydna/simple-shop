// src/services/productService.js
import {mapToURLSearchParams, BASE_URL} from "../../../utils/config.js";

const ENDPOINT = "api/products"

/* ------ ACCESO CON TOKEN ------- */

export const productService = {

    getPage : async ({ page = 0, size = 10, ...filters } = {}) => {
        // 1. Creamos un objeto plano para los parámetros

        const TOKEN = localStorage.getItem("token")

        const cleanParams = new URLSearchParams();

        cleanParams.append('page', page);
        cleanParams.append('size', size);

        // 2. Agregamos los filtros dinámicamente
        mapToURLSearchParams(cleanParams, filters)

        console.log("URL con Parametros:", cleanParams.toString());

        const response = await fetch(`${BASE_URL}/${ENDPOINT}?${cleanParams.toString()}` , {
            headers: {'Authorization': `Bearer ${TOKEN}`},
        });
        if (!response.ok) throw new Error("Error en la API");
        return await response.json();
    },

    /* ----------------- OBSOLETOS --------------- */

    // GET ALL: Obtener todos los productos
    getAll: async () => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`);
        if (!response.ok) throw new Error("Error al obtener productos");
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

    /* ------------------------------------------- */

    // GET: Obtener un producto por ID
    getById: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` },
        });
        if (!response.ok) throw new Error("Producto no encontrado");
        return await response.json();
    },

    // POST: Crear a partir de una lista producto
    createBulk: async (productDataList) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/bulk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(productDataList)
        });
        if (!response.ok) throw new Error("Error al crear producto");
        return await response.json();
    },

    // PUT: Actualiza producto por ID
    update: async (id, productData) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error("Error al actualizar producto");
        return await response.json();
    },

    // DELETE: Eliminar un producto por ID
    delete: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${TOKEN}`}
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el producto");
        }
        return response.status === 204 ? 
        { success: true } : await response.json();
    }
};

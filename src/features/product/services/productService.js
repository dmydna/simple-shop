// src/services/productService.js

import { responseError } from "@utils/service";
import { toUpdateProduct, toCreateProduct, mapToURLSearchParams } from "@/utils/mappers.js";
import { BASE_URL } from "@utils/config.js";

const ENDPOINT = "api/products"

/* ------ ACCESO CON TOKEN ------- */

export const productService = {

    // POST: Crear un nuevo producto.
    create: async (data) => {
        const productData = toCreateProduct(data);
        const TOKEN = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
             },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },


    // GET: Obtener productos paginados.
    getPage: async ({ page = 0, size = 10, ...filters } = {}) => {
        // 1. Creamos un objeto plano para los parámetros
        console.log('\n --- GET PAGE PRODUCT --\n')
        const TOKEN = localStorage.getItem("token")
        const cleanParams = new URLSearchParams();
        cleanParams.append('page', page);
        cleanParams.append('size', size);

        // 2. Agregamos los filtros dinámicamente
        mapToURLSearchParams(cleanParams, filters)

        console.log("-- URL con Parametros:", cleanParams.toString());

        const response = await fetch(`${BASE_URL}/${ENDPOINT}?${cleanParams.toString()}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` },
        });

        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },


    // GET: Obtener un producto.
    getById: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` },
        });
        if (!response.ok) {
            return responseError(response)
        }
        const data = await response.json();
        return {...data, ...data.dimensions};
    },


   // TODO: borrar id de firma de productService.update
    // PUT: Actualiza producto.
    update: async (id, data) => {
        const productData = toUpdateProduct(data);
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    // DELETE: Eliminar un producto.
    delete: async (id) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });

        if (!response.ok) {
            return responseError(response)
        }
        return response.status === 204 ?
            { success: true } : await response.json();
    },

    // PATCH: Actualizar status = {ACTIVE, INACTIVE, DRAFT, DELETED}
    updateStatus: async (id, status) => {
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/${id}/status?status=${status}`, {
            method: 'PATCH',
            headers: {
                // Agrega el header de autorización
                'Authorization': `Bearer ` + TOKEN
                // Nota: No es necesario 'Content-Type' porque no hay 'body'
            }
        });

        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },
}

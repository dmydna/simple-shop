import { api } from "@/utils/api";
import { ENDPOINT } from "@utils/config.js";
import { mapToURLSearchParams } from "@utils/mappers.js";

const BASE_ENDPOINT = ENDPOINT.REVIEWS


/**
 * Servicio para gestionar las peticiones API de **reseñas**.
 * - Proporciona metodos **CRUD** para recursos de `api/reviews`.
 */
export const reviewService = {

    // GET: Obtener solicitud para escribir reseña
    getById: async (id) => {
        const finalEndpoint = `${BASE_ENDPOINT}/requests/${id}`
        const response = await api.get(finalEndpoint)
        return response
    },


    // GET: Obtener paginas de solicitud para escribir reseñas
    getPage: async ({ page = 0 , size = 8, ...filters } = {}) => {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('size', size);
        mapToURLSearchParams(params, filters);
        const finalEndpoint = `${BASE_ENDPOINT}/requests`
        const response = await api.get(finalEndpoint, params);
        return response;
    },

    // DELETE: Eliminar solicitud para escribir reseñas
    Delete: async (productId) => {
        const finalEndpoint = `${BASE_ENDPOINT}/requests/${productId}`
        const response = await api.delete(finalEndpoint)
        return response
    },

    // DELETED: Eliminar reseña.
    deleteReview: async (productId) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${productId}`
        const response = await api.delete(finalEndpoint)
        return response
    },

    // PUT: Actualizar reseña
    updateReview: async (id, data) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}`
        const response = await api.put(finalEndpoint, data)
        return response;
    }


}



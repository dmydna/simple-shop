import { api } from "@/utils/api";
import { ENDPOINT } from "@utils/config.js";
import { mapToURLSearchParams } from "@utils/mappers.js";


const BASE_ENDPOINT = ENDPOINT.FAVORITE;


/**
 * Servicio para gestionar las peticiones API de **favoritos**.
 * - Proporciona metodos **CRUD** para recursos de `api/favorites`.
 */
export const favoriteService = {

    getPage: async ({ page = 0 , size = 8, ...filters } = {}) => {
        const params = new URLSearchParams();
        const finalEndpoint = BASE_ENDPOINT
        params.append('page', page);
        params.append('size', size);
        mapToURLSearchParams(params, filters);
        const response = await api.get(finalEndpoint, params)
        return response;
    },

    create: async (listingId) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${listingId}`
        const response = await api.post(finalEndpoint)
        return response;  
    },


    isFavoriteProduct: async (listingId) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${listingId}/check`
        const {isFavorite} = await api.get(finalEndpoint)
        return isFavorite;  
    },    



    Delete: async (listingId) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${listingId}`
        const response = await api.delete(finalEndpoint)
        return response;   
    },

}


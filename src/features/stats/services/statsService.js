// src/statsService.js

// TODO: text 
import { BASE_URL, ENDPOINTS } from "@utils/config.js";
import { responseError } from '@utils/service.js';
const ENDPOINT = ENDPOINTS.STATS;

export const statsService = {

	getStats: async () => {
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`);
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },

    getTop: async ({type, limit=0}) => {
    	// type :  visits || ranked || sales || categories || tags
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/top/${type}?limit=${limit}`);
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    }
    
}
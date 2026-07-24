import { BASE_URL, ENDPOINTS } from "@utils/config.js";
import { responseError } from '@utils/service.js';
const ENDPOINT = ENDPOINTS.HEALTH;

export const heathService = {

	checkConnection: async () => {
        // Pasa  visibilidad como un Query Parameter (?visibility=...)
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/`, {
            method: 'GET',
            credentials: 'include', // enviar/recibir cookies
            ...(TOKEN && { headers : {'Authorization': `Bearer ${TOKEN}`} })
        });
    
        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    },
}

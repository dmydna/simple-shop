import { BASE_URL, ENDPOINTS } from "@utils/config.js";
import { responseError } from '@utils/service.js';
const ENDPOINT = ENDPOINTS.HEALTH;

export const heathService = {

	checkConnection: async () => {
        // Pasa  visibilidad como un Query Parameter (?visibility=...)
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/`, {
            method: 'GET',
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

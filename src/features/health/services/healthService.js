import { api } from "@/utils/api";
import { ENDPOINT } from "@utils/config.js";


const BASE_ENDPOINT = ENDPOINT.HEALTH;

export const healthService = {

    // GET: Verifica la coneccion con el servidor
	checkConnection: async () => {
        const finalEndpoint = `${BASE_ENDPOINT}`
        const response = await api.get(finalEndpoint)
        return response
    },
}

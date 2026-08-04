import { mapToURLSearchParams } from "@/utils/mappers";
import { responseError, responseHandler } from "@/utils/service";
import { BASE_URL , ENDPOINTS } from "@utils/config.js";

const ENDPOINT = ENDPOINTS.PROFILE;


export const profileService = {

    getMyOrders:  async () => {
        const TOKEN = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/orders`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...( TOKEN && {'Authorization': `Bearer ${TOKEN}`} )
            }
        });
        
        return responseHandler(response);

    },

    getMyUser : async () => {

        // importante: el token aca. evita errores de sincronizacion.
        const TOKEN = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/my`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(TOKEN && {'Authorization': `Bearer ${TOKEN}`} )
            }
        });
        
        return responseHandler(response);
    },

    update: async (profileData) => {

        const TOKEN = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/update`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(TOKEN && { 'Authorization': `Bearer ${TOKEN}` }),
            },
            body: JSON.stringify(profileData)
        });

        return responseHandler(response);
    },

    imageUpload: async (selectedFile) => {

        const TOKEN = localStorage.getItem('token');

        const formData = new FormData();
        formData.append("file", selectedFile); // "file" debe coincidir con el @RequestParam de Java

        const response = await fetch(`${BASE_URL}/${ENDPOINT}/upload-image`, {
            method: 'PUT',
            body: formData,
            credentials: 'include',
            ...(TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}` } })
        });
        
        return responseHandler(response);
    },


    getMyPurchases: async ({ page = 0 , size = 8, ...filters } = {}) => {

        const TOKEN = localStorage.getItem("token")
        // 1. Creamos un objeto plano para los parámetros
        const cleanParams = new URLSearchParams();

        cleanParams.append('page', page < 0 ? 0 : page);
        cleanParams.append('size', size);

        // 2. Agregamos los filtros dinámicamente
        mapToURLSearchParams(cleanParams, filters);

        const response = await fetch(`${BASE_URL}/api/buy/history?${cleanParams.toString()}`, 
            { 
                credentials: 'include',
                ...( TOKEN && { headers: { 'Authorization': `Bearer ${TOKEN}`} } )
            }
        );

        if (!response.ok) {
            return responseError(response)
        }
        return await response.json();
    }


}

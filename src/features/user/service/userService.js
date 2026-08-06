// src/services/userService.js
import { mapToURLSearchParams } from "@utils/mappers.js" 
import { ENDPOINTS, BASE_URL } from "@utils/config.js";
import { api } from "@/utils/api";
const ENDPOINT = ENDPOINTS.USER;


export const userService = {

    getPage : async ({ page = 0, size = 10, ...filters } = {}) => {
        const finalEndpoint = ENDPOINTS.USER
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('size', size);
        mapToURLSearchParams(params, filters)
        const response = await api.get(finalEndpoint, params.toString());
        return response;
    },

    getMyProfile: async () => {
        const finalEndpoint = `${ENDPOINT}/me`;
        const response = await api.get(finalEndpoint);
        return response;
    },


    /* Requiere ROLE: ADMIN */
    getById: async (id) => {
        const finalEndpoint = `${ENDPOINT}/${id}`;
        const response =  await api.get(finalEndpoint);
        return response
    },


    /* Requiere ROLE: ADMIN */
    delete: async (id) => {
        const finalEndpoint = `${ENDPOINT}/${id}`;
        const response =  await api.get(finalEndpoint);
        return response;
    },

    /* Requiere ROLE: ADMIN */
    updateStatus: async (id, status) => {
        const finalEndpoint = `${ENDPOINT}/${id}/status`;
        const params = new URLSearchParams();
        params.append('status', status);
        const response = await api.patch(finalEndpoint, params)
        return response;
    },

    /* Requiere ROLE: ADMIN */
    banUser: async (id, banRequest) => {
        const finalEndpoint = `${ENDPOINT}/${id}/ban-user`
        const response = api.patch(finalEndpoint, banRequest)
        return response; // {success: true}
    },
    

    /* Requiere ROLE: ADMIN */
    unbanUser: async (id) => {
        const finalEndpoint = `${ENDPOINT}/${id}/unban-user`
        const response = api.patch(finalEndpoint)
        return response;  // {success: true}
    },


    imageUploadProfile: async (selectedFile) => {
        const endpoint = `${ENDPOINTS.USER}/me/upload-image`;
        const formData = new FormData();
        // "file" debe coincidir con el @RequestParam de Java
        formData.append("file", selectedFile); 
        const response = await api.put(endpoint, formData)
        return response;
    },


    updateMyProfile: async (profileData) => {
        const endpoint = `${ENDPOINTS.USER}/me`;
        const response = await api.put(endpoint, profileData)
        return response;
    },
};

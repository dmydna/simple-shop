// src/services/orderService.js
import { ENDPOINTS, BASE_URL } from "@utils/config.js";

const ENDPOINT = ENDPOINTS.BUY

export const buyService = {

    // POST: Crear un nuevo pedido
    create: async (buyData) => {
        console.log("[BUY SERVICES]: ",buyData)
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(TOKEN && {'Authorization': `Bearer ${TOKEN}`})
            },
            body: JSON.stringify(buyData)
        });
        if (!response.ok) throw new Error("Error al crear pedido de compra");
        return await response.text();
    }
};

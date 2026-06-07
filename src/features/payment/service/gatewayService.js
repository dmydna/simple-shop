import { BASE_URL, ENDPOINTS  } from "@utils/config.js";

const ENDPOINT = ENDPOINTS.GATEWAY 

export const gatewayService = {

    // POST: Crear un nuevo un nuevo token de la pasarela
    create: async (paymentData) => {
        console.log(paymentData)
        const TOKEN = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/${ENDPOINT}/initiate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + TOKEN
            },
            body: JSON.stringify(paymentData)
        });
        if (!response.ok) throw new Error("Error en la pasarela de pago");
        return await response.text();
    }

};

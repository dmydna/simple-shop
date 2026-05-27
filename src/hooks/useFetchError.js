import { useEffect, useState } from "react";
import {arrayToDate} from "@utils/mappers.js"
import {useAuth} from "@features/auth/hooks/AuthContext"


export const useFetchError = ({error, isAdmin = false}) => {



    // 2. Extraer los mensajes
    // Tu API devuelve: { error: "...", message: "..." }
	const detailedMessage = errorData?.message || errorData?.error || "Ocurrió un error desconocido.";
	const genericMessage = "Hubo un error al procesar la solicitud. Intente nuevamente.";

    // 3. Determinar qué mostrar
	const displayMessage = isAdmin ? detailedMessage : genericMessage;



	return {
		displayMessage,
		detailedMessage,
		genericMessage,
		errorData,
	    ...errorData
	}

}
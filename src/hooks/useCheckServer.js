import { BASE_URL } from "@/utils/config";
import { useState, useEffect } from "react";



// TODO: (1) mover  checkServer a @features/health/hooks
export const checkServer = async (url, handleStatus) => {
    try {
        const response = await fetch(url, { signal: AbortSignal.timeout(5000) });

        if (!response.ok) {
            handleStatus('servidor_error'); // 500, 503, etc.
        }
        handleStatus('ok');
    } catch (error) {
        if (!navigator.onLine) {
            handleStatus('sin_internet');
        }
        // fetch falló pero hay internet → servidor caído o SSL error
        handleStatus('servidor_caido');
    }
}


export const useCheckServer = (isOnline) => {
    const [serverStatus, setServerStatus] = useState('ok');
    
    useEffect(() => {
        if (isOnline) {
            checkServer(`${BASE_URL}/api/health`, setServerStatus)
                .then(setServerStatus);
        }
    }, [isOnline]);

    return ({ isOnline, serverStatus })
}

export default useCheckServer;
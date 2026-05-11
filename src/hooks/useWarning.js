import { useProfile } from "@/features/profile/contexts/ProfileContext";
import { useEffect, useState } from "react";

// NOTA este hook centraliza warnings de todo tipo
export const useWarning = () => {

    const { profile } = useProfile();
    const [ completeRegistration, setCompleteRegistration ] = useState(false)
       
    useEffect(()=>{
         if(
            profile?.firstName?.trim() || 
            profile?.lastName?.trim() ||
            profile?.address?.trim() ||
            profile?.phone?.trim()
         )  { setCompleteRegistration(true) } 
         else { setCompleteRegistration(false) }
    },[profile])


    return {
        completeRegistration, setCompleteRegistration
    }
}
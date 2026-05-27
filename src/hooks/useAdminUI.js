import { useAuth } from "@/features/auth/hooks/AuthContext";
import { useEffect, useState } from "react";

export const useAdminUI = () => {

    const {isAdmin, logged} = useAuth()
    const [appMode, setAppMode] = useState("user");
    const [showSidebar, setShowsider] = useState(false)


    useEffect(()=>{
        setAppMode(`${isAdmin && logged ? "admin" : "user"}`)
        console.log("isAdmin: ",isAdmin)
    },[isAdmin, logged])


    useEffect(() => {

        if (appMode == "admin" && logged) {
            if(document.querySelector("body")){
                document.querySelector("body")
                        .classList.add("active-bar");
            }
        } else {
            if(document.querySelector("body")){
                document.querySelector("body")
                        .classList.remove("active-bar");
            }
        }
    }, [appMode, showSidebar, logged])

    return { 
        isAdmin,
        appMode, 
        setAppMode, 
        showSidebar, 
        setShowsider 
    }
}

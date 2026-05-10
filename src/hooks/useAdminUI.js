import { useAuth } from "@/features/auth/hooks/AuthContext";
import { useEffect, useState } from "react";

export const useAdminUI = (mode) => {

    const {isAdmin, logged} = useAuth()
    const [appMode, setAppMode] = useState("user");
    const [showSidebar, setShowsider] = useState(false)


    useEffect(()=>{
        setAppMode(`${isAdmin ? "admin" : "user"}`)
        console.log("isAdmin: ",isAdmin)
    },[isAdmin, logged])


    useEffect(() => {
        const enabled_margin = showSidebar ? "200px" : "60px";
        const enabled_display = showSidebar ? "none" : "block";
        const disabled_margin = "0px"

        if (appMode == "admin") {
            if(document.querySelector("body")){
                document.querySelector("body").classList.add("active-bar");
            }
            // if (document.querySelector("#content")) {
            //     document.querySelector("#content").style.marginLeft = enabled_margin
            // }
            // if (document.querySelector("#navbar")) {
            //     document.querySelector("#navbar").style.marginLeft = enabled_margin
            // }
        } else {
            // if (document.querySelector("#content")) {
            //     document.querySelector("#content").style.display = disabled_margin
            // }
            // if (document.querySelector("#navbar")) {
            //     document.querySelector("#navbar").style.marginLeft = disabled_margin
            // }

        }
    }, [appMode, showSidebar])

    return { 
        appMode, 
        setAppMode, 
        showSidebar, 
        setShowsider 
    }
}
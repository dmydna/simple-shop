import SidebarProfileMobile from "@/features/sidebar/components/SidebarProfileMobile";
import SidebarDashboard from "@/features/sidebar/components/SidebarDashboard";
import SidebarAppMobile from "@/features/sidebar/components/SidebarAppMobile"
import SidebarDashboardMobile from "@/features/sidebar/components/SidebarDashboardMobile"
import { useEffect, useMemo } from "react";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";

// Nota esta version de sidebar, admite modos almenos en version Mobile.
// eslint-disable-next-line no-empty-pattern
function SmartSidebarApp({}) {

  const { isAdmin, isAuth } = useAuthContext()

/*  useEffect(() => {

    // Sidebar Dashboard PC
    
    if (isAdmin) {
      if (document.querySelector("body")) {
        document.querySelector("body")
          .classList.add("active-bar");
      }
    } else {
      if (document.querySelector("body")) {
        document.querySelector("body")
          .classList.remove("active-bar");
      }
    }
  }, [isAdmin, isAuth])*/

  const active = useMemo(()=>{
    const body = document.querySelector("body")
    if(!body) return;
    return isAdmin && [...body.classList].includes("active-bar") 
  },[isAdmin])



  return (
    <>
      {/* -- Sidebar PC --*/}
        <>
          <div id="dashbar" style={{ zIndex: "1050", width: "80px", paddingTop: "50px" }} 
            className='fixed-top d-none d-md-block h-100 bg-light p-2 border-end'>
            <SidebarDashboard />
          </div>
        </>

      {/* -- Sidebar Mobile --*/}      
      {(
        <div style={{ zIndex: "1", height: "75px", overflowX: "auto", overflowY: "hidden", paddingTop: "0px" }}
          className='fixed-bottom d-block d-md-none w-100 bg-light p-2 border-top'>
          <SidebarAppMobile />
        </div>
      )}
    </>
  );
}

export default SmartSidebarApp;
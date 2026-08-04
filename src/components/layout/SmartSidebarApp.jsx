import SidebarProfileMobile from "@/features/sidebar/components/SidebarProfileMobile";
import SidebarDashboard from "@/features/sidebar/components/SidebarDashboard";
import SidebarAppMobile from "@/features/sidebar/components/SidebarAppMobile"
import SidebarDashboardMobile from "@/features/sidebar/components/SidebarDashboardMobile"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";

// Nota esta version de sidebar, admite modos almenos en version Mobile.
// eslint-disable-next-line no-empty-pattern
function SmartSidebarApp({}) {

  const location = useLocation();
  const [sidebarMode, setSidebarMode] = useState(null);

  const { isAdmin, isAuth } = useAuthContext()

  useEffect(() => {
    // Sidebar Mobile modes

    if (['/user', '/dashboard'].includes(location.pathname) && isAuth) {
      setSidebarMode(location.pathname)
    } else{
      setSidebarMode(null)
    }

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
  }, [location.pathname, isAdmin, isAuth])


  const handleToggle = (t) => {
    setSidebarMode(t) 
  }



  return (
    <>
      {/* -- Sidebar PC --*/}
      {isAdmin && (

        <>
          <div id="dashbar" style={{ zIndex: "1050", width: "80px", paddingTop: "0px" }} 
            className='fixed-top d-none d-md-block h-100 bg-light p-2 pt-4 border-end'>
            <SidebarDashboard />
          </div>
        </>
      )}

      {/* -- Sidebar Mobile --*/}      
      {(!sidebarMode || (sidebarMode && !isAuth)) && (
        <div style={{ zIndex: "1050", height: "75px", overflowX: "auto", overflowY: "hidden", paddingTop: "0px" }}
          className='fixed-bottom d-block d-md-none w-100 bg-light p-2 border-top'>
          <SidebarAppMobile toggle={handleToggle} />
        </div>
      )}
      {sidebarMode == "/dashboard" && isAdmin && (
        <div style={{ zIndex: "1050", height: "75px", overflowX: "auto", overflowY: "hidden", paddingTop: "0px" }}
          className='fixed-bottom d-block d-md-none w-100 bg-light p-2 border-top'>
          <SidebarDashboardMobile toggle={handleToggle} />
        </div>
      )}
      {sidebarMode == "/user" && isAuth && (
        <div style={{ zIndex: "1050", height: "75px", overflowX: "auto", overflowY: "hidden", paddingTop: "0px" }}
          className='fixed-bottom d-block d-md-none w-100 bg-light p-2 border-top'>
          <SidebarProfileMobile  toggle={handleToggle} />
        </div>
      )}
    </>
  );
}

export default SmartSidebarApp;
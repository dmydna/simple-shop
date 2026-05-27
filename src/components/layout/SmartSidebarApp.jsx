import SidebarProfileMobile from "@/features/sidebar/components/SidebarProfileMobile";
import SidebarDashboard from "@/features/sidebar/components/SidebarDashboard";
import SidebarAppMobile from "@/features/sidebar/components/SidebarAppMobile"
import SidebarDashboardMobile from "@/features/sidebar/components/SidebarDashboardMobile"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAdminUI } from "@/hooks/useAdminUI";

// Nota esta version de sidebar, admite modos almenos en version Mobile.
// eslint-disable-next-line no-empty-pattern
function SmartSidebarApp({ }) {

  const location = useLocation();
  const [sidebarMode, setSidebarMode] = useState(null);
  const { appMode } = useAdminUI()



  useEffect(()=>{
      if( ['/user', '/dashboard'].includes(location.pathname) ){
          setSidebarMode(location.pathname)
      }
  },[location.pathname])
  


  const handleToggle = (t) => {
    setSidebarMode(t) 
  }
  return (
    <>
      {appMode == "admin" && (
        <>
          <div id="dashbar" style={{ zIndex: "1050", width: "80px", paddingTop: "0px" }} 
             className='fixed-top d-none d-md-block h-100 bg-light p-2 pt-4 border-end'>
            <SidebarDashboard  />
          </div>
        </>
      )}
      {!sidebarMode && (
          <div style={{ zIndex: "1050", height: "75px", overflowX: "auto", overflowY: "hidden", paddingTop: "0px" }}
            className='fixed-bottom d-block d-md-none w-100 bg-light p-2 border-top'>
            <SidebarAppMobile toggle={handleToggle} />
          </div>
      )}
      {sidebarMode == "/dashboard" && (
          <div style={{ zIndex: "1050", height: "75px", overflowX: "auto", overflowY: "hidden", paddingTop: "0px" }}
            className='fixed-bottom d-block d-md-none w-100 bg-light p-2 border-top'>
            <SidebarDashboardMobile toggle={handleToggle} />
          </div>
      )}
      {sidebarMode == "/user" && (
          <div style={{ zIndex: "1050", height: "75px", overflowX: "auto", overflowY: "hidden", paddingTop: "0px" }}
            className='fixed-bottom d-block d-md-none w-100 bg-light p-2 border-top'>
            <SidebarProfileMobile toggle={handleToggle} />
          </div>
      )}
    </>
  );
}

export default SmartSidebarApp;
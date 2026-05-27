import { useUIContext } from "@/contexts/UIContext";
import SidebarAppMobile from "@/features/sidebar/components/SidebarAppMobile";
import SidebarDashboard from "@/features/sidebar/components/SidebarDashboard";
import SidebarDashboardMobile from "@/features/sidebar/components/SidebarDashboardMobile";



// TODO: renombrar a SidebarApp
function SiderbarAdmin() {

  const { appMode } = useUIContext()

  return (
    <>
      {appMode == "admin" && (
        <>
          <div id="dashbar" 
            style={{ zIndex: "1050", width: "80px", paddingTop: "0px" }} 
            className='fixed-top d-none d-md-block h-100 bg-white p-2 pt-4 border-end'>
            <SidebarDashboard/>
          </div>
          <div 
            style={{ zIndex: "1050", height: "75px", overflowX: "auto", overflowY: "hidden", paddingTop: "0px" }}
            className='fixed-bottom d-block d-md-none w-100 bg-white p-2 border-top'>
            <SidebarDashboardMobile/>
          </div>

        </>
      )}
      {appMode != "admin" && (
          <div 
            style={{ zIndex: "1050", height: "75px", overflowX: "auto", overflowY: "hidden", paddingTop: "0px" }}
            className='fixed-bottom d-block d-md-none w-100 bg-white p-2 border-top'>
            <SidebarAppMobile/>
          </div>
      )}
    </>
  );
}

export default SiderbarAdmin;

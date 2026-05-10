import { useUIContext } from "@/contexts/UIContext";
import SideBarDashboardSlim from "../common/SiderBarDashboardSlim";

function SiderbarAdmin({ expandable = false }) {

  const { appMode, setAppMode, showSidebar, setShowsider } = useUIContext()

  return (
    <>
      {appMode == "admin" && (
        <>

          <div id="dashbar" style={{ zIndex: "1050", width:  "80px", paddingTop: "0px" }} className='fixed-top d-block h-100 bg-white p-2 pt-4 border-end'>


              <SideBarDashboardSlim expandable={false} onShow={setShowsider} />
            
          </div>
        </>
      )}
    </>
  );
}

export default SiderbarAdmin;

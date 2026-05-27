import { useUIContext } from "@/contexts/UIContext";
import SidebarDashboard from "@/features/sidebar/components/SidebarDashboard";
import Logo from "@common/Logo.jsx";

export default function SiderbarExpandable({  }) {

  const { appMode, setAppMode, showSidebar, setShowsider } = useUIContext()

  return (
    <>
      {appMode == "admin" && (
        <>

          <div style={{ zIndex: "1050", width: `${showSidebar ? "220px" : "80px"}`, paddingTop: "0px" }} className='fixed-top d-block h-100 bg-white p-2 pt-4 border-end'>


            {showSidebar && (
              <>
                <div className="mb-3">
                  <i onClick={() => setShowsider(false)} className="pointer bi bi-list mx-3 fs-4"></i>
                  <Logo />
                </div>
                <SidebarDashboard showHearder={false} />
              </>

            )}

            {!showSidebar && (
              <SidebarDashboard onShow={setShowsider} />
            )}



          </div>
        </>
      )}
    </>
  );
}


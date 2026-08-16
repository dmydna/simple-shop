import SiderbarLink from "@f/sidebar/components/SidebarLink";

export default function SidebarDashboardMobile({ toggle }) {

    const BASE_URL ='/dashboard'
  
    return (
        <ul style={{width: "500px"}} className="mx-3 mx-sm-auto list-group list-group-flush flex-row justify-content-between">


            <SiderbarLink
                className='px-4 border-end position-sticky'
                style={{zIndex: '100',left: '-8px', bottom: 0}}
                to={`/dashboard`}
                icon="bi-list-nested"
                label="dashboard"
            />


            <SiderbarLink
                to={`${BASE_URL}/listing-list`}
                icon="bi-sticky"
                label="listing list"
            />
 

            <SiderbarLink
                to={`${BASE_URL}/product-list`}
                icon="bi-box-seam"
                label="product list"
            />

            <SiderbarLink
                to={`${BASE_URL}/user-list`}
                icon="bi-person"
                label="user list"
            />


            <SiderbarLink
                to={`${BASE_URL}/dev`}
                icon="bi-terminal"
                label="demo"
            />


            <SiderbarLink
                className='border-start position-sticky'
                style={{zIndex: '100', right: '-9px', bottom: 0}}
                onclick={() => toggle(null)}
                icon="bi-three-dots-vertical mt-2"
            />

        </ul>

    )
}

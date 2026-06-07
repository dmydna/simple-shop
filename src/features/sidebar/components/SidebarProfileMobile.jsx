import SiderbarLink from "./SidebarLink";
import CartButton from "@features/cart/components/CartButton.jsx";


export default function SidebarProfileMobile({  toggle }) {

    const BASE_URL ='/user'


    return (
        <ul style={{width: "500px"}} className="mx-3 mx-sm-auto list-group list-group-flush flex-row justify-content-between">


            <SiderbarLink
                className='px-4 border-end position-sticky'
                style={{zIndex: '100',left: '-8px', bottom: 0}}
                to={BASE_URL}
                icon="bi-person-fill"
                label="user"
            />


            <SiderbarLink
                to={`${BASE_URL}/account`}
                icon="bi-person"
                label="account"
            />
            
             <SiderbarLink
                to={`${BASE_URL}/profile`}
                icon="bi-person-lines-fill"
                label="profile"
            />


            <SiderbarLink
                to={`${BASE_URL}/purchases`}
                icon="bi-handbag"
                label="purchases"
            />

            <SiderbarLink
                to={`${BASE_URL}/reviews`}
                icon="bi-star"
                label="review"
            />


            <SiderbarLink
                to={`${BASE_URL}/favorites`}
                icon="bi-heart"
                label="favorites"
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

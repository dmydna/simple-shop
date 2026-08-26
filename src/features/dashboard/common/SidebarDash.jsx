
import ButtonLink from "@/components/common/ButtonLink";
import { URL_DEV, URL_LISTING_LIST, URL_PRODUCT_LIST, URL_USER_LIST } from "@/utils/links";
import { useNavigate } from "react-router-dom";

export default function SidebarDash({ role, border = false, className }) {

    const navigate = useNavigate()



    return (
        <div className={className}>
            <ul className="list-group list-group-flush ">

                <ButtonLink
                    handle={() => navigate(URL_LISTING_LIST)}
                    icon="bi-sticky"
                    visible={true}
                >
                    Listings
                </ButtonLink>


                <ButtonLink
                    handle={() => navigate(URL_PRODUCT_LIST)}
                    icon="bi-box-seam"
                    visible={true}
                >
                    Products
                </ButtonLink> 



                <ButtonLink
                    handle={() => navigate(URL_USER_LIST)}
                    icon="bi-person"
                    visible={true}
                >
                    Users
                </ButtonLink> 
                
              
                <ButtonLink
                    handle={() => navigate("#")}
                    icon="bi-cart3"
                    visible={true}
                >
                    Orders
                </ButtonLink>                  

                <ButtonLink
                    handle={() => navigate(URL_DEV)}
                    icon="bi-terminal"
                    visible={true}
                >
                    Demo
                </ButtonLink> 

            </ul>
        </div>

    )
}

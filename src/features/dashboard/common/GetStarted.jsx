import { useNavigate } from "react-router-dom";
import ButtonLink from "../../../components/common/ButtonLink";
import { URL_FAQs, URL_LISTING_CRUD } from "@/utils/links";

export default function GetStarted(){

    const navigate = useNavigate()


    return(
        <>
        <h5 className="fw-medium mb-4">Get Started</h5>


                    <ButtonLink
                        icon="bi-plus-lg"
                        handle={() => navigate(`${URL_LISTING_CRUD}?mode=create}`)}
                    >
                        Add post
                    </ButtonLink>

                    <ButtonLink
                        icon="bi-chat"
                        handle={() => navigate(URL_FAQs)}
                    >
                        Look notifications
                    </ButtonLink>

                    <ButtonLink
                        icon="bi-bag"
                        handle={() => navigate(URL_FAQs)}
                    >
                       Admin purchases
                    </ButtonLink>

                    <ButtonLink
                        icon="bi-question-circle"
                        handle={() => navigate(URL_FAQs)}
                    >
                       Admin purchases
                    </ButtonLink>
        </>
    )
} 
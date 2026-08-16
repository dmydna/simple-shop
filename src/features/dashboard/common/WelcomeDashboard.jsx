import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonLink from "@dashboard/common/ButtonLink"

function WelcomeDashboard() {

    const navigate = useNavigate()

    return (
        <div className="border island p-4 mb-3 mx-0 mx-md-2">
            <div className="">
                <p className="fw-medium fs-5 mb-0">Welcome to Dashboard</p>
                    <p className="text-secondary small">We ve' assambled some links to get started</p>
            </div>
            <div className="d-flex flex-column justify-content-between gap-2 flex-wrap">
                <div className="my-3">
                    <p className="fw-medium">Get Started</p>


                    <ButtonLink
                        icon="bi-plus-lg"
                        handle={() => navigate('/dashboard/listing-form?mode=create')}
                    >
                        Add post
                    </ButtonLink>

                    <ButtonLink
                        icon="bi-chat"
                        handle={() => navigate('/faqs')}
                    >
                        Look notifications
                    </ButtonLink>

                    <ButtonLink
                        icon="bi-bag"
                        handle={() => navigate('/faqs')}
                    >
                       Admin purchases
                    </ButtonLink>

                    <ButtonLink
                        icon="bi-question-circle"
                        handle={() => navigate('/faqs')}
                    >
                       Admin purchases
                    </ButtonLink>


                </div>
            </div>

        </div>
    )
}

export default WelcomeDashboard;
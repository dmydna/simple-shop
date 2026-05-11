import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


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
                    <p  onClick={() => navigate('/dashboard/listing-form?mode=create')}
                        className="btn bg-light border py-2 mb-3 text-start w-100 d-flex justify-content-between">
                        <div className="small">
                            <i className="bi-plus-lg me-3"></i>
                            <span>Add post</span>
                        </div>
                    </p>
                    <p onClick={() => navigate('/faqs')}
                        className="btn disabled bg-light border py-2 mb-3 text-start w-100 d-flex justify-content-between">
                        <div className="small">
                            <i className="bi-chat me-3"></i>
                            <span>Look notifications</span>
                        </div>
                    </p>
                    <p onClick={() => navigate('/faqs')}
                        className="btn disabled bg-light border py-2 mb-3 text-start w-100 d-flex justify-content-between">
                        <div className="small">
                            <i className="bi-bag me-3"></i>
                            <span>Admin purchases</span>
                        </div>
                    </p>
                    <p onClick={() => navigate('/faqs')}
                        className="btn bg-light border py-2 mb-3 text-start w-100 d-flex justify-content-between">
                        <div className="small">
                            <i className="bi-question-circle me-3"></i>
                            <span>Help</span>
                        </div>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default WelcomeDashboard;
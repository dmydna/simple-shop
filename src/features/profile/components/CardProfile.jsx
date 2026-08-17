import { placeholder } from "@utils/image.js";
import { useProfile } from "@features/profile/contexts/ProfileContext.jsx";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import userDefaultXL from "/user-default-xl.png"
import ImgAction from "@/components/common/ImgAction";
import { useNavigate } from "react-router-dom";
import OffCanvasButton from "@/components/common/OffCanvasButton";

function CardProfile({ name, image, children, className, imgSize }) {

    const { profile, fetchData } = useProfile()
    const navigate = useNavigate()

    const baseImg = {
        dimension: "150x150",
        icon:"bi-person-fill",
        background: ".celeste",
        fontSize: "70",
        textColor: "fff"
    }

    return (
        <Card  className={`mb-2 island border text-start flex-row`}>
            
            <OffCanvasButton className={"d-block d-md-none"} />

            <div className="d-block mx-auto position-relative">
                <ImgAction
                    action={() => navigate('/user/photo')}
                    icon={'bi-pencil'} 
                    className="perfil-img rounded-circle" 
                    src={profile?.image || userDefaultXL}
                          style={{
                              objectFit: 'cover',
                              height: imgSize || '120px',
                              width: imgSize || '120px',
                              padding: "1rem",
                              marginInline: "auto",
                          }} 
                />
            </div>


            <Card.Body className="rounded mt-2 ps-1 overflow-hidden me-3">
                <Card.Title className='fs-6 mb-0'>
                    { profile?.username || "" }
                </Card.Title>
                <Card.Text className="mb-0">
                <span style={{whiteSpace: 'nowrap', maxWidth:'100%'}} 
                    className="text-secondary mb-0 small d-inline-block text-truncate">
                    { profile?.email || 'your.email@mail.com' }
                </span>
                </Card.Text>
                <p className="small pill-success d-inline-block mb-0" 
                   style={{fontSize: '0.7rem', borderRadius: '5px', paddingInline: '5px', paddingTop: '2px', lineHeight: '11px'}}>
                    {  profile?.role  == 'CLIENT'? 'user' : 'admin' }
                </p>
            </Card.Body>
        </Card>
    )
}

export default CardProfile;

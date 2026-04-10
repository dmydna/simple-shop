import { ImgGenApi } from "@/dev/utils.js";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useProfile } from "../contexts/ProfileContext.jsx";

function CardProfile({ name, image, children, className, imgSize }) {

    const { profile, fetchData } = useProfile()

    useEffect( ()=> {
        fetchData()
    },[])

    const baseImg = {
        dimension: "150x150",
        icon:"bi-person-fill",
        background: ".celeste",
        fontSize: "70",
        textColor: "fff"
    }

    return (
        <Card  className={`mb-4 island border text-start flex-row`}>
            <div className="d-block mx-auto position-relative">
                <Card.Img className="perfil-img" src={profile?.image || ImgGenApi({...baseImg})}
                          style={{
                              objectFit: 'cover',
                              height: imgSize || '135px',
                              width: imgSize || '135px',
                              padding: "1rem",
                              borderRadius: "30%",
                              marginInline: "auto",
                          }}
                />
            </div>


            <Card.Body className="rounded mt-3">
                <Card.Title className='fs-5 mb-0'>
                    { profile?.name || profile?.username || profile?.clientName || "N/A" }
                </Card.Title>
                <Card.Text className="mb-0">
                <span className="text-secondary fs-6 mb-0">
                    {  profile?.role == 'ADMIN' ? 'admin@mail.com' : (profile?.email || '') }
                </span>
                </Card.Text>
                <Card.Text >
                <span style={{width:'50px', height:'50px' }} className="rounded-circle bg-primary"></span>
                <span className="text-secondary fs-6 role-pill">
                    {  profile?.role  == 'CLIENT'? 'user' : 'admin' }
                </span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardProfile;

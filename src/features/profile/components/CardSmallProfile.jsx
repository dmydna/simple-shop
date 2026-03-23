import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useProfile } from "../hooks/ProfileContext.jsx";

function CardSmallProfile({ name, image, children, className, imgSize }) {

    const { profile, fetchData } = useProfile()

    useEffect( ()=> {
        fetchData()
    },[])

    return (
        <Card  className={`mb-4 island border text-start flex-row`}>
            <div className="d-block mx-auto position-relative">
                <Card.Img className="perfil-img" src={profile?.image || "https://dummyimage.com/300x300/dadada/"}
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


            <Card.Body style={{lineHeight: '1px'}} className="rounded mt-3">
                <Card.Title className='fs-5'>
                    { profile?.name || profile?.username || profile?.clientName || "N/A" }
                </Card.Title>
                <Card.Text>
                <span className="text-secondary fs-6">
                    {  profile?.email || 'admin@mail.com' }
                </span>
                </Card.Text>
                <Card.Text >
                <span className="text-secondary fs-6">
                    {  profile?.role }
                </span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardSmallProfile;

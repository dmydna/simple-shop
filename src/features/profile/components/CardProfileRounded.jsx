import { Card } from "react-bootstrap";
import { placeholder } from "@utils/image.js";
import { useUser } from "../hooks/ProfileContext.jsx";

function CardProfileRounded({ name, image, children, className, imgSize }) {

  const { profile } = useUser()

  return (
    <Card  className={`mb-4 island border text-center`}>
      <div className="d-block mx-auto position-relative">
        <Card.Img className="perfil-img" src={profile?.image || placeholder("300x300", "limon", "bi-person", "000")}
          style={{
            objectFit: 'cover',
            height: imgSize || '215px',
            width: imgSize || '215px',
            padding: "1rem",
            borderRadius: "100%",
            marginInline: "auto",
          }}
        />
        <div style={{top: '150px', left:'140', position: "absolute"}}  className="edit-pic-button bg-white rounded-circle border">
          <i className="bi bi-download"></i>
        </div>
      </div>


      <Card.Body className="rounded">
        <Card.Title className='fs-3'>
          {name || "N/A"}
        </Card.Title>
        <Card.Text className="mb-3">
          <span className="text-secondary fs-6">
             {  profile?.email || 'user@mail.com' }
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardProfileRounded;

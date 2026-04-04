import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import warningIMG from "/src/assets/404.png"
import Img1 from "/src/assets/web_404_crop.png"

function NotFound(){

    return (
    <Container style={{height: "80vh"}} 
      className="py-5 mt-5 d-flex justify-content-center align-items-center overflow-overlay">
      <div>
        <img style={{
          marginInline: "auto",
          maxWidth: "300px",
          display: "block", 
          position: "relative",
          rotate: "395deg"
        }} 
          src={Img1} />
        <div className="d-flex align-items-center gap-3">
          <h4 className="fw-bold  text-uppercase text-center m-0 mt-4 page404">
            404
          </h4>
          <div className="fw-bolder m-0 text-uppercase fs-4 pageNotFoundMsg">
            <p className="m-0 p-0">Page</p>
            <p className="m-0 p-0">Not</p>  
            <p className="m-0 p-0">Found</p>
          </div>
        </div>

        <Button style={{maxWidth:"300px"}} as={Link} to={'/productos'}  
        className="col w-100 col-md-2 p-2 d-block mx-auto my-2" variant="outline-primary">
        <i className="bi bi-chevron-left"></i>
        <b className="mx-2 fw-bold">
          Back to Homepage
        </b></Button>
      </div>
   </Container>
        
    )
}


export default NotFound()
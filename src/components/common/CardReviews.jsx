import React from "react";
import { Card } from "react-bootstrap";

function CardReview({id, comment, rating, date}){


    return(
        <Card key={id} className="my-2 overflow-hidden">
        <div className="d-flex" md={4}>
          <Card.Img  src="/user.png"
                style={{scale: "0.8",
                  height: "66px",
                  width: "66px",
                  margin: "10px"}}
          />
          <Card.Body>
            <img src={`/rating${rating}.png`}/>
            <Card.Text className="text-truncate">{comment}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    )
}

export default CardReview
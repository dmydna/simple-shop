import StarRating from "@common/StarRating.jsx";
import React from "react";
import { Card } from "react-bootstrap";

function CardReview({id, comment, rating, date, userPic}){

    return(
        <Card key={id} className="my-2 overflow-hidden border-0">
        <div className="d-flex cardReview" md={4}>
          <Card.Img className="border rounded-circle"  src={userPic || "/userPic.png"}
                style={{scale: "0.8",
                  height: "66px",
                  width: "66px",
                  margin: "10px"}}
          />
          <Card.Body>
            <StarRating value={rating} size={17}/>
            <Card.Text className="small text-truncate">{comment}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    )
}

export default CardReview
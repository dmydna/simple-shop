import StarRating from "@common/StarRating.jsx";
import React from "react";
import { Card } from "react-bootstrap";
import userDefault from "/user-default-xs.png"

function CardReview({id, comment, rating, date, userPic}){

    return(
        <Card key={id} className="my-2 overflow-hidden border-0">
        <div className="d-flex align-items-center cardReview" md={4}>
          <Card.Img className="border rounded-circle"  src={userPic || userDefault}
                style={{
                  height: "45px",
                  width: "45px",
                  margin: "10px"}}
          />
          <Card.Body>
            <StarRating value={rating} size={16}/>
            <Card.Text className="small text-truncate mb-0">{comment}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    )
}

export default CardReview
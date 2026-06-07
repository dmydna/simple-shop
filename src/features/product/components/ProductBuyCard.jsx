import StarRating from "@/components/common/StarRating.jsx";
import { useState } from "react";
import { Card, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BuyNowButton from "../../../components/common/BuyNowButton.jsx";
import AddToCartButton from "../../cart/components/AddToCartButton.jsx";
import { useCart } from "../../cart/contexts/CartContext.jsx";


function ProductBuyCard({ className, ...item }) {

  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/cart/buy");
    addToCart( {...item} )
  }

  return (
    <Card className={`${className}`}>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <StarRating value={item.rating} size={17}/>
        <Card.Text className="h3">$ {item.price?.toFixed(2)}
          <span className="mx-2 text-success fw-medium fs-6">
            {item?.discountPercentage ? item.discountPercentage + '% OFF' : ''}
          </span> 
        </Card.Text>
        <Card.Text className="text-secondary">stock: {item.stock || "N/A"}</Card.Text>
        <Card.Text className="text-secondary mb-3">
          <i className="bi bi-truck"></i> {item.shippingInformation || 'N/A'}
        </Card.Text>
      </Card.Body>
      <InputGroup className="w-100 align-items-center gap">
        <BuyNowButton
          className='m-2'
          variante='primary'
          handle={handleClick} 
        />
        <AddToCartButton  product={item} />
      </InputGroup>
    </Card>
  );
}


export default ProductBuyCard;

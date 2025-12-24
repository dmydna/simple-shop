import React, { useState } from "react";
import { Card, InputGroup } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import ProductBuyModal from "./ProductBuyModal";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";

function ProductBuyCard({ title, rating, ship, id, stock, price, discount }) {

  const { cartItems, addToCart} = useCart()
  const { products } = useProducts()
  const [modalShow, setModalShow] = useState(false);
  const {clearCart} = useCart()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/carrito/buy");
    addToCart( products.find(p => p.id == id) )
  }

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <img className="mb-2" src={`/rating${Math.round(rating || 1)}.png`} />
        <Card.Text className="h3">$ {price.toFixed(2)} 
          <span className="mx-2 text-success fw-medium fs-6">
            {discount ? discount + '% OFF' : ''}
          </span> 
        </Card.Text>
        <Card.Text className="text-secondary">stock: {stock || "N/A"}</Card.Text>
        <Card.Text className="text-secondary mb-3">
          <i class="bi bi-truck"></i> {ship || 'N/A'}
        </Card.Text>
      </Card.Body>
      <InputGroup className="w-100 align-items-center gap">
        <BuyNowButton
          className='m-2'
          variante='primary'
          handle={handleClick} 
        />
        <AddToCartButton id={id} />
        <ProductBuyModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
        />
      </InputGroup>
    </Card>
  );
}


export default ProductBuyCard;

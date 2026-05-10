import StarRating from "@/components/common/StarRating.jsx";
import { useState } from "react";
import { Card, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BuyNowButton from "../../../components/common/BuyNowButton.jsx";
import AddToCartButton from "../../cart/components/AddToCartButton.jsx";
import { useCart } from "../../cart/contexts/CartContext.jsx";
import { useListingContext } from "../../listing/contexts/ListingContext.jsx";
import ProductBuyModal from "./ProductBuyModal.jsx";

function ProductBuyCard({ title, rating, ship, id, stock, price, discount, className }) {

  const { cartItems, addToCart, clearCart} = useCart()
  const { products } = useListingContext()
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/cart/buy");
    addToCart( products.find(p => p.id == id) )
  }

  return (
    <Card className={`${className}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <StarRating value={rating} size={17}/>
        <Card.Text className="h3">$ {price?.toFixed(2)}
          <span className="mx-2 text-success fw-medium fs-6">
            {discount ? discount + '% OFF' : ''}
          </span> 
        </Card.Text>
        <Card.Text className="text-secondary">stock: {stock || "N/A"}</Card.Text>
        <Card.Text className="text-secondary mb-3">
          <i className="bi bi-truck"></i> {ship || 'N/A'}
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

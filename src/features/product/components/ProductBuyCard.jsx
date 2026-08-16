import StarRating from "@/components/common/StarRating.jsx";
import { Card, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BuyNowButton from "@common/BuyNowButton.jsx";
import AddToCartButton from "@f/cart/components/AddToCartButton.jsx";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import AdminFloatButton from "@f/product/components/AdminFloatButton.jsx";
import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";


function ProductBuyCard({ className, ...item }) {

  const { addToCart } = useCart()
  const navigate = useNavigate()
  const {isAdmin} = useAuthContext();

  const handleClick = () => {
    navigate("/cart/buy");
    addToCart( {...item} )
  }

  return (
    <Card className={`${className}`}>
      <Card.Body>
        <div className="d-flex justify-content-between w-100">
          <Card.Title>
            {item.title}
          </Card.Title>
          <AdminFloatButton style={{height: '38px', margin: '-7px -10px 10px 10px'}} item={item}/> 
        </div>
        <StarRating value={item.rating} size={17}/>
        <Card.Text className="h3 mb-3">$ {item.price?.toFixed(2) || '...'}
          <span className="mx-2 text-success fw-medium fs-6">
            {item?.discountPercentage ? item.discountPercentage + '% OFF' : ''}
          </span> 
        </Card.Text>
        {(isAdmin && <p className="small text-secondary"><b>Stock </b>  { item.stock }</p>)}
        {(!isAdmin && 
          <p className="small text-secondary text-lowercase">
              <b>Availability </b>  { item.availabilityStatus }
          </p>)}
        <Card.Text className="small text-primary fw-medium mb-3">
          <i className="bi bi-truck"></i> {item.shippingInformation || '...'}
        </Card.Text>
      </Card.Body>
      <InputGroup className="w-100 align-items-center gap">
        {item?.meta?.status === "ACTIVE" && (
          <>
            <BuyNowButton
              className='m-2'
              variante='primary'
              handle={handleClick} 
            />
            <AddToCartButton  product={item} /> 
          </>
        )}
        {item?.meta?.status === "INACTIVE" && 
            <div class="fade alert alert-primary show w-100">
              <i class="bi bi-info-circle me-2"></i>
              Publicacion <b>Pausada</b>
            </div>
        }
        {item?.meta?.status === "DRAFT" && 
            <div class="fade alert alert-primary show w-100">
              <i class="bi bi-info-circle me-2"></i>
              Publicacion <b>Borrador</b>
            </div>
        }
        {item?.meta?.status === "DELETED" && 
            <div class="fade alert alert-danger show w-100">
              <i class="bi bi-info-circle me-2"></i>
              Publicacion <b>Eliminada</b>
            </div>
        }
      </InputGroup>
    </Card>
  );
}


export default ProductBuyCard;

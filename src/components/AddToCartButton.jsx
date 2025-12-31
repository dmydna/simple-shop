import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
import { useListings } from "../contexts/ListingContext";



function AddToCartButton({id, variant='success', children}){

    const { cartItems, addToCart} = useCart()

    const {products} = useListings()

    const [product] = useMemo(()=>{
      return products.filter((p)=> {
        return p.id == id
      })
    },[products]) 

    const handleAddToCart = () => {
      if (toast.isActive()) {
        return;
      }
      toast.success("Producto agregado al carrito!");
    };

    return (
      <>
       <Button
          onClick={ () => { product && addToCart(product); handleAddToCart(); } }
          className="m-2 flex-fill rounded text-truncate"
          variant={variant}
          type="submit"
          style={{cursor: "pointer"}}
        > 
          {cartItems.map((item)=> 
            item.id === product.id && item.cantidad != 0 ?
            <div className="position-relative d-inline-block me-3">
            <span className={`rounded-circle badge bg-white text-success
              px-${item.cantidad < 10 ? 2 : 1}`}
            >
              {item.cantidad}
            </span> 
            </div> : '' 
          )}
        {children ? children : 'Agregar al Carrito' }
       </Button>
      </>
    )
}

export default AddToCartButton;
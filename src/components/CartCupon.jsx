import React, { Children, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";

function CartCupon({title, check, onCheck}){

    const [query, setQuery] = useState(""); 
    const [placehoder, setPlacehoder] = useState("Ingresa cupon..")
    const [error, setError] = useState(false)
    const {couponDiscount, setCouponDiscount} = useCart()

  
    
    function handleChange(e) {
      const value = e.target.value;
      setQuery(value.toUpperCase());
    }
  
    function handleSubmit(e){
      e.preventDefault();
      if(query === '#MISHA123' && !check){
        toast.success("Cupon aplicado!");
        setPlacehoder("Ingresa cupon...")
        setQuery("")
        onCheck(true)
        setError(false)
        setCouponDiscount(true)
      }else{
        setError(true)
        setPlacehoder("Cupon invalido...")
        setQuery("")
      }
    }
  


    return(
        <Card className="m-2 p-4" >
        <Card.Text className="h5 py-3 fw-bold text-secondary">
            {title}
        </Card.Text>
        <Form onSubmit={handleSubmit} className={(error ? 'form-error': '')}>
        <InputGroup className="align-items-center">
        <input
           placeholder={placehoder}
           type="text"
           className={`form-control no-focus text-secondary`}
           value={query.toUpperCase()}
           spellcheck="false"
           onChange={handleChange}
        ></input>
          <Button
            onClick={(e)=> handleSubmit(e)}
            variant="danger"
          >Ingresar
          </Button>
         </InputGroup>
        </Form>
        <ToastContainer />
      </Card>
    )
}

export default CartCupon;

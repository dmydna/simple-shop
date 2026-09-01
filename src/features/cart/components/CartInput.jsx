import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useCart } from "@f/cart/contexts/CartContext.jsx";

function CartInput({ producto, className, style }) {


  const { removeFromCart,
      decreaseCartItem, 
      increaseCartItem,
      setCantidadCartItem
  } = useCart();

  const [cantidad, setCantidad] = useState(!producto.cantidad ? 0 : producto.cantidad)


  const incCart = (producto)=>{
    setCantidad((prev)=> 
      prev >= 0 && prev <= producto.stock ? 
    (!producto.cantidad ? prev : producto.cantidad) + 1 : 0)
    if(producto.cantidad){
      increaseCartItem(producto);
    } 
  }

  const decCart = (producto)=>{
    setCantidad((prev)=> prev > 0 && prev <= producto.stock ?  
    (!producto.cantidad ? prev : producto.cantidad)  - 1 : 0 )
    if(producto.cantidad){
      decreaseCartItem(producto);
    }

  }

  const elimItem = (producto) => {
    setCantidad(0)
    if(producto.cantidad || producto.cantidad == 0){
      removeFromCart(producto)
    }
  }



  const handleChange = (e) => {
     // actCart(producto,e);
     const inputValue = e.target.value;
     const val = parseInt(inputValue );

    if (inputValue === "") {
      setCantidad(1); 
      setCantidadCartItem(producto, 1)
      return
    }

    if(val > producto.stock){
      setCantidad(producto.stock); 
      setCantidadCartItem(producto, producto.stock)
      return
    }

     setCantidad(val);
     setCantidadCartItem(producto, val)
  }


  return (
    <div style={style} className="d-flex gap-2">

      {/* Boton eliminar */}
      <Button
        className="btn btn-sm shadow-sm border rounded overflow-hidden pagination-input-group"
        onClick={() => elimItem(producto)}
        variant="outline-dark"
      ><i className="bi bi-trash3 smal pe-1"></i>
      </Button>

      <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">

        {/* Boton + */}
        <Button
          className="btn p-1 border-0 ps-3 btn-sm"
          onClick={() =>  decCart(producto) }
          variant
        ><i className="bi bi-dash-lg"></i>
        </Button>

        {/* InputCart */}
        <Form.Control
          type="text"
          value={cantidad}
          onChange={(e) => handleChange(e)}
          // onInput={e => handleChange(e)}
          className="text-center border-0 fw-bold no-arrows"
          style={{ width: "30px", fontSize: "0.9rem", boxShadow: 'none' }}
        ></Form.Control>

        {/* Boton - */}
        <Button
          className="btn p-1 border-0 pe-3 btn-sm"
          onClick={() => incCart(producto)}
          variant
        ><i className="bi bi-plus-lg"></i>
        </Button>
      </InputGroup>

    </div>
    
  );
}

export default CartInput;

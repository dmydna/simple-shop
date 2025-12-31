import { createContext, useContext, useEffect, useState } from "react";
import { useProducts } from "./ProductContext";

const CartContext = createContext();


export function CarritoProvider({ children }) {


  const {products, setProducts} = useProducts()
  const [couponDiscount, setCouponDiscount] = useState(false)

  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
 
  const clearCart = () => {
    setCartItems([])
    setTotalPrice(0)
    setCartCount(0)
  }



  const  removeFromCart = (productoCarrito) => {

    setCartCount((prevContador) => 
      prevContador - productoCarrito.cantidad)
    setTotalPrice((prevTotal) => 
      prevTotal - (productoCarrito.price * productoCarrito.cantidad))

    setProducts((prevProducts) => // retorno implicito de un array 
      prevProducts.map((item) => 
        item.id === productoCarrito.id
        ? { ...item, stock: item.stock + productoCarrito.cantidad } 
        : item 
      )
    );

    setCartItems((prevProductos) =>
      prevProductos.filter((item) =>
        item.id !== productoCarrito.id 
    ))

  }


  const setCantidadCartItem = (productoCarrito, value) => {
    // 1. Validar que el valor sea un número válido
    const nuevaCantidad = parseInt(value);
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) return;
  
    const totalDisponible = productoCarrito.stock + productoCarrito.cantidad;
    
    // Si el usuario pide más de lo que existe en total, limitamos al máximo
    const cantidadFinal = nuevaCantidad > totalDisponible ? totalDisponible : nuevaCantidad;
    const nuevoStockRestante = totalDisponible - cantidadFinal;
  
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productoCarrito.id 
          ? { ...item, cantidad: cantidadFinal } 
          : item
      )
    );
    const diferencia = cantidadFinal - productoCarrito.cantidad;

    // Actualizamos el contador global sumando la diferencia
    setCartCount((prevContador) => prevContador + diferencia)
    // 4. Actualizar Productos
    setProducts((prev) =>
      prev.map((item) =>
        item.id === productoCarrito.id 
          ? { ...item, stock: nuevoStockRestante } 
          : item
      )
    );
  };


  const decreaseCartItem = (productoCarrito) => {

    const productoExiste = cartItems.find(
      (item) => item.id === productoCarrito.id 
    );

    if (productoCarrito.cantidad <= 0) {
      return;
    }
    setCartCount((prevContador) =>
      productoCarrito.stock ? prevContador - 1 : prevContador
    );
    
    // setTotalPrice((prevTotal) =>
    //   productoCarrito.stock ? prevTotal - 1 : prevTotal
    // );

    setCartItems((prevProductos) =>
      prevProductos.map((item) =>
        item.id === productoCarrito.id && item.stock
          ? { ...item, cantidad: item.cantidad - 1 } // Incrementa la cantidad
          : item
      )
    );

    setProducts(
      (prevProducts) => // retorno implicito de un array
        prevProducts.map((item) =>
          item.id === productoCarrito.id && item.stock
            ? { ...item, stock: item.stock + 1 }
            : item
      )
    );
  };

  const increaseCartItem = (productoCarrito) => {

    const esProductoDisponible = productoCarrito.stock - productoCarrito.cantidad  != 0;

    if (!esProductoDisponible) {
      return;
    }


    const productoExiste = cartItems.find(
      (item) => item.id === productoCarrito.id 
    );



    if(productoCarrito.id )
    setCartCount((prevContador) =>
      productoCarrito.stock ? prevContador + 1 : prevContador
    );

    // setTotalPrice((prevTotal) =>
    //   productoCarrito.stock ? prevTotal + 1 : prevTotal
    // );

    setCartItems((prevProductos) =>
      prevProductos.map((item) =>
        item.id === productoCarrito.id && item.stock
          ? { ...item, cantidad: item.cantidad + 1 } // Incrementa la cantidad
          : item
      )
    );

    setProducts((prevProducts) => // retorno implicito de un array
        prevProducts.map((item) =>
          item.id === productoCarrito.id && item.stock
            ? { ...item, stock: item.stock - 1 }
            : item
        )
    );
  };


  const addToCart = (productoAAgregar) => {
 
    if(productoAAgregar.stock <= 0){
      return
    }
    
    const productoExiste = cartItems.find(
      (item) => item.id === productoAAgregar.id 
    );

    if (productoExiste) {
      //  actualiza la cantidad del producto
      setCartItems((prevProductos) =>
        prevProductos.map((item) =>
          item.id === productoAAgregar.id && item.stock 
            ? { ...item, cantidad: item.cantidad + 1 } // Incrementa la cantidad
            : item
        )
      );
    } else {
      setCartItems((prevProductos) => [ // retorno implicito de un array 
        ...prevProductos,
        { ...productoAAgregar, cantidad: 1 },
      ]);
    }

    setProducts((prevProducts) => // retorno implicito de un array 
        prevProducts.map((item) => 
        item.id === productoAAgregar.id && item.stock
        ? { ...item, stock: item.stock - 1 } 
        : item 
      )
    );


  setCartCount((prevCounter) => (
    productoAAgregar.stock ?  prevCounter + 1 : prevCounter
  ));

  }

  useEffect(() => {
    if (cartItems.length != 0) {
      setTotalPrice(
        cartItems.reduce(
         (accumulator, item) => accumulator + item.price * item.cantidad
         ,0)
      );
    }
  }, [cartItems]);
  

  return (
    <CartContext.Provider 
    value={{  increaseCartItem,  
         decreaseCartItem, 
         removeFromCart, 
         cartItems, 
         setCartItems, 
         cartCount, 
         setCartCount,  
         totalPrice, 
         setTotalPrice, 
         setProducts, 
         products,
         clearCart,
         addToCart,
         couponDiscount,
         setCantidadCartItem, 
         setCouponDiscount}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);
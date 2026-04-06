import { useListing } from "@/features/listing/hooks/useListing.js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {


  const {products, setProducts} = useListing()
  const [couponDiscount, setCouponDiscount] = useState(false)

  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

 
  const clearCart = () => {
    setCartItems([])
    setTotalPrice(0)
    setCartCount(0)
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotalPrice");
    localStorage.removeItem("cartCount");
  }


  useEffect(() => {
    const savedCartItems  = localStorage.getItem("cartItems");
    const savedTotalPrice = localStorage.getItem("cartTotalPrice");
    const savedCartCount  = localStorage.getItem("cartCount");

    if (savedCartItems && savedTotalPrice && savedCartCount) {
        setCartItems(JSON.parse(savedCartItems));
        setTotalPrice(JSON.parse(savedTotalPrice));
        setCartCount(JSON.parse(savedCartCount));
    }
  }, []);


  useEffect(()=>{
    if(cartItems && cartItems.length > 0){
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    if(totalPrice && totalPrice > 0) {
      localStorage.setItem("cartTotalPrice", JSON.stringify(totalPrice));
    }
    if(cartCount && cartCount > 0) {
      localStorage.setItem("cartCount",  JSON.stringify(cartCount));
    }

  },[cartItems, totalPrice, cartCount]);



  const  removeFromCart = (productoCart) => {

    setCartCount((prevContador) => 
      prevContador - productoCart.cantidad)
    setTotalPrice((prevTotal) => 
      prevTotal - (productoCart.price * productoCart.cantidad))

    setProducts((prevProducts) => // retorno implicito de un array 
      prevProducts.map((item) => 
        item.id === productoCart.id
        ? { ...item, stock: item.stock + productoCart.cantidad } 
        : item 
      )
    );

    setCartItems((prevProductos) =>
      prevProductos.filter((item) =>
        item.id !== productoCart.id 
    ))

  }


  const setCantidadCartItem = (productoCart, value) => {
    // 1. Validar que el valor sea un número válido
    const nuevaCantidad = parseInt(value);
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) return;
  
    const totalDisponible = productoCart.stock + productoCart.cantidad;
    
    // Si el usuario pide más de lo que existe en total, limitamos al máximo
    const cantidadFinal = nuevaCantidad > totalDisponible ? totalDisponible : nuevaCantidad;
    const nuevoStockRestante = totalDisponible - cantidadFinal;
  
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productoCart.id 
          ? { ...item, cantidad: cantidadFinal } 
          : item
      )
    );
    const diferencia = cantidadFinal - productoCart.cantidad;

    // Actualizamos el contador global sumando la diferencia
    setCartCount((prevContador) => prevContador + diferencia)
    // 4. Actualizar Productos
    setProducts((prev) =>
      prev.map((item) =>
        item.id === productoCart.id 
          ? { ...item, stock: nuevoStockRestante } 
          : item
      )
    );
  };


  const decreaseCartItem = (productoCart) => {

    const productoExiste = cartItems.find(
      (item) => item.id === productoCart.id 
    );

    if (productoCart.cantidad <= 0) {
      return;
    }
    setCartCount((prevContador) =>
      productoCart.stock ? prevContador - 1 : prevContador
    );
    
    // setTotalPrice((prevTotal) =>
    //   productoCart.stock ? prevTotal - 1 : prevTotal
    // );

    setCartItems((prevProductos) =>
      prevProductos.map((item) =>
        item.id === productoCart.id && item.stock
          ? { ...item, cantidad: item.cantidad - 1 } // Incrementa la cantidad
          : item
      )
    );

    setProducts(
      (prevProducts) => // retorno implicito de un array
        prevProducts.map((item) =>
          item.id === productoCart.id && item.stock
            ? { ...item, stock: item.stock + 1 }
            : item
      )
    );
  };

  const increaseCartItem = (productoCart) => {

    const esProductoDisponible = productoCart.stock - productoCart.cantidad  != 0;

    if (!esProductoDisponible) {
      return;
    }


    const productoExiste = cartItems.find(
      (item) => item.id === productoCart.id 
    );



    if(productoCart.id )
    setCartCount((prevContador) =>
      productoCart.stock ? prevContador + 1 : prevContador
    );

    // setTotalPrice((prevTotal) =>
    //   productoCart.stock ? prevTotal + 1 : prevTotal
    // );

    setCartItems((prevProductos) =>
      prevProductos.map((item) =>
        item.id === productoCart.id && item.stock
          ? { ...item, cantidad: item.cantidad + 1 } // Incrementa la cantidad
          : item
      )
    );

    setProducts((prevProducts) => // retorno implicito de un array
        prevProducts.map((item) =>
          item.id === productoCart.id && item.stock
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
    console.log(cartItems)
    if (cartItems.length != 0) {
      setTotalPrice(
        cartItems.reduce(
         (accumulator, item) => accumulator + item.price * item.cantidad
         ,0)
      );
    }
  }, [cartItems]);
  

  const orderData = useMemo(()=>({
        "details" : cartItems.map((item)=> ({
            "productId": item?.productId,
            "listingId": item?.id,
            "name": item?.productName,
            "quantity": item?.cantidad,
            "priceAtPurchase": item?.price
        })),
        "totalAmount": totalPrice,
  }),[totalPrice, cartItems]) 


  return (
    <CartContext.Provider 
    value={{  
         increaseCartItem,  
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
         setCouponDiscount, 
         orderData
         }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);

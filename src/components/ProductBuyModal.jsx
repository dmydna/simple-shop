import React, { useEffect, useState } from "react";
import { Link, useLocation, useMatch, useSearchParams } from "react-router-dom";
import { Button, Modal, ProgressBar, Form } from "react-bootstrap";
import Img3 from "/src/assets/purchasing.png";
import Img2 from "/src/assets/check-crop.gif"
import Img1 from "/src/assets/online-store.png";
import SuccessCheck from "./SuccessCheck";
import { orderService } from "../services/orderService";
import { clientService } from "../services/clientService";
import { useCart } from "../contexts/CartContext";

function ProductBuyModal({show,onHide}) {

    const { cartItems, addToCart} = useCart()
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [enabled, setEnabled] = useState('disabled')


    const [client, setClient] = useState({ name: "", email: ""});
    const [order, setOrder]   = useState({state: "", client: "", details : []})

    const handleChange = (e) => {
      const { name, value, type } = e.target;
      const val = type === 'number' ? Number(value) : value;
      setClient({ ...client, [name]: val });
      console.log(client);
    };
  

    const registerOrder = async () => {
      try {
        // Crea Cliente
        const savedClient = await clientService.create(client);
        console.log("Cliente creado con ID:", savedClient.id);
        // Crea Pedido
        await handleCreateOrder(savedClient);
        alert("Pedido realizado con éxito");
        // await fetchData(); // Refrescar lista
        // handleCloseModal();
      } catch (error) {
        alert("Hubo un error en el proceso de registro");
        console.error(error);
      }
    };


    const handleCreateOrder = async (newClient) => {
      console.log(cartItems)
      setOrder({ 
        ...order,
        state: "PROCESANDO", 
        client: { id: newClient.id }, 
        details: cartItems.map(p => ({
          productId: p.id, 
          name: p.name,
          stock: p.stock || 0,
          quantity: p.quantity || 1,
          price: p.price,
          priceAtPurchase: p.price * p.quantity
        })),
      });
      const orderData = order;
      console.log(order)
      try {
        await orderService.create(orderData); 
      } catch (error) {
        throw error;
      }
    };


    useEffect(()=>{ 
      const preloadImage = [Img1,Img2,Img3]
      preloadImage.map((url) => {
        const img = new Image();
        img.src = url;
      });
    },[])
  

    const handleNext = () => {
        setStep((prev) => prev + 1)
        setProgress(((step) * 33.3))
        setEnabled('disabled')
    }
    const handlePrev = () => {
        setStep((prev) => prev - 1)
        setProgress((prev) => (prev - 33.3))
    };
    const handleAccept = () => {
        onHide()
    }



    useEffect(()=>{
      if(!show){
        setStep(0);
        setProgress(0);
      }
    },[show])

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="border-0" closeButton>
           {step == 0 && <p className="h3">Orden de Compra</p> } 
        </Modal.Header>
        <Modal.Body>
        {step === 0 && 
        (
          <>
          <Form>
            {/* <div className="mb-3 d-flex gap-5"> </div> */}
                 <Form.Group className="mb-3" controlId="formPrice">
                   <Form.Label>Cliente</Form.Label>
                   <Form.Control
                     type="text"
                     rows={3}
                     placeholder="Ingrese un precio"
                     name="name"
                     onChange={handleChange}
                   />
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="formStock">
                   <Form.Label>Mail</Form.Label>
                   <Form.Control
                     type="text"
                     rows={3}
                     placeholder="Ingrese un stock"
                     name="email"
                     onChange={handleChange}
                   />
                 </Form.Group>
          </Form>
          </>
        )}
        {step === 1 && 
        (
          <>
           <div className="d-flex">
             <img className="p-4 mx-auto" width={170} src={Img1}/>
           </div>
           <p className="text-center"> 
                Presiona continuar para confirmar tu compra.
           </p>
          </>
        )}
        {step === 2 && 
        (
          <>
            <SuccessCheck 
             image={Img2}
             width={170} 
             show={true} 
             handleEnd={()=>setEnabled('enabled')}
             time={1500}
            />
            <p className="text-center text-success"> 
                Tu orden de comprar fue registrada con exito.
            </p>
          </>
        )}
        {step === 3 && (
         <>
           <div className="d-flex">
             <img className="p-4 mx-auto" width={170} src={Img3}/>
           </div>
           <p className="text-center">
             Gracias por tu compra. Vuelve pronto.
           </p>
         </>  
        )}
        </Modal.Body>
        <Modal.Footer className="border-0">
            {step == 1  && 
              (<Button variant="secondary" onClick={()=> onHide(false)}>
                Cancelar
              </Button>)}
            {step < 3  ? 
              (<Button 
              className={step == 2 && enabled} 
              variant="primary" 
              onClick={() => {handleNext(), step == 2 && registerOrder()} }>
                 Continuar 
              </Button>) : 
              (<Button variant="success" onClick={()=> onHide(false)}>
                Aceptar
              </Button> )}
        </Modal.Footer>
      </Modal>
    );
}
  
export default ProductBuyModal;
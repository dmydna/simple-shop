
import React, { useEffect, useRef } from "react";
import { Row } from "react-bootstrap";


export default function CarrouselScroll({children, count, fix=0}) {

    const cantidadHijos = count || React.Children.count(children);
    const contenedorRef = useRef(null);


    const handleNext = () => {
        if (contenedorRef.current) {
            const currentScroll = contenedorRef.current.scrollLeft;
            const anchoTotal = contenedorRef.current.scrollWidth;
            const elemWidth = anchoTotal / cantidadHijos
            let nuevaPosicion = currentScroll + elemWidth;
            console.log(nuevaPosicion, anchoTotal)
            if (nuevaPosicion >= anchoTotal/2) {
                nuevaPosicion = 0;
            }
            contenedorRef.current.scrollLeft = nuevaPosicion + fix
        }
    }

    const handlePrev = () => {
        if (contenedorRef.current) {
            const currentScroll = contenedorRef.current.scrollLeft;
            const anchoTotal = contenedorRef.current.scrollWidth;
            const elemWidth = anchoTotal / cantidadHijos
            let nuevaPosicion = currentScroll - elemWidth;
            if (nuevaPosicion <= 0) {
                nuevaPosicion = anchoTotal;
            }
            contenedorRef.current.scrollLeft = nuevaPosicion - fix
        }
    }


    return (

        <div>

            <Row className={`mb-3 d-md-flex`}>

            <style>{`
                #carrousel-scroll {
                  overflow-x: auto; 
                  overflow-y: hidden; 
                  scroll-behavior: smooth;
                  scrollbar-width: none; /* Firefox */
                  -ms-overflow-style: none; /* IE y Edge antiguo */
                }
                #carrousel-scroll::-webkit-scrollbar {
                  display: none; /* Chrome, Safari, Edge */
                }
            `}</style>


            <div ref={contenedorRef} id="carrousel-scroll" style={{overflowX: "scroll"}} className="d-flex gap-2 flex-row">
    
                <div onClick={handlePrev} style={{ left: 0, zIndex: 5, marginRight: '-68px' }} className="position-sticky pointer">
                    <i  style={{position: "relative", top: "40%"}} class="bi bi-chevron-left rounded-circle bg-dark bg-opacity-10 p-3"></i>
                </div>

                {children}


                <div onClick={handleNext} style={{ right: 0,  zIndex: 5, marginRight: '-68px' }} className="position-sticky pointer">
                    <i  style={{position: "relative", top: "40%"}}  
                    class="bi bi-chevron-right rounded-circle bg-dark bg-opacity-10 p-3"></i>
                </div>

	
            </div>	


            </Row>

        </div>
    )
}
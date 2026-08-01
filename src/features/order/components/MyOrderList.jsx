import { Alert, Card } from "react-bootstrap";
import CartItem from "@f/cart/components/CartItem.jsx";
import { useOrderDetailContext } from "../contexts/OrderDetailContext";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import OrderTable from "./OrderTable";
import { useUrlParams } from "@/hooks/useUrlParams";




export const MyOrderList = ({ children, className }) => {

    const { currentOrder, setShowReview } = useOrderDetailContext()
    const {searchParams, setSearchParams } = useUrlState()
    const [visibleItems, setVisibleItems] = useState([])
    const [selectedId, setSelectedId] = useState()
    const {idParam, pageVersion} = useUrlParams()
    

    useEffect(()=>{
        console.log("currentOrder:" , currentOrder)
    }, [currentOrder])

 
  useEffect(() => {
    if(currentOrder){ setVisibleItems(currentOrder?.items || [])}
    if (idParam){
      setVisibleItems(currentOrder?.items?.filter((item)=> idParam == item.reviewId ))
    }else{
      setSelectedId(null)
      setVisibleItems(currentOrder?.items || [])
    } 
    if(pageVersion){
        setSearchParams(prev => ({...prev, id: null}))
    }
  }, [idParam, selectedId, currentOrder])




    return (
        <>
            <Card className={`m-2 ${className}`}>
                <div className="d-flex align-items-center justify-content-between">
                    {children}
                </div>
                <div className="my-2" />
                    <OrderTable content={visibleItems}  />
            </Card>
        </>)

}
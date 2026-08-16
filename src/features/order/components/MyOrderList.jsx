import { Alert, Card } from "react-bootstrap";
import { useOrderDetailContext } from "@f/order/contexts/OrderDetailContext";
import { useEffect, useState } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import OrderTable from "@f/order/components/OrderTable";
import { useUrlParams } from "@/hooks/useUrlParams";




export const MyOrderList = ({ children, className }) => {

    const { currentOrder, setShowReview } = useOrderDetailContext()
    const { searchParams, setSearchParams } = useUrlState()
    const [visibleItems, setVisibleItems] = useState([])
    const [selectedId, setSelectedId] = useState()
    const { idParam, pageVersion } = useUrlParams()
    


    useEffect(() => {
        if (currentOrder) { setVisibleItems(currentOrder?.items || []) }
        if (idParam) {
            setVisibleItems(currentOrder?.items?.filter((item) => idParam == item.reviewId))
        } else {
            setSelectedId(null)
            setVisibleItems(currentOrder?.items || [])
        } 
        if (pageVersion) {
            setSearchParams(prev => ({ ...prev, id: null }))
        }
    }, [idParam, selectedId, currentOrder])




    return (
        <>
            <Card className={`m-2 ${className}`}>
                <div className="d-flex align-items-center justify-content-between">
                    {children}
                </div>
                <div className="my-2" />
                <OrderTable content={visibleItems} />
            </Card>
        </>)

}
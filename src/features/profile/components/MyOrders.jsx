import { useService } from "@/hooks/useService";
import { profileService } from "../services/profileService";
import PageLoading from "@/components/common/PageLoading";
import { useEffect, useState } from "react";
import { ImgGenApi } from "@/dev/utils";
import { listingService } from "@/features/listing/services/listingService";


function MyOrders({ children }) {

    const { loading, error, getMyOrders } = useService({ service: profileService })
  
    const [data, setData] = useState([])

    const myOrders = async () => {
        try {
            const response = await getMyOrders();
            setData(response)
        } catch {

        } finally { }
    }



    useEffect(() => {
        myOrders()
        console.log(data)
    }, [])

    return (loading ? (<PageLoading />) : (
        <>
            {children}
            {data.map(order =>
                <div className="mb-5">
                    <span className="text-secondary border-bottom d-block w-100 pb-2 my-3"> 
                         <i className="bi-calendar me-2"></i>Dec 11, 2020 
                    </span>
                    {order.details.map(p =>
                        <div className="d-flex mb-3">
                            <img 
                            className="rounded" 
                            width={55}
                            height={55}
                            src={
                                ImgGenApi({ dimension: "55x55", background: ".celeste", textColor: ".celeste" })
                            } 
                            />
                            <div className="w-100 m-2 my-1 mx-3 ">

                                <span className="d-block fw-bold small mb-2"> {p.name} </span>
                                <div className="d-flex justify-content-between">
                                    <span className="small disabled"> <b>cantidad :</b> {p.quantity} </span>
                                    <span className="small disabled"> <b>precio :</b> ${p.priceAtPurchase}</span>
                                </div>
                            </div>

                        </div>)}
                </div>)}
        </>

    ))
};

export default MyOrders;
import { ImgGenApi } from "@/dev/imageJS";
import { formatDate } from "@/features/dashboard/util";
import { useOrder } from "@/features/order/hooks/useOrder";
import DataView from "@common/DataView";
import Pagination from '@features/pagination/components/Pagination.jsx';
import { useEffect } from "react";
import { ProfileHeader } from "./ProfileHeader";

function MyPurchases({ children }) {


    const { loading, error, setError ,content, currentPage, setCurrentPage, totalPages, 
    setFilters, refreshData } = useOrder()

    useEffect(() => {
        // Lógica de paginación
        setCurrentPage(0)
    }, [])

    return (
        <DataView
            data={content}
            loading={loading}
            emptyMessage={"No tienes compras aún"}
            emptyIcon="bi bi-handbag"
            error={error}
            onRetry={refreshData}
        >
        <>
            <ProfileHeader
                title="Mis compras"
                subtitle="Puedes ver las ultimas compras realizadas"
            />
        
            {content?.length !== 0 && content.map(order =>
                <div className="mb-5">
                    <span className="text-secondary border-bottom d-block w-100 pb-2 my-3">
                        <i className="bi-calendar me-2"></i>{formatDate(order?.meta.createdAt, true)}
                    </span>
                    {order?.items?.map(p =>
                        <div className="d-flex mb-3">
                            <img
                                className="rounded"
                                width={55}
                                height={55}
                                src={
                                    ImgGenApi({ dimension: "55x55", background: ".menta", fontSize: "30", icon: "f244" })
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
                </div> )}
           {/*TODO: actualizar paginacion por params*/}           
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </>
    </DataView>    
    )
};

export default MyPurchases;

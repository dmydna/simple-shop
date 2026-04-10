import PageLoading from "@/components/common/PageLoading";
import { ImgGenApi } from "@/dev/utils";
import { useOrder } from "@/features/order/hooks/useOrder";
import Pagination from '@features/pagination/components/Pagination.jsx';
import PageEmpty from '@pages/errors/PageEmpty.jsx';
import { useEffect } from "react";
import { ProfileHeader } from "./ProfileHeader";

function MyPurchases({ children }) {


    const { content, loading, currentPage, setCurrentPage, totalPages, setFilters } = useOrder()

    useEffect(() => {
        // Lógica de paginación
        setCurrentPage(0)
    }, [])

    return (loading ? (<PageLoading />) : (
        <>
        {content?.length !== 0 && (
            <ProfileHeader
                title="Mis compras"
                subtitle="Puedes ver las ultimas compras realizadas"
            />
        )}
            {content?.length !== 0 && content.map(order =>
                <div className="mb-5">
                    <span className="text-secondary border-bottom d-block w-100 pb-2 my-3">
                        <i className="bi-calendar me-2"></i>Dec 11, 2020, 13:20
                    </span>
                    {order.details.map(p =>
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
           {content?.length == 0 && (
               <PageEmpty ico='bi-handbag'/>
           )}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </>

    ))
};

export default MyPurchases;

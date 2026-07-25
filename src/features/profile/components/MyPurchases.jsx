import { formatDate } from "@utils/mappers";
import DataView from "@common/DataView";
import Pagination from '@features/pagination/components/Pagination.jsx';
import { useEffect, useMemo } from "react";
import { ProfileHeader } from "./ProfileHeader";
import RemovableListItem from "@/components/common/RemovableListItem";
import { usePurchases } from "../hooks/usePurchases";
import { useUrlParams } from "@/hooks/useUrlParams";

function MyPurchases() {

    // TODO: refactorizar para mostrar detalles (items de cada orden) en otra vista separada.

    const { loading, error, content, currentPage, setCurrentPage, 
        totalPages, refreshData } = usePurchases()

    // Lógica de paginación

    const { pageParam } = useUrlParams()

    useEffect(() => {
        setCurrentPage(pageParam || 0)
    }, [pageParam])


    const buildDescription = (item) => {
        return `
            ${buildTime(item?.createdAt)} -- 
            OrderId #${item?.orderId} -- 
            ${item?.status} -- 
            $${item?.priceAtPurchase / item?.quantity} x ${item?.quantity} units 
        `
    }

    const buildTime = ([year, month, day, hour, min]) => {
        return `${hour%12}:${min < 10 ? "0" + min : min} ${hour < 12 ? 'am' : 'pm'}`
    }


    // Separar items por fecha
    const dateChunck = useMemo(() => {
        const res = {};
        if (content && content?.length !== 0) {
            content.forEach(order => {
                if (!res[formatDate(order?.createdAt, false)]) {
                    res[formatDate(order?.createdAt, false)] = [order]
                } else {
                    res[formatDate(order?.createdAt, false)].push(order)
                }

            })            
        }
        return res;
    }, [content])


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
        
                {Object.entries(dateChunck)?.map(([date, orders]) =>
                    <div className="mb-5">
                        <span className="text-secondary border-bottom d-block w-100 pb-2 my-3">
                            <i className="bi-calendar me-2"></i>{date}
                        </span>
                        {orders.map((item, index) =>
                            <RemovableListItem
                                key={index} 
                                {...item}
                                title={item.name}
                                description={buildDescription(item)}
                                className={"mb-1 rounded"}
                            />
                        )}
                    </div>)}
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

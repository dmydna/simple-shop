import DataView from "@/components/common/DataView";
import { useFavorite } from '@/features/favorite/hooks/useFavorite.js';
import Pagination from '@features/pagination/components/Pagination.jsx';
import { useEffect } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { Link, useNavigate } from "react-router-dom";

function MyFavorites({ children }) {

    const { content, loading, currentPage, setCurrentPage, totalPages, setFilters, 
    createFavorite, deleteFavorite, refreshData, error } = useFavorite({autofetch: true})


    const navigate = useNavigate()

    useEffect(() => {
        // Lógica de paginación
        setCurrentPage(0)
    }, [])

    const handleDeleteFavorite = async (id) => {
        try {
            await deleteFavorite(id);
            refreshData()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <DataView
            data={content}
            error={error}
            loading={loading}
            onRetry={refreshData}
            emptyIcon="bi bi-heart"
            emptyMessage={"No tienes favoritos aún"}
        >
            <>
                <ProfileHeader
                    title='Mis favoritos'
                    subtitle='Pueder ver o cambiar tus favoritos'
                />

                {content.map((item, index) =>
                    <div className="mb-4">
                        <div className={`d-flex mb-2 ${index !== content.length - 1 ? 'border-bottom' : ''} `}>
                            <img
                                className="rounded"
                                width={55}
                                height={55}
                                src={item.thumbnail}
                            />
                            <div className="w-100 m-2 my-2 mx-3">
                                <div className='d-flex justify-content-between'>
                                    <span
                                       onClick={()=> navigate(`/p/${item.hash}`)} 
                                       className="d-block fw-bold small mb-2 pointer"> {item.title} </span>
                                    <span
                                        onClick={() => handleDeleteFavorite(item?.listingId)}
                                        className='small btn btn-sm  btn-light rounded-circle'>
                                        <i className='bi-x-lg'></i>
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className='text-secondary fw-semibold'>
                                        <i className='bi-cash-coin mx-2'></i> {item?.price}
                                    </span>
                                    <div className='d-flex gap-3'>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>)}
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />

            </>
        </DataView>
    )

}

export default MyFavorites;

import { useEffect, useState } from "react";
import { reviewService } from "@/features/review/services/reviewService.js";
import PageLoading from "@/components/common/PageLoading";
import { ImgGenApi } from "@/dev/utils";
import { useReview } from "@/features/review/hooks/useReview";
import Pagination from '@features/pagination/components/Pagination.jsx';
import PageEmpty from '@pages/errors/PageEmpty.jsx'
import { ProfileHeader } from "./ProfileHeader";
import { useNavigate } from "react-router-dom";


function MyReviews({ children }) {

    const { content, loading, currentPage, setCurrentPage, totalPages, setFilters, refreshData, deleteReview } = useReview()

    const navigate = useNavigate()

    useEffect(() => {
        // Lógica de paginación
        setCurrentPage(0)
    }, [])

    const handleDelete = () => {
        deleteReview()
        refreshData()
    }

    return (loading ? (<PageLoading />) : (
        <>
        {content?.length !== 0 && (
            <ProfileHeader
                title="Mis reseñas"
                subtitle="Puedes ver tu reseñas pedientes"
            />
        )}
            {content?.length !== 0 && content.map((item, index) =>
                <div className="mb-4">
                        <div className={`d-flex mb-2 ${index !== content.length - 1 ? 'border-bottom' : ''}`}>
                            <img
                                className="rounded"
                                width={55}
                                height={55}
                                src={item.image}
                            />
                            <div className="w-100 m-2 my-2 mx-3">

                                <span className="d-block fw-bold small mb-2"> {item.title} </span>
                                <div className="d-flex justify-content-between">
                                  <span className='small btn btn-sm btn-light '>
                                     <i className='bi-calendar me-2'></i> Dec 22, 2020
                                  </span> 
                                  <div className='d-flex gap-3'>
                                  <span 
                                   onClick={()=> navigate('/user/write-review')}
                                   className='small btn btn-sm  btn-light border'>
                                      escribir reseña
                                  </span>
                                  <span onClick={handleDelete} className='small btn btn-sm   btn-light border'>
                                     cancelar
                                  </span>
                                  </div>
                                </div>
                            </div>

                        </div>
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
}

export default MyReviews;

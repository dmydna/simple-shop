import { devService } from "@/dev/services/devService";
import { useService } from "@/hooks/useService";
import {  useMemo, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import FileUploader from "./FileUploader";

import PageError from "@/pages/fallback/PageError";
import PageLoading from "@/pages/fallback/PageLoading";
import PageSuccess from "@/pages/fallback/PageSuccess";
import { placeholder } from "@utils/image.js";




function UploadService() {

    const [succes, setSuccess] = useState(false)
    const [data, setData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const { loading, error, setError, createBulk } = useService({ service: devService, onSuccess: ()=>setSuccess(true) })

    const handleSubmit = () => {
        createBulk("listings", data)
    }

    const imgInfo = {
        "icon": "bi-braces",
        "dimension": "90x100",
        "background": ".menta",
        "fontColor": "000",
        "fontWeight": "normal",
        "fontSize": 50,
    }


    const img = placeholder({ ...imgInfo, "icon": "F791" });

    // eslint-disable-next-line no-unused-vars
    const [totalReviews, totalUsers, totalProducts, totalListings] = useMemo(()=>{
        let countReviews = 0
        let users = [];
        if(data && data.length > 0){
            for(let {reviews} of data){
                if(reviews.length != 0){
                    for(let {username} of reviews){
                        if(!users.includes(username)){
                            users.push(username)
                        }
                    }
                    countReviews += reviews.length;
                }
            }            
        }

        return [countReviews || 0, users.length || 0, data?.length || 0, data?.length || 0]
    },[data])
        

    return (
        <Container>
            <div className="d-block mx-auto rounded island p-4 border mb-3" style={{ maxWidth: '500px' }}>
                {loading && (
                    <PageLoading></PageLoading>
                )}
                {!loading && !error && !succes && (
                    <>
                        <p className="h5">Demo </p>
                        <small className="mb-4 text-secondary">Selecciona un archivo json valido para cargar nuevo contenido.</small>
                        <FileUploader
                            loading={loading}
                            setData={setData}
                            data={data}
                            label={false}
                        />
                        

                        <div className="d-flex py-2  mt-2 mb-3">
                            <img className="rounded" src={img}></img>
                            <div className="m-2 ms-3">
                                <p className="h6 mb-1">
                                   {data?.length > 0 ? 
                                   'Contenido' : 'Sin Contenido'}
                                </p>
                                {data?.length > 0 ? 
                                (<>
                                <p className="small text-secondary mb-0">
                                    Se crearan {data.length} nuevas <b>entradas</b> + elementos secundarios.
                                </p>
                                
                                <div onClick={()=> setShowDetails(prev => !prev)} 
                                     style={{width: '165px'}}
                                     className='btn btn-light border d-flex gap-3  justify-content-between nowrap py-0'>
                                   <p className="small  fw-bolder mb-0">
                                      {showDetails ? 
                                      'ocultar detalles' : 'ver detalles'}
                                   </p> 
                                   {showDetails ? 
                                     <i class="bi bi-chevron-up"></i> : 
                                     <i class="bi bi-chevron-down"></i>}                               
                                   
                                </div>
                                </>
                                ):(
                                <>
                                  <p className="small text-secondary mb-0">
                                    No hay archivos seleccionados.
                                </p>

                                </>)}

                            </div>

                        </div>

                                    {showDetails && (
                                        <div style={{ 
                                            marginTop: '10px',
                                            marginBottom: '10px', 
                                            padding: '10px', 
                                            background: '#f8f9fa', 
                                            borderRadius: '4px',
                                            border: '1px solid #dee2e6',
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                            fontSize: '0.85rem',
                                            fontFamily: 'monospace',
                                            textAlign: 'start'
                                        }}>
                                        <p className='small'><strong>Entradas:</strong> {totalListings}</p>
                                        <p className='small'><strong>Reviews:</strong> {totalReviews}</p>
                                        <p className='small'><strong>Users:</strong> {totalUsers} </p>
                                        <p className='small'><strong>Products:</strong> {totalProducts}</p>
                                        <p className='small'>Se crearan un <strong>total</strong> {totalProducts + totalListings + totalUsers + totalReviews} nuevos elementos </p>
                                    </div>
                                    )}


                        <Button className="d-block mx-auto rounded-4" onClick={handleSubmit} variant="dark">
                            Publicar
                        </Button>
                    </>
                )}
                {error && (
                    <PageError handle={()=>setError(null)}/>
                )}

                {succes && (
                    <PageSuccess handle={()=>setSuccess(false)}/>
                )}

            </div>

        </Container>

    )
}

export default UploadService;

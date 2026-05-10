import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonLink from "../../common/ButtonLink";

function ListingListConfig({ close, item }) {


    const navigate = useNavigate()
    const BASE_URL = "/dashboard/listing-form";

    const itemNullorVoid = useMemo(()=>{
        if(!item) {return true}
        if(item && Object.keys(item).length == 0){return true}
        return false
    },[item])

    return (
        <div className="p-3 island rounded">

            <div style={{ lineHeight: '2.5rem' }}
                className="d-flex justify-content-between mb-4">
                <p className="fs-6 mb-0 fw-medium">
                    { itemNullorVoid ? "Post Actions" : "Post Config" }
                </p>
                {close && (
                <Button onClick={close} variant="light" className="">
                    <i className="bi-x-lg "></i>
                </Button>
                )}

            </div>

          
           <ButtonLink
               visible={itemNullorVoid}
               icon="bi-plus-lg" 
               handle={()=> navigate('/faqs')}
            >
                Create Post
           </ButtonLink>


           <ButtonLink
               visible={itemNullorVoid}
               icon="bi-pencil-fill" 
               handle={()=> navigate('/faqs')}
            >
                Create Draft
           </ButtonLink>


           <ButtonLink
               visible={itemNullorVoid}
               icon="bi-upload" 
               handle={()=> navigate('/faqs')}
            >
                Import File
           </ButtonLink>


           <ButtonLink
               visible={itemNullorVoid}
               icon="bi bi-download" 
               handle={()=> navigate('/faqs')}
            >
                Export File
           </ButtonLink>

           <ButtonLink
               icon="bi-eye" 
               handle={()=> navigate('/faqs')}
               visible={item?.status === "ACTIVE"}
            >
                Hide post
           </ButtonLink>

           <ButtonLink
               icon="bi-trash3" 
               handle={()=> navigate('/faqs')}
               visible={item?.status === "ACTIVE"}
            >
                Delete post
           </ButtonLink>

            <ButtonLink
               icon="bi-pencil" 
               visible={item?.status === "ACTIVE"}
               handle={() => navigate(`${BASE_URL}?mode=edit&hash=${item.hash}`)}
            >
                Edit post
           </ButtonLink>

            <ButtonLink
               icon="bi-pencil-fill" 
               visible={item?.status === "DRAFT"}
               handle={() => navigate(`${BASE_URL}?mode=draft&hash=${item.hash}`)}
            >
                Edit draft post
           </ButtonLink>

            <ButtonLink
               icon="bi-pencil-fill" 
               visible={item?.status === "DRAFT"}
               handle={() => navigate(`${BASE_URL}?mode=draft&hash=${item.hash}`)}
            >
                Publish draft post
           </ButtonLink>


            <ButtonLink
               icon="bi-copy" 
               visible={item?.status === "ACTIVE"}
               handle={() => navigate(`${BASE_URL}?mode=copy&hash=${item.hash}`)}
            >
                Clone post
           </ButtonLink>
            

            <ButtonLink
               icon="bi-three-dots me-3" 
               handle={() => navigate(`${BASE_URL}?mode=view&hash=${item.hash}`)}
               visible={item?.status === "ACTIVE"}
            >
                Post Summary
           </ButtonLink>
           
            
        </div>
    )
}

export default ListingListConfig;

import { useListing } from "@/features/listing/hooks/useListing";
import SearchLive from "@/features/search/SearchLive";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListingTable } from "@dashboard/listing/ListingTable";






const ListingList = () => {

    const navigate = useNavigate();
    const baseHook = useListing({autofetch: true});
    const {listings, setFilters} = baseHook;
    const [search, setSearch] = useState();

    // URLs
    const FORM_URL = "/dashboard/listing-form";
    const CURRENT_URL = "/dashboard/listing-list";

    useEffect(() => {
        if (search) setFilters({ page: 0, title: search })
    }, [search])


    return (
        <>
        <style>{`
        /** empty table height-fix **/
            .vh-50 {height: 50vh }
        `}</style>
        <div className="mb-3 mx-0 mx-md-2">

            <div className="mx-auto p-4 rounded island border">
                <div>
                    <div>
                        <p className="h5 mb-3">
                            Publicaciones
                        </p>
                    </div>
                    <div className="d-flex justify-content-between my-4 flex-wrap" >
                        <Button
                            variant="light"
                            onClick={() => navigate(`${FORM_URL}?mode=create`)}
                            className="my-2 flex-fill flex-md-grow-0">
                            <i className="bi bi-plus-lg"></i>
                            <span className="fw-medium ms-2">Create new</span>
                        </Button>
                        <SearchLive
                            className='flex-fill flex-md-grow-0'
                            items={listings}
                            handleSearch={setSearch}
                            handleFilter={() => navigate(`${CURRENT_URL}?dialog=filter`)}
                        />
                    </div>
                </div>

                <ListingTable baseHook={baseHook} />

            </div>
        </div>

        </>

        );
}

export default ListingList;

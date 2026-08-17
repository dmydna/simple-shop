
import SearchLive from "@/features/search/SearchLive";
import { useUser } from "@/features/user/hooks/useUser";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserTable } from "@dashboard/user/UserTable";
import { URL_USER_CRUD, URL_USER_LIST } from "@/utils/links";



export const UserList = () => {

    const navigate = useNavigate()
    const baseHook = useUser()
    const { setFilters, Users } = baseHook;
    const [search, setSearch] = useState()


    const FORM_URL = URL_USER_CRUD;
    const CURRENT_URL = URL_USER_LIST;

    useEffect(() => {
        if (search) setFilters({ page: 0, username: search })
    }, [search])

    return (
        <>

            <div>
                <p className="h5  mb-3">
                    User List
                </p>
            </div>
            <div className="d-flex justify-content-between my-4 flex-wrap" >
                <div className="d-flex gap-3">
                    <Button
                        variant="light"
                        onClick={() => navigate(`${FORM_URL}?mode=create`)}
                        className="my-2 flex-fill flex-md-grow-0">
                        <i className="bi bi-plus-lg"></i>
                        <span className="fw-medium ms-2">Create new</span>
                    </Button>
                </div>
                <SearchLive
                    className='flex-fill flex-md-grow-0'
                    items={Users}
                    handleSearch={setSearch}
                    handleFilter={() => navigate(`${CURRENT_URL}?dialog=filter`)}
                />

            </div>
            <UserTable baseHook={baseHook} />


        </>

    );
}

export default UserList;

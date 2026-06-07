
import SearchLive from "@/features/search/SearchLive";
import { useUser } from "@/features/user/hooks/useUser";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserTable } from "./UserTable";



export const UserList = ({}) => {

    const navigate = useNavigate()
    const baseHook = useUser()
    const { setFilters, Users } = baseHook;
    const [search, setSearch] = useState()


   const FORM_URL = "/dashboard/user-form";
   const CURRENT_URL = "/dashboard/user-list";

    useEffect(() => {
        if (search) setFilters({ page: 0, username: search })
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
                            <p className="h5  mb-3">
                                Usuarios
                            </p>
                        </div>
                        <div className="d-flex justify-content-between my-4 flex-wrap" >
                            <div className="d-flex gap-3">
                            <Button
                                variant="light"
                                onClick={() => navigate('/dashboard/user-form?mode=create')}
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
                    </div>

                    <UserTable baseHook={baseHook} />
                </div>
            </div>

        </>

    );
}

export default UserList;

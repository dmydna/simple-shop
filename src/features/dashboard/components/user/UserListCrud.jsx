
import SearchLive from "@/features/search/SearchLive";
import { useUser } from "@/features/user/hooks/useUser";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalCrud from "../../../crud/components/ModalCrud";
import UserListConfig from "./UserListConfig";
import { UserTable } from "./UserTable";

export const UserListCrud = ({currentItem, setCurrentItem}) => {

    const baseHook = useUser()
    const [search, setSearch] = useState()
    const navigate = useNavigate()
    const [showCrudActions, setShowCrudActions] = useState()
    const [showFilter, setShowFilter] = useState()

    // const [currentItem, setCurrentItem] = useState()

    useEffect(() => {
        if (search) setFilters({ page: 0, title: search })
    }, [search])

    const { setFilters, Users } = baseHook;

    const handleOpenEdit = (item) => {
        setCurrentItem(item)
        setShowCrudActions(true)
    }

    const handleclick = (item) => {
        console.log(item)
        if(currentItem && currentItem.id == item.id){
            setCurrentItem({})
        }else{
            setCurrentItem(item)
        }
    }

    return (
        <>
            <div className="mb-3 mx-0 mx-md-2">

                <div className="mx-auto p-4 rounded island border">

                    <div>
                        <div>
                            <p className="h5  mb-3">
                                Usuarios
                            </p>
                        </div>
                        <div className="d-flex justify-content-between my-4 flex-wrap" >
                            <Button
                                variant="light"
                                onClick={() => navigate('/dashboard/user-form?mode=create')}
                                className="my-2 flex-fill flex-md-grow-0">
                                <i className="bi bi-plus-lg"></i>
                                <span className="fw-medium ms-2">Create new</span>
                            </Button>
                            <SearchLive
                                className='flex-fill flex-md-grow-0'
                                items={Users}
                                handleSearch={setSearch}
                                handleFilter={() => setShowFilter(prev => !prev)}
                            />

                        </div>
                        {/* <UserFilterCrud
                                            show={showFilter}
                                            onHide={setShowFilter}
                                            dataSource={Users}
                                            onApply={setFilters}
                                        ></UserFilterCrud> */}
                    </div>

                    <UserTable
                        className=''
                        currentItem={currentItem}
                        baseHook={baseHook}
                        handleclick={handleclick}
                    >
                        {(key, item) => {
                            if (key === 'title') {
                                return (
                                    <></>
                                )
                            }
                            if (key === 'buttons') {
                                return (
                                    <>  {/** Editar */}
                                        <Button
                                            variant="border-0 ligth"
                                            size="sm"
                                            onClick={() => handleOpenEdit(item)}
                                        >
                                            <i className="bi bi-three-dots h5"></i>
                                        </Button>

                                    </>
                                )
                            }

                        }}
                    </UserTable>
                </div>
            </div>


            <ModalCrud
                show={showCrudActions}
                onHide={setShowCrudActions}
            >
                <UserListConfig
                    close={() => setShowCrudActions(false)}
                    item={currentItem}
                />
            </ModalCrud>


        </>

    );
}

export default UserListCrud;

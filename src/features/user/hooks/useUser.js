import React from "react";
import {userService} from "../service/userService.js";
import {useFetchData} from "../../../contexts/useFetchData.js";
import {useFetchById} from "../../../contexts/useFetchById.js";

export const useUser = () => {

    const {loading: loadingList, error: errorList, content,setContent, ...props}
        = useFetchData({service: userService})

    const {loading: loadingItem, error: errorItem, currentItem, setCurrentItem, itemId, setItemId }
        = useFetchById({service: userService})

    return ({
        ...props,
        content,
        loading: loadingList || loadingItem,
        error:   errorList || errorItem,
        users: content,
        setUsers: setContent,
        currentUser: currentItem,
        setCurrentUser: setCurrentItem,
        userId: itemId,
        setUserId: setItemId,
    })
}
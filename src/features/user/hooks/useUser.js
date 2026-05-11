import React, { useEffect } from "react";
import {userService} from "../service/userService.js";
import {useFetchData} from "../../../hooks/useFetchData.js";
import { useFetchElem } from "@/hooks/useFetchElem.js";

export const useUser = (fetchElemMethod=null) => {

    const {loading: loadingList, error: errorList, content,setContent, ...props}
        = useFetchData({service: userService})

    const {loading: loadingItem, error: errorItem, currentItem, setCurrentItem, id, setId, fetchElem, refreshElem }
        = useFetchElem({fetchMethod: fetchElemMethod || userService.getById})

    return ({
        ...props,
        content,
        loading: loadingList || loadingItem,
        error:   errorList || errorItem,
        users: content,
        setUsers: setContent,
        currentUser: currentItem,
        setCurrentUser: setCurrentItem,
        userId: id,
        setCurrentItem,
        setUserId: setId,
        setId, id,
        fetchElem,
        refreshElem
    })
}
import {useFilter} from "../../filters/hooks/useFilter.jsx";
import {usePageable} from "./usePageable.js";
import {useEffect} from "react";

export const usePageFilter = (callback) => {
    const usefilter = useFilter()
    const usepageable = usePageable()


    useEffect(() => {
        if (callback) {
            callback(usepageable.currentPage, usefilter.filters);
        }
    },[usepageable.currentPage, JSON.stringify(usefilter.filters)]);



    return {
        ...usepageable, ...usefilter
    }

}

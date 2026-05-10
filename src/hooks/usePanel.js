import {useState} from "react";

// @deprecated 
export const usePanel = () => {
    const [expandx, setExpandx] = useState(false);
    const [clickIn, setClickIn] = useState(false);
    return ({
        expandx, setExpandx, clickIn, setClickIn
    })
}

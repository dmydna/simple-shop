import {useState} from "react";

export const usePanel = () => {
    const [expandx, setExpandx] = useState(false);
    const [hasExpandx, setHasExpandx] = useState(1);
    return ({
        expandx, setExpandx, hasExpandx, setHasExpandx
    })
}

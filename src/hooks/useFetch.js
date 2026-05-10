import { useState } from "react";

export const useFetch = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ content, setContent ] = useState([]);
    const [ success, setSuccess ] = useState(false)

    return {
        loading, setLoading, content ,setContent, error,setError, success, setSuccess
    }
}

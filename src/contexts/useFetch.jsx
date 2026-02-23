import {useState} from "react";

export const useFetch = () => {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ content, setContent] = useState([]);

    return {
        loading, setLoading, content ,setContent, error,setError
    }
}
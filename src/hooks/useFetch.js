import {useState} from "react";
import nprogress from "nprogress";
import {productService} from "../features/product/service/productService.js";

export const useFetch = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ content, setContent ] = useState([]);
    const [ success, setSuccess ] = useState(false)

    return {
        loading, setLoading, content ,setContent, error,setError, success, setSuccess
    }
}

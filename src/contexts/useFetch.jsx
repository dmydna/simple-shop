import {useState} from "react";
import nprogress from "nprogress";
import {productService} from "../features/product/service/productService.js";

export const useFetch = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ content, setContent] = useState([]);

    return {
        loading, setLoading, content ,setContent, error,setError
    }
}
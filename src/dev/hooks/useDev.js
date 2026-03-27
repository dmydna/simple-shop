import { useEffect, useState } from "react";
import { useFetch } from "../../contexts/useFetch";
import { useListingContext } from "../../features/listing/contexts/ListingContext";
import { useProductContext } from "../../features/product/contexts/ProductContext";
import { useUserContext } from "../../features/user/contexts/UserContext";

export const useDev = () => {

    const { loading, setLoading, error, setError } = useFetch()
    const [devMode, setDevMode] = useState(true)

    const [savedProducts, setSavedProducts] = useState(null)
    const [savedListings, setSavedListings] = useState(null)
    const [savedUsers, setSavedUsers] = useState(null)

    const { fetchData: refreshListings } = useListingContext()
    const { fetchData: refreshProducts } = useProductContext()
    const { fetchData: refreshUser} = useUserContext()

    useEffect(()=>{
        if(savedProducts) refreshProducts()
        if(savedListings) refreshListings()
        if(savedUsers) refreshUser()
    },[savedUsers, savedListings, savedProducts])



    useEffect(() => {
        const SavedProducts = localStorage.getItem("savedProducts");
        const SavedListings = localStorage.getItem("savedProducts");
        const SavedUsers = localStorage.getItem("savedUsers");
        if (SavedProducts) setSavedProducts(SavedProducts);
        if (SavedListings) setSavedListings(SavedListings);
        if (SavedUsers) setSavedUsers(SavedUsers);

    }, [])

    const resetDash = () => {
        setSavedProducts(null);
        setSavedListings(null);
        setSavedUsers(null);
        localStorage.removeItem("savedProducts");
        localStorage.removeItem("savedListings");
        localStorage.removeItem("savedUsers");
    };


    return ({
        loading, setLoading, error, setError,
        devMode, setDevMode, resetDash,
        savedProducts, setSavedProducts,
        savedListings, setSavedListings,
        savedUsers, setSavedUsers,
    })

}

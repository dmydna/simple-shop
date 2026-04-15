import { Navigate } from "react-router-dom";
import { useListingCrudContext } from "../../features/listing/contexts/ListingCrudContext.jsx";

export default function ProtectedRouteListing({ children }){
    const { showModal } = useListingCrudContext();
    return showModal ? children : <Navigate to="/products" />;
}


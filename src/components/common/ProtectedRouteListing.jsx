import { Navigate } from "react-router-dom";
import { useListingCrud } from "../../features/listing/contexts/ListingCrudContext.jsx";

export default function ProtectedRouteListing({ children }){
    const { showModal } = useListingCrud();
    return showModal ? children : <Navigate to="/productos" />;
}


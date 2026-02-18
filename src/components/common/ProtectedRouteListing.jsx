import { Navigate } from "react-router-dom";
import { useListingsForm } from "../../features/listing/hooks/ListingFormContext.jsx";

export default function ProtectedRouteListing({ children }){
    const { showModal } = useListingsForm();
    return showModal ? children : <Navigate to="/productos" />;
}


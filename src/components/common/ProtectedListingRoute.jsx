import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useListings } from "../../contexts/ListingContext";
import { useListingsForm } from "../../contexts/ListingFormContext";

export default function ProtectedListingRoute({ children }){
    const { showModal } = useListingsForm();
    return showModal ? children : <Navigate to="/productos" />;
}


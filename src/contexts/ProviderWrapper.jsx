import { AuthProvider } from "@features/auth/contexts/AuthContext.jsx";
import { CartProvider } from "@features/cart/contexts/CartContext.jsx";
import { ListingProvider } from "@features/listing/contexts/ListingContext.jsx";
import { UIProvider } from "@contexts/UIContext";

// Este es tu Wrapper "CRUD"

export const ProviderWrapper = ({ children }) => {
    return (
        <AuthProvider>
            <UIProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </UIProvider>
        </AuthProvider>
    );
};

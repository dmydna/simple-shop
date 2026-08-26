import { AuthProvider } from "@features/auth/contexts/AuthContext.jsx";
import { CartProvider } from "@features/cart/contexts/CartContext.jsx";
import UIWrapper from "./UIWrapper";

// Este es tu Wrapper "CRUD"

export const ProviderWrapper = ({ children }) => {
    return (

            <AuthProvider>
                <CartProvider>
                    <UIWrapper>
                        {children}
                    </UIWrapper>
                </CartProvider>
            </AuthProvider>
    );
};

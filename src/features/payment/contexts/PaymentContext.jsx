import { createContext, useContext} from "react";


const PaymentContext = createContext();

export function PaymentProvider({ children, ...props}) {


    return (
        <PaymentContext.Provider
            value={{ ...props }}
        >
            {children}
        </PaymentContext.Provider>
    );
}

export const usePaymentContext = () => useContext(PaymentContext);

import { createContext, useContext} from "react";


const OrderDetailContext = createContext();

export function OrderDetailProvider({ children, ...props}) {


    return (
        <OrderDetailContext.Provider
            value={{ ...props }}
        >
            {children}
        </OrderDetailContext.Provider>
    );
}

export const useOrderDetailContext = () => useContext(OrderDetailContext);

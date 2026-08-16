import { baseHandlers } from '@/mocks/modules/handlers/baseHandler';
import { product_service } from '@/mocks/modules/services/product_service';
import { BASE_URL, ENDPOINT } from "@utils/config.js";



const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.PRODUCT}`, product_service]


export const productHandlers = [

  ...(baseHandlers(BASE_ENDPOINT, SERVICE)),
  
];
import { http, HttpResponse } from 'msw';
import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { product_service } from '../services/product_service';
import { baseHandlers } from './baseHandler';



const [BASE_ENDPOINT, SERVICES] = [`${BASE_URL}/${ENDPOINT.FAVORITE}`, product_service]


export const productHandlers = [

  ...(baseHandlers(BASE_ENDPOINT, SERVICES)),
  
];
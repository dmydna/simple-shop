import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { order_service } from '../services/order_service';
import { baseHandlers } from './baseHandler';

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.FAVORITE}`, order_service]


export const orderHandlers = [

  ...(baseHandlers(BASE_ENDPOINT, SERVICE)),
  
];
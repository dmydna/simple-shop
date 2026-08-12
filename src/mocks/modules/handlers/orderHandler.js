import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { order_service } from '../services/order_service';
import { baseHandlers } from './baseHandler';

const BASE_ENDPOINT = `${BASE_URL}/${ENDPOINT.FAVORITE}`
const SERVICES = order_service;

export const orderHandlers = [

  ...(baseHandlers(BASE_ENDPOINT, SERVICES)),
  
];
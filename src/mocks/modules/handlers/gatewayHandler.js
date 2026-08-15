import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { order_service } from '../services/order_service';
import { baseHandlers } from './baseHandler';
import { currentLoggedUser } from '../db';

const BASE_ENDPOINT = `${BASE_URL}/${ENDPOINT.GATEWAY}`


export const gatewayHandlers = [

    // POST: INITIATE
  http.post(`${BASE_ENDPOINT}/initiate`, ({ request }) => {
    const initiate = currentLoggedUser;
    if (!initiate) {
      return HttpResponse.json(
        { message: 'No se pudo crear el item' }, 
        { status: 500 });
    }
    return HttpResponse.text(initiate, { status: 200 });
  }),


  // POST: VALIDATE
  http.post(`${BASE_ENDPOINT}/validate`, ({ request }) => {

    const validate = request.token == currentLoggedUser;
    if (!validate) {
      return HttpResponse.json(
        { message: 'No se pudo crear el item' }, 
        { status: 500 });
    }
    return HttpResponse.json(null, { status: 200 });
  }),

];
import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { order_service } from '../services/order_service';
import { baseHandlers } from './baseHandler';

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.ORDER}`, order_service]


export const orderHandlers = [

  // POST: CREATE
  http.post(`${BASE_ENDPOINT}/me`, async ({ request }) => { 
      const body = await request.json()
      const newData = await SERVICE.create(body); 
      if (!newData) {
        return HttpResponse.json(
          { message: 'No se pudo crear el item' }, 
          { status: 400 }
        );
      }
      return HttpResponse.json( 
        { orderId:newData.id, failed: newData.failed}, 
        { status: 201 });
    }),

  // GET: PAGE
  http.get(`${BASE_ENDPOINT}/me/history`, ({ request }) => {
    const list = SERVICE.filterPageItem(request);
    if (!list) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(list);
  }),


  ...(baseHandlers(BASE_ENDPOINT, SERVICE)),

];
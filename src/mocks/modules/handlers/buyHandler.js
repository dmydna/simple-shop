import { http, HttpResponse } from 'msw';

import { buy_service } from '@/mocks/modules/services/buy_services';
import { BASE_URL, ENDPOINT } from "@utils/config.js";


const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.BUY}`, buy_service]


export const buyHandlers = [

  // POST: BUY/CONFIRM PAYMENT
  http.post(`${BASE_ENDPOINT}`, async ({ request }) => {
    const body = await request.json();
    console.log('[MOCK-API] Login:', body);

    if (SERVICE.confirmPayment(body)) {
      return new HttpResponse(null, { status: 200 });
    }

    return HttpResponse.json(
      { message: 'Error al confirma compra' },
      { status: 500 }
    );
  }),
 

];
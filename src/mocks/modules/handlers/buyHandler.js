import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { auth_service } from '../services/auth_service';
import { currentLoggedUser, setCurrentLoggedUser } from '../db';
import { buy_service } from '../services/buy_services';


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
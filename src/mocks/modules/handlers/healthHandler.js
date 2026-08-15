 import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { auth_service } from '../services/auth_service';



const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.HEALTH}`, auth_service]

export const healthHandlers = [

  http.get(`${BASE_ENDPOINT}`, async ({request}) => {

    return HttpResponse.json(
      { message: 'Server is running successfully' },
      { status: 200 }
    );
  }),

]
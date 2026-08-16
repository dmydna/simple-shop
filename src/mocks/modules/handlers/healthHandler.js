 import { http, HttpResponse } from 'msw';

import { auth_service } from '@/mocks/modules/services/auth_service';
import { BASE_URL, ENDPOINT } from "@utils/config.js";



const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.HEALTH}`, auth_service]

export const healthHandlers = [

  http.get(`${BASE_ENDPOINT}`, async ({request}) => {

    return HttpResponse.json(
      { message: 'Server is running successfully' },
      { status: 200 }
    );
  }),

]
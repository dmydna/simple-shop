import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINTS } from "@utils/config.js";
import { auth_service } from '../services/auth_services';


const ENDPOINT = ENDPOINTS.AUTH


export const authHandlers = [
  // POST /login
  http.post(`${BASE_URL}/${ENDPOINT}/login`, async ({ request }) => {
    const body = await request.json();
    console.log('[MOCK-API] Login:', body);

    if (auth_service.login(body)) {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          'Set-Cookie': 'authToken=mocked-jwt-token; Path=/; HttpOnly',
        },
      });
    }

    return HttpResponse.json(
      { message: 'Credenciales inválidas' },
      { status: 401 }
    );
  }),

  // POST /logout
  http.post(`${BASE_URL}/auth/logout`, () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
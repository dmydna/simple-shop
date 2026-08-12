 import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { auth_service } from '../services/auth_service';
import { currentLoggedUser } from '../db';


const BASE_ENDPOINT = `${BASE_URL}/${ENDPOINT.AUTH}`


export const authHandlers = [

  http.post(`${BASE_ENDPOINT}/login`, async ({ request }) => {
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

  http.get(`${BASE_ENDPOINT}/me`, () => {
    const auth = auth_service.getAuth();
    if (!currentLoggedUser || !auth) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    return HttpResponse.json(auth);
  }),

  http.post(`${BASE_ENDPOINT}/logout`, () => {
    localStorage.clear()
    return HttpResponse.json(
      { message: 'Logged out successfully' },
      {
        headers: {
          // Elimina la cookie 'session_id' estableciéndola a una fecha pasada
          'Set-Cookie': 'session_id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict',
        },
      }
    );
  }),


];
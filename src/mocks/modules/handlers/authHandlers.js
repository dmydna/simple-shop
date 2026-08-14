 import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { auth_service } from '../services/auth_service';
import { currentLoggedUser, setCurrentLoggedUser } from '../db';


const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.AUTH}`, auth_service]


export const authHandlers = [

  http.post(`${BASE_ENDPOINT}/login`, async ({ request }) => {
    const body = await request.json();
    console.log('[MOCK-API] Login:', body);

    if (SERVICE.login(body)) {
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
    const auth = SERVICE.getAuth();
    if (!currentLoggedUser || !auth) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    return HttpResponse.json(auth);
  }),

  http.post(`${BASE_ENDPOINT}/logout`, () => {
    localStorage.clear();
    setCurrentLoggedUser("")
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


  http.post(`${BASE_ENDPOINT}/change-email`, async ({ request }) => {
    const body = await request.json();

    if (SERVICE.changeUserEmail(body)) {
      return new HttpResponse(null, {
        status: 200
      });
    }

    return HttpResponse.json(
      { message: 'Credenciales inválidas' },
      { status: 401 }
    );
  }),


];
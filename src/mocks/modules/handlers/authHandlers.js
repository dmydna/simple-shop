import { http, HttpResponse } from 'msw';

import { currentLoggedUser, setCurrentLoggedUser } from '@/mocks/modules/db';
import { auth_service } from '@/mocks/modules/services/auth_service';
import { BASE_URL, ENDPOINT } from "@utils/config.js";


const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.AUTH}`, auth_service]

export const authHandlers = [

  // POST: LOGIN
  http.post(`${BASE_ENDPOINT}/login`, async ({ request }) => {
    const body = await request.json();
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


  // POST: GET AUTH
  http.get(`${BASE_ENDPOINT}/me`, () => {
    const auth = SERVICE.getAuth();
    if (!currentLoggedUser || !auth) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    return HttpResponse.json(auth);
  }),


  // POST: LOGOUT
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


  // POST: CHANGE-MAIL
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


  // TODO: (POST) CHANGE-PASSWORD

];
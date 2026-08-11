import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { currentLoggedUser, db } from '../db.js';
import { user_service } from '../services/user_service';

const BASE_ENDPOINT = `${BASE_URL}/${ENDPOINT.USER}`


export const userHandlers = [

  http.post(`${BASE_ENDPOINT}`, (user) => {
    const newUser = user_service.create(user);
    if (!newUser) {
      return HttpResponse.json({ message: 'No se pudo crear usuario' }, { status: 500 });
    }
    return HttpResponse.json(newUser);
  }),


  http.get(`${BASE_ENDPOINT}/me`, () => {
    const user = user_service.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    return HttpResponse.json(user);
  }),

  http.get(`${BASE_ENDPOINT}/:id`, ({ params }) => {
    const id = Number(params.id);
    const user = user_service.getById(id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),


  http.get(`${BASE_ENDPOINT}`, ({ request }) => {
    const users = user_service.filterPage(request);
    if (!users) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(users);
  }),

];
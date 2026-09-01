import { http, HttpResponse } from 'msw';

import { baseHandlers } from '@/mocks/modules/handlers/baseHandler.js';
import { review_service } from '@/mocks/modules/services/review_service.js';
import { BASE_URL, ENDPOINT } from "@utils/config.js";

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.REVIEWS}`, review_service]

export const reviewHandlers = [

  // GET: BY ID 
  http.get(`${BASE_ENDPOINT}/requests/:id`, ({ params }) => {
    const id = String(params.id);
    const base = SERVICE.getById(id);
    if (!base) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(base);
  }),

  // GET: PAGE 
  http.get(`${BASE_ENDPOINT}/requests`, ({ request }) => {
    const list = SERVICE.filterPage(request);
    if (!list) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(list);
  }),


  // PUT: UPDATE BY ID
  http.put(`${BASE_ENDPOINT}/:id`, async ({ params, request }) => {
    const id = params.id;
    let updates;
    try {
      updates = await request.json();
    } catch (error) {
      return HttpResponse.json(
        { error: 'Cuerpo de la petición inválido', details: error.message },
        { status: 400 }
      );
    }
    const existingElem = SERVICE.existsById(id);
    if (!existingElem) {
      return HttpResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      );
    }
    const updatedData = SERVICE.updateById(id, updates)


    return HttpResponse.json(updatedData, { status: 200 });
  }),


  ...(baseHandlers(BASE_ENDPOINT, SERVICE))

];
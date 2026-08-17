import { http, HttpResponse } from 'msw';

import { currentLoggedUser } from '@/mocks/modules/db.js';
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


   ...(baseHandlers(BASE_ENDPOINT, SERVICE))

];
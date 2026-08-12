import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { listing_service } from '../services/listing_service';
import { baseHandlers } from './baseHandler';

const BASE_ENDPOINT = `${BASE_URL}/${ENDPOINT.LISTING}`
const SERVICES = listing_service;

export const listingHandlers = [

  ...(baseHandlers(BASE_ENDPOINT, SERVICES)),
  

    http.get(`${BASE_ENDPOINT}/public/:id`, ({ params }) => {
    const id = Number(params.id);
    const user = SERVICES.getById(id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),
];
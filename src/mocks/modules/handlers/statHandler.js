import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { stats_service } from '@/mocks/modules/services/stats_service';

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.STATS}`, stats_service]


export const statsHandlers = [


  // ----- TOPS ENTITIES -----

  // Devuelve tops de entidades
  // SUGERENCIA: Los endpoints deberian reflejar la entidad
  // e.i: api/stats/listings/top/rated

  http.get(`${BASE_ENDPOINT}/top/rated`, async ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
    const response = await SERVICE.getTopRated(limit);
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),

  http.get(`${BASE_ENDPOINT}/top/onsale`, async ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
    const response = await SERVICE.getTopOnSales(limit);
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),

  http.get(`${BASE_ENDPOINT}/top/visits`, async ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
    const response = await SERVICE.getTopVisits(limit);
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),

  http.get(`${BASE_ENDPOINT}/top/tags`, async ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
    const response = await SERVICE.getPopularTags(limit);
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),


  // ----- FIELDS STATS -----

  // Devuelve objeto con estadisticas (conteos)
  // NOTA: Cuenta los distintos valores de un campo, que son finitos,
  // NO es necesario `limit`.
  // e.i : user.status -> ACTIVE(30) INACTIVE(12) DELETED(32) 
  // NOTA : Si el campos es una lista potencialmente infinita, es necesario limit
  // e.i : listing.tags -> graceries(5) electronic(6)

  // SUGERENCIA : el endpoint debe reflejar que son 
  // metricas o stats basadas en campos, no son tops
  // e.i : api/stats/listings/status
  // e.i : api/stats/listings/categories
  // e.i : api/stats/users/status

  http.get(`${BASE_ENDPOINT}/listings/:field`, async ({ params, request }) => {
    const field = String(params.field);
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
    const response = await SERVICE.getListingStats(field, limit);    
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),

  http.get(`${BASE_ENDPOINT}/users/:field`, async ({ params, request }) => {
    const field = String(params.field);
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
    const response = await SERVICE.getUserStats(field, limit);    
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),


  http.get(`${BASE_ENDPOINT}/products/:field`, async ({ params, request }) => {
    const field = String(params.field);
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
    const response = await SERVICE.getProductStats(field, limit);    
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),


  http.get(`${BASE_ENDPOINT}`, ({ request }) => {
    const response = SERVICE.getGeneralStats();
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),

];
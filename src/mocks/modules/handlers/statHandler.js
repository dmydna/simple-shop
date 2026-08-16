import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { stats_service } from '@/mocks/modules/services/stats_service';

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.STATS}`, stats_service]


export const statsHandlers = [

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

  http.get(`${BASE_ENDPOINT}/top/categories`, async  ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
    const response = await SERVICE.getTopCategories(limit);
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),

  http.get(`${BASE_ENDPOINT}/top/availability-status`,async  ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
    const response = await SERVICE.getTopAvailibilityStatus(limit);
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),


  http.get(`${BASE_ENDPOINT}/top/listing-status`, async ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit")
    const response = await SERVICE.getTopListingStatus(limit);
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),


  http.get(`${BASE_ENDPOINT}`, ({ request }) => {
    const response = SERVICE.getGeneralStats();
    if (!response) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(response);
  }),

];
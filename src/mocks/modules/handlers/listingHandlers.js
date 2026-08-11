import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
const BASE_ENDPOINT = ENDPOINT.LISTENING


export const listingHandlers = [

  // Ejemplo: Obtener listado de productos / listings
  http.get(`${BASE_URL}/${BASE_ENDPOINT}`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    return HttpResponse.json([
      {
        hash: 'f47ac10b-58cc-4372-a567-0e02b2c3d4e5',
        title: 'Producto de prueba MSW',
        price: 1500,
        category: category || 'General',
      },
    ]);
  }),


];
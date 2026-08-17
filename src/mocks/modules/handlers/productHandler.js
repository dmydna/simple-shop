import { baseHandlers } from '@/mocks/modules/handlers/baseHandler';
import { product_service } from '@/mocks/modules/services/product_service';
import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { http, HttpResponse } from 'msw';


const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.PRODUCT}`, product_service]


export const productHandlers = [

  ...(baseHandlers(BASE_ENDPOINT, SERVICE)),
  
  http.post(`${BASE_ENDPOINT}`, async ({request}) => {
    const body = await request.json()
    const newUser = SERVICE.create(body);
    if (!newUser) {
      return HttpResponse.json(
        { message: 'No se pudo crear el item' }, 
        { status: 500 });
    }
    return HttpResponse.json(newUser);
  }),
  
];
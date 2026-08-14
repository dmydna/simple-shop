import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { listing_service } from '../services/listing_service';
import { baseHandlers } from './baseHandler';
import { object } from 'zod';

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.LISTING}`, listing_service]


export const listingHandlers = [

  http.get(`${BASE_ENDPOINT}/public/:id`, ({ params }) => {
    const id = String(params.id);
    const data = SERVICE.getById(id);
    if (!data) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json({"listing":data});
  }),


  http.put(`${BASE_ENDPOINT}/:id`, async ({ params, request }) => {
    const {id} = params;
    const formData = await request.formData();
    const dataBlob = formData.get('data')
    const files = formData.get('files');

    // 1. Generar un ID único para este archivo
    const fileId = crypto.randomUUID();
    
    // 2. Crear una URL de objeto para el archivo recibido
    // Esto crea una URL como "blob:http://localhost:3000/uuid-..."

    const jsonString = await dataBlob.text();
    const data = JSON.parse(jsonString);

    const listObjectsUrl = []
    if(files){
      for(let f in files){
        const url = URL.createObjectURL(f)
        console.log(url)
        listObjectsUrl.push(url)
      }
    }

    const response = SERVICE.updateById(id, {...data, images: [ data.images, ...listObjectsUrl] })
    return HttpResponse.json(response, { status: 201 });
  }),


  ...(baseHandlers(BASE_ENDPOINT, SERVICE)),
];
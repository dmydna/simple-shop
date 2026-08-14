import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { currentLoggedUser, db } from '../db.js';
import { user_service } from '../services/user_service';
import { baseHandlers } from './baseHandler.js';

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.USER}`, user_service]

export const userHandlers = [


  http.get(`${BASE_ENDPOINT}/me`, () => {
    const user = SERVICE.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    return HttpResponse.json(user);
  }),



  http.put(`${BASE_ENDPOINT}/me`, async ({  request }) => {

    let updates;
    try {
      updates = await request.json();
    } catch (error) {
      return HttpResponse.json(
        { error: 'Cuerpo de la petición inválido', details: error.message },
        { status: 400 }
      );
    }

    const user = SERVICE.getMyProfile()

    if (!user) {
      return HttpResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      );
    }
    const updatedData = SERVICE.updateById(user.id, updates)
    return HttpResponse.json(updatedData, { status: 200 });
  }),



  http.put(`${BASE_ENDPOINT}/me/upload-image`, async ({ request }) => {

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return HttpResponse.json({ error: 'No file' }, { status: 400 });
    }

    // 1. Generar un ID único para este archivo
    const fileId = crypto.randomUUID();
    
    // 2. Crear una URL de objeto para el archivo recibido
    // Esto crea una URL como "blob:http://localhost:3000/uuid-..."
    const objectUrl = URL.createObjectURL(file);
    const response = SERVICE.updateProfileImage(objectUrl)

    return HttpResponse.json(response, { status: 201 });
  }),


  http.get(`${BASE_ENDPOINT}/:id`, ({ params }) => {
    const id = Number(params.id);
    const user = SERVICE.getById(id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),


  http.get(`${BASE_ENDPOINT}`, ({ request }) => {
    const users = SERVICE.filterPage(request);
    if (!users) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(users);
  }),


   ...(baseHandlers(BASE_ENDPOINT, SERVICE))

];
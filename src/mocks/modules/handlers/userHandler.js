import { http, HttpResponse } from 'msw';

import { currentLoggedUser } from '@/mocks/modules/db.js';
import { baseHandlers } from '@/mocks/modules/handlers/baseHandler.js';
import { user_service } from '@/mocks/modules/services/user_service.js';
import { BASE_URL, ENDPOINT } from "@utils/config.js";

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.USER}`, user_service]

export const userHandlers = [


  // GET(ME): getUser
  http.get(`${BASE_ENDPOINT}/me`, () => {
    const user = SERVICE.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    return HttpResponse.json(user);
  }),

// NEW_API_FEAT
  http.get(`${BASE_ENDPOINT}/me/summary`, () => {
    const user = SERVICE.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    return HttpResponse.json({ 
      role: user.role, 
      username: user.username, 
      image: user.image, 
    });
  }),


  // PUT(ME): updateUser
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



  // PUT(ME): uploadUserImage
  http.put(`${BASE_ENDPOINT}/me/upload-image`, async ({ request }) => {

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return HttpResponse.json({ error: 'No file' }, { status: 400 });
    }
    const fileId = crypto.randomUUID();
    const objectUrl = URL.createObjectURL(file);
    const response = SERVICE.updateProfileImage(objectUrl)

    return HttpResponse.json(response, { status: 201 });
  }),


  // PATCH: STATUS
  http.patch(`${BASE_ENDPOINT}/:id/ban-user`, async ({ params, request }) => {
    const { id } = params; 
    
    let updates;
    try {
      updates = await request.json();
    } catch (error) {
      return HttpResponse.json(
        { error: 'Cuerpo de la petición inválido', details: error.message },
        { status: 400 }
      );
    }

    const exists = SERVICE.existsById(id);

    if (!exists) {
      return HttpResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      );
    }

    const response = SERVICE.banUser(id, updates)

    return HttpResponse.json( null, { status: 200 });
  }),


http.patch(`${BASE_ENDPOINT}/:id/unban-user`, async ({ params }) => {
    const { id } = params; 
    const exists = SERVICE.existsById(id);

    if (!exists) {
      return HttpResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      );
    }

    const response = SERVICE.unbanUser(id)

    return HttpResponse.json( null, { status: 200 });
  }),


   ...(baseHandlers(BASE_ENDPOINT, SERVICE))

];
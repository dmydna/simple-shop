import { currentLoggedUser } from '@/mocks/modules/db';
import { user_service } from '@/mocks/modules/services/user_service';
import { http, HttpResponse } from 'msw';

export const baseLoggedHandlers = (BASE_ENDPOINT, SERVICE) => [

  // Metodos para usuarios autenticados
  // Nota: no usar en userHandlers

  // POST: CREATE 
  http.post(`${BASE_ENDPOINT}/me`, async ({request}) => {
    
    const user = user_service.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }

    const body = await request.json()
    const newData = SERVICE.create(body);
    if (!newData) {
      return HttpResponse.json(
        { message: 'No se pudo crear el item' }, 
        { status: 500 });
    }
    return HttpResponse.json(newData, { status: 201 });
  }),

  // GET: BY ID 
  http.get(`${BASE_ENDPOINT}/me/:id`, ({ params }) => {

    const user = user_service.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    const id = String(params.id);
    const base = SERVICE.getById(id);
    if (!base) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(base);
  }),

  // GET: PAGE 
  http.get(`${BASE_ENDPOINT}/me`, ({ request }) => {

    const user = user_service.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }

    const list = SERVICE.filterPage(request);
    if (!list) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(list);
  }),

  // PUT: UPDATE BY ID
  http.put(`${BASE_ENDPOINT}/me/:id`, async ({ params, request }) => {

    const user = user_service.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
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

    console.log(`Actualizando usuario ${id} con datos:`, updates);

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

  // PATCH: UPDATE BY ID
  http.patch(`${BASE_ENDPOINT}/me/:id`, async ({ params, request }) => {
    
    const user = user_service.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }

    const { id } = params; // El ID viene de la URL (ej: /api/bases/1)
    
    // 1. Extraer los datos del cuerpo de la petición
    let updates;
    try {
      updates = await request.json();
    } catch (error) {
      return HttpResponse.json(
        { error: 'Cuerpo de la petición inválido', details: error.message },
        { status: 400 }
      );
    }

    console.log(`Actualizando elemento ${id} con datos:`, updates);

    // 2. Buscar el usuario en la "base de datos"
    const exists = SERVICE.existsById(id);

    if (!exists) {
      return HttpResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      );
    }

    const updatedData = SERVICE.updateStatus(id, updates)

    return HttpResponse.json( {status: updatedData.meta.status }, { status: 200 });
  }),


];
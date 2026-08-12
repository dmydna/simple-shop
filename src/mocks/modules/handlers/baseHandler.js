import { http, HttpResponse } from 'msw';

export const baseHandlers = (BASE_ENDPOINT, SERVICES) => [

  // POST: CREATE
  http.post(`${BASE_ENDPOINT}`, (user) => {
    const newUser = SERVICES.create(user);
    if (!newUser) {
      return HttpResponse.json(
        { message: 'No se pudo crear el item' }, 
        { status: 500 });
    }
    return HttpResponse.json(newUser);
  }),

  // GET: BY ID 
  http.get(`${BASE_ENDPOINT}/:id`, ({ params }) => {
    const id = Number(params.id);
    const user = SERVICES.getById(id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),

  // GET: PAGE 
  http.get(`${BASE_ENDPOINT}`, ({ request }) => {
    const list = SERVICES.filterPage(request);
    if (!list) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(list);
  }),


  // PUT: UPDATE BY ID
  http.put(`${BASE_ENDPOINT}/:id`, async ({ params, request }) => {
    const { id } = params; // El ID viene de la URL (ej: /api/users/1)
    
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

    console.log(`Actualizando usuario ${id} con datos:`, updates);

    // 2. Buscar el usuario en la "base de datos"
    const itemIndex = SERVICES.getIndexDB(id);

    if (itemIndex === -1) {
      return HttpResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // 3. Realizar la actualización (Merge parcial)
    // Creamos una copia del usuario existente y le aplicamos los cambios

    const updatedData = SERVICES.updateById(id, updates)

    // 5. Devolver la respuesta con el usuario actualizado (status 200 o 204)
    // Spring Boot suele devolver 200 OK con el cuerpo actualizado
    return HttpResponse.json(updatedData, { status: 200 });
  }),



];
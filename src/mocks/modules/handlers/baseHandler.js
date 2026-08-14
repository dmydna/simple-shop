import { http, HttpResponse } from 'msw';

export const baseHandlers = (BASE_ENDPOINT, SERVICE) => [

  // POST: CREATE
  http.post(`${BASE_ENDPOINT}`, (user) => {
    const newUser = SERVICE.create(user);
    if (!newUser) {
      return HttpResponse.json(
        { message: 'No se pudo crear el item' }, 
        { status: 500 });
    }
    return HttpResponse.json(newUser);
  }),

  // GET: BY ID 
  http.get(`${BASE_ENDPOINT}/:id`, ({ params }) => {
    const id = String(params.id);
    const user = SERVICE.getById(id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),

  // GET: PAGE 
  http.get(`${BASE_ENDPOINT}`, ({ request }) => {
    const list = SERVICE.filterPage(request);
    if (!list) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(list);
  }),


  // POST: UPLOAD
  http.post(`${BASE_ENDPOINT}/upload`, async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return HttpResponse.json({ mensague: 'No file' }, { status: 400 });
    }

    // 1. Generar un ID único para este archivo
    const fileId = crypto.randomUUID();
    
    // 2. Crear una URL de objeto para el archivo recibido
    // Esto crea una URL como "blob:http://localhost:3000/uuid-..."
    const objectUrl = URL.createObjectURL(file);

    return HttpResponse.json({
      id: fileId,
      name: file.name,
      url: objectUrl, // Devolvemos la URL al frontend
      message: 'Archivo subido exitosamente'
    }, { status: 201 });
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
    const existingElem = SERVICE.existsById(id);

    if (!existingElem) {
      return HttpResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      );
    }

    // 3. Realizar la actualización (Merge parcial)
    // Creamos una copia del usuario existente y le aplicamos los cambios

    const updatedData = SERVICE.updateById(id, updates)

    // 5. Devolver la respuesta con el usuario actualizado (status 200 o 204)
    // Spring Boot suele devolver 200 OK con el cuerpo actualizado
    return HttpResponse.json(updatedData, { status: 200 });
  }),


    // PATCH: STATUS
  http.patch(`${BASE_ENDPOINT}/:id/status`, async ({ params, request }) => {
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

    return HttpResponse.json(updatedData, { status: 200 });
  }),


];
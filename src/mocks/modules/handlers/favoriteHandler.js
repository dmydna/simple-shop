import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { favorite_service } from '../services/favorite_service';
import { baseHandlers } from './baseHandler';
import { user_service } from '../services/user_service';
import { currentLoggedUser } from '../db';

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.FAVORITE}`, favorite_service]


export const favoriteHandlers = [

  ...(baseHandlers(BASE_ENDPOINT, SERVICE)),
  
  // POST: CREATE
  http.post(`${BASE_ENDPOINT}/:id`, ({ params }) => {
    const user = user_service.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    const listingId = String(params.id);
    const newFavorite = favorite_service.create(listingId, user.id)
    return HttpResponse.json(newFavorite);
  }),

  // GET: EXISTS BY ID
  http.get(`${BASE_ENDPOINT}/:id/check`, ({ params }) => {
    const id = String(params.id);
    const user = SERVICE.existsById(id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),

];
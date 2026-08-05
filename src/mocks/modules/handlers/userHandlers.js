import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINTS } from "@utils/config.js";
import { currentLoggedUser, DB } from '../DB';
const ENDPOINT = ENDPOINTS.AUTH


export const userHandlers = [
  // POST /login
  http.get(`${BASE_URL}/${ENDPOINTS.USER}/me`, () => {
    console.log("[MOCK-API] Fetching current user");

    if (!currentLoggedUser || !DB.user[currentLoggedUser]) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    const user = DB.user[currentLoggedUser];
    return HttpResponse.json(user);
  }),

  http.get(`${BASE_URL}/${ENDPOINTS.PROFILE}/my`, () => {
    console.log("[MOCK-API] Fetching current user", currentLoggedUser);
    if (!currentLoggedUser || !DB.user[currentLoggedUser]) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    const user = DB.user[currentLoggedUser];
    return HttpResponse.json(user);
  }),


];
import { http, HttpResponse } from 'msw';
import { userHandlers } from './modules/handlers/userHandlers';
import { authHandlers } from './modules/handlers/authHandlers';
import { listingHandlers } from './modules/handlers/listingHandlers';
import { productHandlers } from './modules/handlers/productHandler';
import { favoriteHandlers } from './modules/handlers/favoriteHandler';


// Ajusta la base URL si tus servicios apuntan a un dominio o puerto específico

export const handlers = [
  // Ejemplo: Mock para Login (manejo de cookies/tokens)
  ...userHandlers,
  ...authHandlers,
  ...listingHandlers,
  ...favoriteHandlers,
  ...productHandlers
];
import { http, HttpResponse } from 'msw';
import { userHandlers } from './modules/handlers/userHandlers';
import { authHandlers } from './modules/handlers/authHandlers';


// Ajusta la base URL si tus servicios apuntan a un dominio o puerto específico

export const handlers = [
  // Ejemplo: Mock para Login (manejo de cookies/tokens)
  ...userHandlers,
  ...authHandlers,
  
];
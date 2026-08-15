import { http, HttpResponse } from 'msw';
import { userHandlers } from './modules/handlers/userHandler';
import { authHandlers } from './modules/handlers/authHandlers';
import { listingHandlers } from './modules/handlers/listingHandlers';
import { productHandlers } from './modules/handlers/productHandler';
import { favoriteHandlers } from './modules/handlers/favoriteHandler';
import { healthHandlers } from './modules/handlers/healthHandler';
import { orderHandlers } from './modules/handlers/orderHandler';
import { buyHandlers } from './modules/handlers/buyHandler';
import { gatewayHandlers } from './modules/handlers/gatewayHandler';
import { statsHandlers } from './modules/handlers/statHandler';


export const handlers = [
  ...userHandlers,
  ...authHandlers,
  ...listingHandlers,
  ...favoriteHandlers,
  ...productHandlers,
  ...healthHandlers,
  ...orderHandlers,
  ...buyHandlers,
  ...gatewayHandlers,
  ...statsHandlers
];
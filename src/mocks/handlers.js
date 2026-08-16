import { http, HttpResponse } from 'msw';
import { userHandlers } from '@/mocks/modules/handlers/userHandler';
import { authHandlers } from '@/mocks/modules/handlers/authHandlers';
import { listingHandlers } from '@/mocks/modules/handlers/listingHandlers';
import { productHandlers } from '@/mocks/modules/handlers/productHandler';
import { favoriteHandlers } from '@/mocks/modules/handlers/favoriteHandler';
import { healthHandlers } from '@/mocks/modules/handlers/healthHandler';
import { orderHandlers } from '@/mocks/modules/handlers/orderHandler';
import { buyHandlers } from '@/mocks/modules/handlers/buyHandler';
import { gatewayHandlers } from '@/mocks/modules/handlers/gatewayHandler';
import { statsHandlers } from '@/mocks/modules/handlers/statHandler';


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
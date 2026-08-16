import { baseService } from '@/mocks/modules/services/baseService.js';

const collection = 'listings';

export const listing_service = {

    ...(baseService(collection)),

}
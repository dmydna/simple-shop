import { baseService } from '@/mocks/modules/services/baseService.js';


const collection = 'reviews';

export const review_service = {

    ...(baseService(collection))

}
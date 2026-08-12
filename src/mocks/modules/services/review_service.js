import { db } from '../DB.js';
import { baseService } from './baseService.js';


const collection = 'reviews';

export const review_service = {

    ...(baseService(collection))

}
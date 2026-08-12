import { db } from '../db.js';
import { baseService } from './baseService.js';


const collection = 'products';

export const product_service = {

    ...(baseService(collection))

}
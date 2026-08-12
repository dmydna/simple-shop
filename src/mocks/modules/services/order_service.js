import { db } from '../db.js';
import { baseService } from './baseService.js';


const collection = 'orders';

export const order_service = {

    ...(baseService(collection))

}
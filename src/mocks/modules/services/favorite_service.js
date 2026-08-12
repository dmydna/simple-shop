import { db } from '../db.js';
import { baseService } from './baseService.js';


const collection = 'favorites';

export const favorite_service = {

    ...(baseService(collection))

}
import { http, HttpResponse } from 'msw';
import { db } from '../db.js';
import { baseService } from './baseService.js';

const collection = 'listings';

export const listing_service = {

    ...(baseService(collection)),

}
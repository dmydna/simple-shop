import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { favorite_service } from '../services/favorite_service';
import { baseHandlers } from './baseHandler';

const BASE_ENDPOINT = `${BASE_URL}/${ENDPOINT.FAVORITE}`
const SERVICES = favorite_service;

export const favoriteHandlers = [

  ...(baseHandlers(BASE_ENDPOINT, SERVICES)),
  
];
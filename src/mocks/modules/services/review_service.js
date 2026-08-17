import { baseService } from '@/mocks/modules/services/baseService.js';
import { db } from '@/mocks/modules/db.js';


const collection = 'reviews';

export const review_service = {


    ...(baseService(collection)),

    getById: (id) => {
        console.log(id)
        return db.find(collection, item => item.id == id);
    },

}
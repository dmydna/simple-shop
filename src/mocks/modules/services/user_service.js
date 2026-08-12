import { db, currentLoggedUser } from '../db.js';
import { baseService } from './baseService.js';


const collection = 'users';

export const user_service = {

    ...(baseService(collection)),

    getMyProfile: () => {
        return  db.find(collection, item => item.username === currentLoggedUser);
    },

    updateMyProfile: (update) => {
        const user = this.getMyProfile();
        return db.update(collection, user.id, update) 
    },

    updateProfile: (id, update) => {
        return db.update(collection, id, update) 
    }


}
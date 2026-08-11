import { db, currentLoggedUser } from '../db.js';


const collection = 'users';

export const user_service = {

    create: (data) => {
        return db.create(collection, data)
    },

    getById: (id) => {
        return db.find(collection, item => item.username === id);
    },


    filterPage: (request) => {
        return db.findPage(collection,request);
    },

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
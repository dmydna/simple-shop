import { db } from '../db.js';


const collection = 'favorites';

export const favorite_service = {

    create: (data) => {
        return db.save(collection, data)
    },

    getById: (id) => {
        return db.find(collection, item => item.id === id);
    },

    updateById: (id, update) => {
        return db.update(collection, id, update) 
    },

    deleteById:(id) => {
        return db._delete(collection, id)
    }

}
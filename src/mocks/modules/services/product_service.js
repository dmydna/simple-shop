import { db } from '../db.js';


const collection = 'products';

export const product_service = {

    create: (data) => {
        return db.save(collection, data)
    },

    getById: (id) => {
        return db.find(collection, i => i.id === id);
    },

    updateById: (id, update) => {
        return db.update(collection, id, update) 
    },

    deleteById:(id) => {
        return db._delete(collection, id)
    }

}
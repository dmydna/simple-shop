import { db, currentLoggedUser } from '../db.js';


export const baseService =  (collection) => ({

    create: (data) => {
        return db.create(collection, data)
    },

    getById: (id) => {
        return db.find(collection, item => item.id === id);
    },

    getIndexDB: (id) => {
        return db.getIndex(collection, id);
    }
    ,
    filterPage: (request) => {
        return db.findPage(collection,request);
    },

    updateById: (id, update) => {
        const data = this.getById(id);
        return db.update(collection, data.id, update); 
    },

    deleteById:(id) => {
        console.log(db[collection])
        return db._delete(collection, id)
    }

})
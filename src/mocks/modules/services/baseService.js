import { db, currentLoggedUser } from '@/mocks/modules/db.js';


export const baseService =  (collection) => ({

    create: (data) => {
        return db.save(collection, data)
    },

    getById: (id) => {
        return db.find(collection, item => item.id == id);
    },

    getIndexDB: (id) => {
        return db.getIndex(collection, id);
    }
    ,
    filterPage: (request) => {
        return db.findPage(collection,request);
    },

    updateById: (id, update) => {
        return db.update(
            collection, 
            item => item.id == id , 
            item => ({ ...item, ...update }) 
        ); 
    },

    updateStatus: (id, { status }) => {
        return db.update(
            collection, 
            item => item.id == id , 
            item => ({ ...item, meta: {...item.meta, "status": status} }) 
        ); 
    },

    deleteById:(id) => {
        console.log(db[collection])
        return db._delete(collection, id)
    },

    existsById: (id) => {
        return db.exists(collection, i => i.id === id)
    },

})
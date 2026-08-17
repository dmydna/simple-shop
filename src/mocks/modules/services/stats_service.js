import { db } from '@/mocks/modules/db.js';
import { baseService } from '@/mocks/modules/services/baseService.js';
import { listCountByField } from '@/mocks/modules/utils';

const collection = 'stats';

export const stats_service = {



    getTopSales: (limit) => {
        return db["orders"].numeros.sort((a, b) => b.quantity - a.quantity)
           .slice(0, limit)
           .map(o => db.find("listings", l => l.id == o.listingId) ) 
    },    

    getTopRated: (limit) => {
        return db["listings"].sort((a, b) => b.rating - a.rating)
           .slice(0, limit)
    },    

    getTopOnSales: (limit) => {
        return db["listings"].sort((a, b) => b.discountPercentage - a.discountPercentage)
           .slice(0, limit)
    },   


    getTopVisits: (limit) => {
        return db["listings"].sort((a, b) => a.id.localeCompare(b.id))
           .slice(0, limit)
    },


    getUserStats: async (field, limit) => {
        return await listCountByField("users", field, limit)
    },

    getProductStats: async (field, limit) => {
        return await listCountByField("products", field, limit)
    },

    getListingStats: async (field, limit) => {
        return await listCountByField("listings", field, limit)
    },


    getGeneralStats(){

        return {
            totalListings: db["listings"].length,
            totalListingValue:0,
            totalSales: this.countByStatus("orders", "paid"),
            orders: {
               paid: this.countByStatus("orders", "paid"), 
               pending: this.countByStatus("orders", "pending"), 
               total: db["orders"].length   
            },
            users: {
                active: this.countByStatus("users", "active"), 
                banned: this.countByStatus("users", "banned"), 
                total: db["users"].length
            },
            reviews: {
                active: 0, 
                pending: this.countByStatus("reviews", "pending"), 
                total: db["reviews"].length
            },
            products: {
                draft: 0, 
                active: this.countByStatus("products", "active"), 
                total: db["products"].length
            } 

        }

    },
    
    countByStatus(collection, status){
        return db[collection].filter(i => i.status == status.toUpperCase()).length
    },

    ...(baseService(collection)),


}
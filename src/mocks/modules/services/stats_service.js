import { http, HttpResponse } from 'msw';
import { db } from '../db.js';
import { baseService } from './baseService.js';
import { listCountSubfield, listCountSublist } from '../utils.js';

const collection = 'stats';

export const stats_service = {

    ...(baseService(collection)),

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


    getGeneralStats: () => {

        return {
            totalListings: db["listings"].length,
            totalListingValue:0,
            totalSales:0,
            orders: {
               paid: 0, pending: 0, total: db["orders"].length   
            },
            users: {
                active: 0, banned: 0, total: db["users"].length
            },
            reviews: {
                active: 0, pending: 0, total: 99
            },
            products: {
                draft: 0, active: 0, total: db["listings"].length
            } 

        }
    },

    getPopularTags: async(limit) => {
        return await listCountSublist("listings.tags", limit)
    },

    getTopCategories: async(limit) => {
        return await listCountSubfield("listings.category", limit)
    },

    getTopAvailibilityStatus: async(limit) => {
        return await listCountSubfield("listings.availabilityStatus", limit)
    },

    getTopListingStatus: async(limit) => {
        return await listCountSubfield("listings.meta.status", limit)
    }


}
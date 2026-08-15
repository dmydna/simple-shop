
import { db } from '../db.js';
import { auth_service } from './auth_service.js';
import { baseService } from './baseService.js';
import { order_service } from './order_service.js';
import { review_service } from './review_service.js';
import { user_service } from './user_service.js';


const collection = 'buy';

export const buy_service = {

    ...(baseService(collection)),


    confirmPayment: (data) => {

        const user = user_service.getMyProfile()
        const order = order_service.getById(data.orderId)

        if(!user) return false
        if(!order) return false
        // TODO:
        // order.items.forEach( item =>  review_service.create(item, user.id) )

        order.status = "PAID"
        db.update('orders', o => o.id == order.id , o => order )

        return true
    },

}

import { db } from '@/mocks/modules/db.js';
import { baseService } from '@/mocks/modules/services/baseService.js';
import { user_service } from '@/mocks/modules/services/user_service.js';
import { order_service } from '@/mocks/modules/services/order_service.js';


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
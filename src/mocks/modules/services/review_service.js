import { baseService } from '@/mocks/modules/services/baseService.js';
import { db } from '@/mocks/modules/db.js';
import { order_service } from '@/mocks/modules/services/order_service';


const collection = 'reviews';

export const review_service = {


    ...(baseService(collection)),

    getById: (id) => {
        console.log(id)
        return db.find(collection, item => item.id == id);
    },

    updateById: (id, update) => {

        const review = db.find(collection, r => r.id == id) ;
        const orderItem = db.find("orders_items", o => o.id == review.orderItemId);

        orderItem.rating = update.rating;

        order_service.updateOrderItem(orderItem)

        return db.update(
            collection, 
            item => item.id == id , 
            item => ({ ...item, ...update }) 
        ); 
    },

}
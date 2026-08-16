import { baseService } from '@/mocks/modules/services/baseService.js';
import { currentLoggedUser, db } from '@/mocks/modules/db.js';


const collection = 'users';

export const user_service = {

    ...(baseService(collection)),

    getMyProfile: () => {
        return  db.find(collection, item => item.username === currentLoggedUser);
    },

    updateMyProfile: (update) => {
        const user = this.getMyProfile();
        return db.update(collection, user.id, update) 
    },

    updateProfile: (id, update) => {
        return db.update(collection, id, update) 
    },

    updateProfileImage: (url) => {
        return db.update(collection, item => item.username === currentLoggedUser, u => ({...u, image: url}) )   
    },

    changeEmail: (username, password, newEmail) => {
        const user = db.find(collection,  u => u.username == username)
        if(user){
            if(user.password == password){
                return db.update(collection, u => u.username == username, u => ({...u, email: newEmail}))
            }
            return null;
        } 
        return null;
     },

}
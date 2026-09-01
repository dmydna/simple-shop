import { baseService } from '@/mocks/modules/services/baseService.js';
import { currentLoggedUser, db } from '@/mocks/modules/db.js';


const collection = 'users';

export const user_service = {

    ...(baseService(collection)),

    create: (data) => {
        return db.save(collection, data)
    },

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

    banUser: (id, request) =>{
        const user = user_service.getById(id);
        if(!user) throw new Error("Usuario no encontrado");
        user.banExpiresAt = request.banExpiresAt;
        user.meta.status = "BANNED"
        user.banReason = request.banReason;
        return db.save(collection, user)  
    },
 
    unbanUser: (id) =>{
        const user = user_service.getById(id);
        if(!user) throw new Error("Usuario no encontrado");
        user.status.meta = "ACTIVE";
        user.banExpiresAt = null;
        return db.save(collection, user)  
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


    changePassword: (username, oldPassword, newPassword) => {
        const user = db.find(collection,  u => u.username == username)
        if(user){
            if(user.password == oldPassword){
                return db.update(collection, u => u.username == username, u => ({...u, password: newPassword}))
            }
            return null;
        } 
        return null;
     },



}
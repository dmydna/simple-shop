import { baseService } from '@/mocks/modules/services/baseService.js';
import { user_service } from '@/mocks/modules/services/user_service.js';
import { currentLoggedUser, db, setCurrentLoggedUser } from '@/mocks/modules/db.js';
import { isValidEmail } from '@/mocks/modules/utils';

const COLLECTION = 'users'

export const auth_service = {
		
	 ...baseService(COLLECTION),

	 register : (request) => {
	 	const user = user_service.create(request);
	 	if(user){ 
	 		setCurrentLoggedUser(user.username)
	 		return true;
	 	}
	 	return false;
	 },

	 login : (request) => {
	 	let user = null;
	 	if(isValidEmail(request.username)){
	 		user = db.find(COLLECTION, u => u.email === request.username);
	 	}else{
	 		user = db.find(COLLECTION, u => u.username === request.username);
	 	}

	 	if(user && user.password == request.password){ 
	 		setCurrentLoggedUser(user.username)
	 		return true;
	 	}
	 	return false;
	 },

	 getAuth: ()=>{
	 	if(!currentLoggedUser){return null}
	 	const {username, role} = db.find(COLLECTION, u => u.username === currentLoggedUser);
	 	return { username, role, expireAt: Date.now() + 3600 * 24 }
	 },

	 isAuthUserAdmin: () => {
	 	if(!currentLoggedUser || currentLoggedUser.role !== 'ADMIN'){ return false }
	 	return true
	 },

	 changeUserPassword: (request) => {
	 	const username = currentLoggedUser 
	 	return user_service.changePassword(username, request.oldPassword, request.newPassword)
	 },


	 changeUserEmail: (request) => {
	 	return user_service.changeEmail(currentLoggedUser, request.password, request.newEmail)
	 },


}


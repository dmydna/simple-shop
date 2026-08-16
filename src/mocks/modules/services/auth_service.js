import { baseService } from '@/mocks/modules/services/baseService.js';
import { user_service } from '@/mocks/modules/services/user_service.js';
import { currentLoggedUser, db, setCurrentLoggedUser } from '@/mocks/modules/db.js';

const COLLECTION = 'users'

export const auth_service = {
		
	 ...baseService(COLLECTION),

	 login : (request) => {
	 	const user = db.find(COLLECTION, u => u.username === request.username);
	 	console.info("[MOCK API / auth_service]:" ,user)
	 	if(user && user.password == request.password){ 
	 		setCurrentLoggedUser(request.username)
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

	 ChangePasswordByUserMail: (username, request) => {
	 	user_service.ChangePassword(username, request.oldPassword, request.newPassword)
	 },


	 changeUserEmail: (request) => {
	 	return user_service.changeEmail(currentLoggedUser, request.password, request.newEmail)
	 },





}
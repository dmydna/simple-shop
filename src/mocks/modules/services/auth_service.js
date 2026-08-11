import ChangePassword from '@/pages/ChangePassword.jsx';
import { currentLoggedUser, db, setCurrentLoggedUser } from '../db.js';
import { user_service } from './user_service.js';
import { role } from '@/utils/enums.js';

export const auth_service = {
		
	 login : (request) => {
	 	const user = db.find('users', u => u.username === request.username);
	 	console.info("[MOCK API / auth_service]:" ,user)
	 	if(user && user.password == request.password){
			setCurrentLoggedUser(request.username)
	 		return true;
	 	}
	 	return false;
	 },

	 getAuth: ()=>{
	 	if(!currentLoggedUser){
	 		return null
	 	}
	 	const {username, role} = db.find('users', u => u.username === currentLoggedUser);


	 	return { username, role, expireAt: Date.now() + 3600 * 24 }
	 },

	 isAuthUserAdmin: () => {
	 	if(!currentLoggedUser || currentLoggedUser.role !== 'ADMIN'){
	 		return false
	 	}
	 	return true
	 },

	 ChangePasswordByUserMail: (username, request) => {
	 	user_service.ChangePassword(username, request.oldPassword, request.newPassword)
	 },


	 changeUserEmail: (username, request) => {
	 	user_service.changeMail(username, request.password, request.newEmail)
	 }

	 


}
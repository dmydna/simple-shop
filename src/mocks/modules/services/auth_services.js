import { DB, setCurrentLoggedUser } from '../DB.js';

export const auth_service = {
		
	 login : (request) => {
	 	const user = DB.user[request.username];
		console.log("DB user", user)
	 	if(user && user.password == request.password){
			setCurrentLoggedUser(request.username)
	 		return true;
	 	}
	 	return false;
	 }


}
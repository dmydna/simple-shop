import { DB, currentLoggedUser } from '../DB.js';


export const user_service = {
    "api/users/me" : () => {
        if(!username){ return null }
        return DB.user[currentLoggedUser];
     }
}
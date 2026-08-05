
const DEFAULT_PASSWORD = '1234'
const DEFAULT_USER = {
	image: '/user-default.png',
    firstName: 'user',
	lastName: 'default',
	address: 'st.1234',
	phone: '9011-1011',
    password: DEFAULT_PASSWORD,
    role: 'CLIENT',
    email: 'user@example.com'
}

const userAdmin = {
	...DEFAULT_USER,
    username: 'admin',
    role: 'ADMIN',
    email: 'admin@example.com'
}

// Variable en memoria para simular el usuario logueado actualmente en el mock
export let currentLoggedUser = 'admin'; 

export const setCurrentLoggedUser = (username) => {
  currentLoggedUser = username;
};

export const DB = {
	"user":    {  "admin": userAdmin },
	"listing": { },
	"favorites": {},
	"orders": {},
}
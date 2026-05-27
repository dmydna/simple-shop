import { authService } from "../../features/auth/services/authService.js";
import { handleBulk, ImgGenApi } from "../imageJS.js";


const baseImg = {
    "icon": "bi-person",
    "dimension": "150x150", 
    "fontSize": "70",
    "textColor": "fff",
    "background": ".menta",
}

export const userDataList = [
    {
        "username": "john_doe",
        "password": "SecurePass123!",       
        "image":   ImgGenApi({...baseImg}) ,
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "phone": "+1234567890",
        "address": "123 Main St, New York, NY 10001"
    },
    {
        "username": "jane_smith",
        "password": "SecurePass456!",
        "email": "jane@example.com",
        "image":  ImgGenApi({...baseImg, "background":".melon"}),
        "firstName": "Jane",
        "lastName": "Smith",
        "phone": "+0987654321",
        "address": "456 Oak Ave, Los Angeles, CA 90001"
    },
    {
        "username": "carlos_lopez",
        "password": "SecurePass789!",
        "email": "carlos@example.com",
        "image":  ImgGenApi({...baseImg, "background":".limon"}),
        "firstName": "Carlos",
        "lastName": "López",
        "phone": "+5555555555",
        "address": "789 Pine Rd, Madrid, Spain"
    },
    {
        "username": "user001",
        "password": "Pass123!user001",
        "email": "user001@example.com",
        "image":  ImgGenApi({...baseImg, "background":".plain"}),
        "firstName": "Alice",
        "lastName": "Johnson",
        "phone": "+12025550101",
        "address": "101 Elm St, Washington, DC 20001"
    },
    {
        "username": "user002",
        "password": "Pass123!user002",
        "email": "user002@example.com",
        "image":  ImgGenApi({...baseImg, "background":".rosa"}),
        "firstName": "Bob",
        "lastName": "Smith",
        "phone": "+12025550102",
        "address": "202 Oak Ave, Washington, DC 20002"
    },
    {
        "username": "user003",
        "password": "Pass123!user003",
        "email": "user003@example.com",
        "image":  ImgGenApi({...baseImg, "background":".manteca"}),
        "firstName": "Carol",
        "lastName": "Williams",
        "phone": "+12025550103",
        "address": "303 Pine Rd, Washington, DC 20003"
    },
    {
        "username": "user004",
        "password": "Pass123!user004",
        "email": "user004@example.com",
        "image":  ImgGenApi({...baseImg, "background":".rosa"}),
        "firstName": "David",
        "lastName": "Brown",
        "phone": "+12025550104",
        "address": "404 Maple Dr, Washington, DC 20004"
    },
    {
        "username": "user005",
        "password": "Pass123!user005",
        "image":  ImgGenApi({...baseImg, "background":".melon"}),
        "email": "user005@example.com",
        "firstName": "Eve",
        "lastName": "Jones",
        "phone": "+12025550105",
        "address": "505 Cedar Ln, Washington, DC 20005"
    },
    {
        "username": "user006",
        "password": "Pass123!user006",
        "image":  ImgGenApi({...baseImg, "background":".durazno"}),
        "email": "user006@example.com",
        "firstName": "Frank",
        "lastName": "Garcia",
        "phone": "+12025550106",
        "address": "606 Birch St, Washington, DC 20006"
    },
    {
        "username": "user001a",
        "password": "Pass123!user001",
        "image":  ImgGenApi({...baseImg, "background":".coral"}),
        "email": "user001@example.com",
        "firstName": "Alice",
        "lastName": "Johnson",
        "phone": "+12025550101",
        "address": "101 Elm St, Washington, DC 20001"
    },
    {
        "username": "user002b",
        "image":  ImgGenApi({...baseImg, "background":".malva"}),
        "password": "Pass123!user002",
        "email": "user002@example.com",
        "firstName": "Bob",
        "lastName": "Smith",
        "phone": "+12025550102",
        "address": "202 Oak Ave, Washington, DC 20002"
    },
    {
        "username": "user003c",
        "password": "Pass123!user003",
        "image":  ImgGenApi({...baseImg, "background":".malva"}),
        "email": "user003@example.com",
        "firstName": "Carol",
        "lastName": "Williams",
        "phone": "+12025550103",
        "address": "303 Pine Rd, Washington, DC 20003"
    },
    {
        "username": "user004d",
        "password": "Pass123!user004",
        "image":  ImgGenApi({...baseImg, "background":".aqua"}),
        "email": "user004@example.com",
        "firstName": "David",
        "lastName": "Brown",
        "phone": "+12025550104",
        "address": "404 Maple Dr, Washington, DC 20004"
    },
    {
        "username": "user005e",
        "password": "Pass123!user005",
        "image":  ImgGenApi({...baseImg }),
        "email": "user005@example.com",
        "firstName": "Eve",
        "lastName": "Jones",
        "phone": "+12025550105",
        "address": "505 Cedar Ln, Washington, DC 20005"
    },
    {
        "username": "user006f",
        "password": "Pass123!user006",
        "image":  ImgGenApi({...baseImg, "background":".limon"}),
        "email": "user006@example.com",
        "firstName": "Frank",
        "lastName": "Garcia",
        "phone": "+12025550106",
        "address": "606 Birch St, Washington, DC 20006"
    },
    {
        "username": "user007g",
        "password": "Pass123!user007",
        "image":  ImgGenApi({...baseImg}),
        "email": "user007@example.com",
        "firstName": "Grace",
        "lastName": "Martinez",
        "phone": "+12025550107",
        "address": "707 Spruce Ave, Washington, DC 20007"
    },
    {
        "username": "user008h",
        "password": "Pass123!user008",
        "image":  ImgGenApi({...baseImg, "background":".rosa"}),
        "email": "user008@example.com",
        "firstName": "Henry",
        "lastName": "Lopez",
        "phone": "+12025550108",
        "address": "808 Fir Rd, Washington, DC 20008"
    },
    {
        "username": "user009i",
        "password": "Pass123!user009",
        "image":  ImgGenApi({...baseImg, "background":".celeste"}),
        "email": "user009@example.com",
        "firstName": "Ivy",
        "lastName": "Hernandez",
        "phone": "+12025550109",
        "address": "909 Ash St, Washington, DC 20009"
    },
    {
        "username": "user010j",
        "password": "Pass123!user010",
        "image":  ImgGenApi({...baseImg}),
        "email": "user010@example.com",
        "firstName": "Jack",
        "lastName": "Gonzalez",
        "phone": "+12025550110",
        "address": "1010 Willow Dr, Washington, DC 20010"
    }
];

export const  userSaveAll = async() => 
    await  handleBulk(authService, userDataList);

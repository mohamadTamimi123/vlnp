
import express from "express";
import {userLogin} from "./controller.js";





const authRo = express.Router();

authRo.post('/login', userLogin)




export { authRo }



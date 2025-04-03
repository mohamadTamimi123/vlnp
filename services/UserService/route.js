
import express from "express";
import {userLogin} from "./controller.js";




const route = express.Router();

route.post('/auth/login', userLogin)



export { route }



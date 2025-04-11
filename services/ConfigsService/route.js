
import express from "express";
import {createNewConfig} from "./controller.js";
import jwt from "jsonwebtoken";
import {Admin} from "../../models.js";



const configs = express.Router();



const getConfigList = () => {

}


configs.post('/new-config' ,  createNewConfig)
configs.get('/list' ,  getConfigList)







export { configs }



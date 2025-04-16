import express from "express";

import jwt from "jsonwebtoken";
import {Admin, Config, User, Wallet} from "../../models.js";
import axios from "axios";
import {tamdidConfig} from "./tamdidController.js";
import {createNewConfigFromPlans} from "./newConfigPlanMood.js";

import {getConfigByEmail, getConfigList} from "./getConfigByEmail.js";
import {deleteConfig} from "./deleteConfig.js";



const configs = express.Router();





configs.post('/tamdid-config' ,  tamdidConfig)
// configs.post('/new-config' ,  createNewConfig)
configs.post('/new-config/plan-mood' ,  createNewConfigFromPlans)
configs.get('/list' ,  getConfigList)


configs.post('/get' , getConfigByEmail)
configs.delete('/delete' , deleteConfig)









export { configs }



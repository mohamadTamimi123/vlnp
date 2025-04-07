
import express from "express";
import {createNewConfig} from "./controller.js";



const configs = express.Router();

configs.post('/new-config', createNewConfig)



export { configs }



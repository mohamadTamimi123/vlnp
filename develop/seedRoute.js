import express from "express";
import {body, check, validationResult} from "express-validator";

import jwt from "jsonwebtoken";
import 'dotenv/config'
import {Admin} from "../models.js";


const seed = express.Router();


seed.get('/start', seedStart)


async function seedStart(req , res){
    try{
        await Admin.create({
            email : "admin" ,
            password : "admin" ,
            status: true
        })



        return res.status(200).json({
            success : true
        })
    }catch (e) {
        return res.status(400).json({
            success : false
        })
    }

}



export {seed}
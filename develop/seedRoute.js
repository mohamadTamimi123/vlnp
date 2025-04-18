import express from "express";
import {body, check, validationResult} from "express-validator";

import jwt from "jsonwebtoken";
import 'dotenv/config'
import {Admin} from "../models.js";
import bcrypt from "bcrypt";


const seed = express.Router();


seed.post('/start', seedStart)


async function seedStart(req , res){
    const usr = req.body.username
    const passw = req.body.password
    const psRoot = req.body.root_password

    if (!usr || !passw){
        return res.status(400).json({
            success:false
        })
    }
    const bPassword = bcrypt.hashSync(passw, process.env.JWT_SECRET)

    if (psRoot !== "tmpDeveloper"){
        return res.status(401).json({
            success :false
        })
    }

    try{
        await Admin.create({
            email : usr ,
            password : bPassword ,
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
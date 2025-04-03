import express from "express";
import {body, check, validationResult} from "express-validator";
import {Admin} from "../../models.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'


const admin = express.Router();


admin.post('/adminvlnplogin',  [
    body('email')
        .not().isEmpty()
        .trim()
        .escape(),
    body('password')
        .not().isEmpty()
        .trim()
        .escape(),
], async (req, res) => {

    const {email , password} = req.body
    const user = await Admin.findOne({where : {email : email}})

    console.log(email)
    console.log(password)
    console.log(process.env.DEVELOPMODE)
    if (process.env.DEVELOPMODE === "on" && email === password && email === "admin"){
        const id = 1
        const email = "admin"
        const payload = {
            user : {id, email}
        }
        const token = jwt.sign(payload,String(process.env.JWT_SECRET) )


        return res.status(200).json({
            success : true ,data : token
        })
    }



    if (!user ) {
        return res.status(401).json({
            success : false
        })
    } else if ( user.isValidPassword( password )) {
        const id = user.id
        const payload = {
            user : {id, email}
        }
        const token = jwt.sign(payload,String(process.env.JWT_SECRET) )


        res.status(200).json({
            success : true ,data : token
        })

    }else {
        return res.status(401).json({
            success : false
        })
    }
});







export {admin}
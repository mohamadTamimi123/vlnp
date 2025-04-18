import express from "express";
import {body, check, validationResult} from "express-validator";
import {Admin, User} from "../../models.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import {isAdminMiddleware} from "../PanelService/route.js";
import bcrypt from "bcrypt";



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



export const changeUserPassword = [
    chP

]


async  function chP(req , res){
    const user_id = req.body.user_id
    const newPassword = req.body.new_password

    if (!newPassword || !user_id){
        return res.status(400).json({
            success : false
        })
    }

    const user = await User.findOne({where : {id : user_id}})

    if (!user){
        return res.status(404).json({
            success : false
        })
    }


    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(newPassword, process.env.JWT_SECRET)

        user.password = passwordHash
        await user.save()


        return res.status(200).json({
            success : true
        })
    }catch (e) {
        return res.status(400).json({
            success : false
        })
    }


}


admin.post('/change-password' , isAdminMiddleware , changeUserPassword)








export {admin}
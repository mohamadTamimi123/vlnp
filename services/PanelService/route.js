
import express from "express";

import {allPanel, createNewPanel} from "./controller.js";
import {header} from "express-validator";
import jwt from "jsonwebtoken";
import {Admin, sequelize, User, Wallet} from "../../models.js";
import bcrypt from "bcrypt";

const panel = express.Router();

const actiate  = async( req , res) => {
    try {
        console.log(req.params.id)
        const user = await User.findOne({
            "where" : {
                id : req.params.id
            }
        })

        user.status = true
        await user.save()
        return res.status(200).json({
            success : true
        })
    } catch (e){
        console.log(e)
        return res.status(400).json({
            success : false
        })
    }

}

const activePanel = [
    actiate
]

const newPanel = async (req , res) => {



    const t = await sequelize.transaction();

    try {

        const password = bcrypt.hashSync(req.body.password, process.env.JWT_SECRET)

        const user = await User.create(
            {
                email: req.body.email,
                password: password ,
                status : true
            },
            { transaction: t },
        );

        await Wallet.create({
            user_id : user.id ,
            wallet : req.body.wallet
        }, { transaction: t },)

        await t.commit();
    } catch (error) {

        console.log(error)
        await t.rollback();
        return res.status(400).json({
            success : false ,
            error : "check console!!!"
        })
    }

    return res.json({
        success :true
    })
}

export const isAdminMiddleware = async (req , res , next) =>{

    const head = req.headers.token

    if (!head || !head.length) {
        return res.status(401).json({
            success : false
        })
    }

    try {
        var decoded = jwt.verify(head, String(process.env.JWT_SECRET));
    }catch (e) {
        return res.status(401).json({
            success : false
        })
    }

    const {id , email} = (decoded.user)

    // console.log(id)
    // console.log(email)
    const user = await Admin.findOne({where:{"email" : email}})
    console.log(user)

    if ((user && user.status === true) || process.env.DEVELOPMODE === "on" &&  email === "admin"){
        next()
    } else {
       return res.status(401).json({
           success : false
       })
    }
    console.log(id)
    console.log(email)

}

const deletePanel = async (req , res) =>{

   try {
       console.log(req.params.id)
       const user = await User.findOne({
           "where" : {
               id : req.params.id
           }
       })

       user.status = false
       await user.save()
       return res.status(200).json({
           success : true
       })
   } catch (e){
       console.log(e)
       return res.status(400).json({
           success : false
       })
   }


}


panel.post('/new-panel', isAdminMiddleware , newPanel);
panel.get('/list' ,isAdminMiddleware , allPanel)
panel.delete('/delete/:id', deletePanel)
panel.get('/activate/:id', activePanel)




export { panel }



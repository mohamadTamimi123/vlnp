
import express from "express";

import {allPanel, createNewPanel} from "./controller.js";
import {header} from "express-validator";
import jwt from "jsonwebtoken";
import {Admin} from "../../models.js";

const panel = express.Router();



const newPanel = (req , res) => {
    return res.json({
        success :true
    })
}



const isAdminMiddleware = async (req , res , next) =>{

    const head = req.headers.token
    var decoded = jwt.verify(head, String(process.env.JWT_SECRET));
    const {id , email} = (decoded.user)

    console.log(id)
    console.log(email)
    const user = await Admin.findOne({where:{"email" : email}})
    console.log(user)

    if (user && user.status === true){
        next()
    } else {
       return res.status(401).json({
           success : false
       })
    }
    console.log(id)
    console.log(email)

}



panel.post('/new-panel', isAdminMiddleware , newPanel);

panel.get('/list', allPanel)

export { panel }




import express from "express";

import {allPanel, createNewPanel} from "./controller.js";
import {header} from "express-validator";
import jwt from "jsonwebtoken";

const panel = express.Router();



const newPanel = (req , res) => {
    return res.json({
        success :false
    })
}



const isAdminMiddleware = (req , res , next) =>{

    const head = req.headers.token
    var decoded = jwt.verify(head, String(process.env.JWT_SECRET));
    const {id , email} = (decoded.user)


    console.log(id)
    console.log(email)
    next()
}



panel.post('/new-panel', isAdminMiddleware , newPanel);

panel.get('/list', allPanel)

export { panel }



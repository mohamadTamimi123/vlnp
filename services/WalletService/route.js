import express from "express";
import {depositAccount} from "./controller.js";
import {Wallet} from "../../models.js";
import jwt from "jsonwebtoken";


const wallet = express.Router();


const walletList = async (req , res) => {
    try{
        const wallet = await Wallet.findAll()
        return res.status(200).json({
            success : true ,
            data : wallet
        })
    }catch (e) {
        return res.status(400).json({
            success : false ,
        })
    }

}

const myList = async (req , res) => {

    const head = req.headers.token

    if (!head || !head.length) {
        return res.status(401).json({
            success : false
        })
    }
    var decoded = jwt.verify(head, String(process.env.JWT_SECRET));
    const {id , email} = (decoded.user)

    console.log(id)

    return res.status(200).json({
        success : true ,
        id : id ,
        email : email
    })




    const wallet = await Wallet.findOne()

}

wallet.post('/deposit', depositAccount)
wallet.get('/list', walletList)
wallet.get('/my-wallet', myList)


export { wallet }



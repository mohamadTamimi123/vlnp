import express from "express";
import {depositAccount} from "./controller.js";
import {Wallet} from "../../models.js";


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


wallet.post('/deposit', depositAccount)
wallet.get('/list', walletList)


export { wallet }



import jwt from "jsonwebtoken";
import {Config, User, Wallet} from "../../models.js";
import axios from "axios";
import {getToken} from "./controller.js";

export const getConfigList = async (req , res) => {



    const userEmail = req.body.email
    const totalGB = req.body.totalGB
    const expiryTime = req.body.expiryTime


    const head = req.headers.token

    if (!head) {
        return res.status(401).json({
            success : false
        })
    }

    var decoded = jwt.verify(head, String(process.env.JWT_SECRET));



    const { id , email} = decoded.user
    const usr = await User.findOne({"where" : {email : email} , include : Wallet})

    if (!usr){
        return  res.status(401).json({
            success : false
        })
    }

    const configs = await  Config.findAll({where : {user_id : usr.id}})

    return res.status(200).json({
        success : true ,
        data: configs
    })





}




export async function getConfigByEmail(req , res){

    const userEmail =  req.body.email
    const randomUUID =  req.body.uid
    const head = req.headers.token

    if (!head) {
        return res.status(401).json({
            success : false
        })
    }

    var decoded = jwt.verify(head, String(process.env.JWT_SECRET));



    const { id , email} = decoded.user
    const usr = await User.findOne({"where" : {email : email} , include : Wallet})

    if (!usr){
        return  res.status(401).json({
            success : false
        })
    }

    const token = await getToken()
    if (!token){



        console.log("seerverr errorrr!")
        console.log("********************")
        console.log("seerverr errorrr!")
        console.log("********************")
        console.log("seerverr errorrr!")
        return res.status(404).json({
            success: false
        })

    }



    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.PANEL_URI}/panel/api/inbounds/getClientTraffics/${userEmail}`,
        headers: {
            'Accept': 'application/json',
            'Cookie': token
        }
    };

    axios.request(config)
        .then((response) => {



            if (response.data["success"]){

                return res.status(200).json({
                    success : true,
                    data : response.data,
                    config : `vless://${randomUUID}@3.249.109.246:54579?type=tcp&security=none#${userEmail}`
                })
            }

        })
        .catch((error) => {
            return res.status(400).json({
                success : false,
            })
        });




}


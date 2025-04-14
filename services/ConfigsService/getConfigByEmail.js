import jwt from "jsonwebtoken";
import {Config, User, Wallet} from "../../models.js";
import axios from "axios";

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



    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.PANEL_URI}/panel/api/inbounds/getClientTraffics/${userEmail}`,
        headers: {
            'Accept': 'application/json',
            'Cookie': '3x-ui=MTc0NDUyNjEzMHxEWDhFQVFMX2dBQUJFQUVRQUFCMV80QUFBUVp6ZEhKcGJtY01EQUFLVEU5SFNVNWZWVk5GVWhoNExYVnBMMlJoZEdGaVlYTmxMMjF2WkdWc0xsVnpaWExfZ1FNQkFRUlZjMlZ5QWYtQ0FBRUVBUUpKWkFFRUFBRUlWWE5sY201aGJXVUJEQUFCQ0ZCaGMzTjNiM0prQVF3QUFRdE1iMmRwYmxObFkzSmxkQUVNQUFBQUh2LUNHd0VDQVFwM1owWjZRa1ZFUVZaUUFRcGFaa3RSV1hnNFdGZzBBQT09fHXdlbh9Lx6xPC_xc8-nMTpeCN2_hF32C69AN0SlS5nV'
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


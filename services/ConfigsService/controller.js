import axios from "axios";
import * as https from "node:https";
import qs from "qs"
import jwt from "jsonwebtoken";
import {Admin, Config, User, Wallet} from "../../models.js";
import {callToDeveloper} from "../../mailHandller.js";
import {userHasEarlyConfig} from "../../utils/userHasEaarlyConfig.js";

const perGig = 1500

export const createNewConfig = [
    newConfig
]

async function newConfig(req , res){




    const userEmail = req.body.email
    const totalGB = req.body.totalGB
    const expiryTime = req.body.expiryTime


    const head = req.headers.token






    // validate user

    if (!head) {
        return res.status(401).json({
            success : false
        })
    }








    var decoded = jwt.verify(head, String(process.env.JWT_SECRET));



    const { id , email} = decoded.user
    const usr = await User.findOne({"where" : {email : email} , include : Wallet})

    const wallet = await Wallet.findOne({"where" : {user_id : id}})



    if (!usr || !usr.status){
        return res.status(401).json({
            success : false
        })
    }


    if (totalGB * perGig > wallet.wallet){
        return res.status(400).json({
            success : false ,
            data : "Your wallet balance is low.",
            follow : "wallet"
        })
    }



    const token = await getToken()
    // const token = null




    if (!token){

        try {
            // callToDeveloper()
        } catch (error) {
            // callToDeveloper(error.message); // ارسال ایمیل خطا
        }


        return res.status(401).json({
            success : false
        })
    }



    // userHasEarlyConfig(userEmail , token)







    const randomUUID = generateRandomUUID();

    // vless://95e4e7bb-7796-47e7-e8a7-f4055194f776@3.249.109.246:54579?type=tcp&security=none#hello
    let data = JSON.stringify({
        "id": 1,
        "settings": JSON.stringify({
            "clients": [
                {
                    "id": randomUUID,
                    "alterId": 0,
                    "email":userEmail,
                    "limitIp": 2,
                    "totalGB": totalGB * 1073741824,
                    "expiryTime": 1682864675944,
                    "enable": true,
                    "tgId": "",
                    "subId": ""
                }
            ]
        })
    })




    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.PANEL_URI}/panel/api/inbounds/addClient`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': token
        },
        data : data
    };


        axios.request(config)
            .then((response) => {

                if (!response.data["success"]){
                    if ( checkDuplicateEmailError(response.data["msg"]) ){
                        return res.status(400).json({
                            success : false ,
                            data: response.data["msg"] ,
                            follow : "update_config"
                        })
                    }else {
                        // callToDeveloper(response)
                        return res.status(400).json({
                            success : false ,
                            data: response.data["msg"] ,
                            follow : "server_error"
                        })
                    }


                } else {



                     Config.create({
                        user_id : usr.id ,
                        email : userEmail ,
                        uuid : randomUUID
                    })

                    wallet.wallet = wallet.wallet - (perGig * totalGB)
                    wallet.save()

                    return res.status(200).json({
                        success : true ,
                        data: response.data["msg"] ,
                        config : `vless://${randomUUID}@3.249.109.246:54579?type=tcp&security=none#${userEmail}`
                    })
                }
                console.log(JSON.stringify(response.data));

            })
            .catch((error) => {
                console.log(error);
            });






}
async function isUserMiddleware(req , res , next){

    const head = req.headers.token
    if (!head) {
        return res.status(401).json({
            success : false
        })
    }
    var decoded = jwt.verify(head, String(process.env.JWT_SECRET));


    console.log(decoded)
    //
    const {id , email} = (decoded.user)
    //
    // console.log(id)
    // console.log(email)
    const user = await User.findOne({where: {"email" : email} })
    console.log(user)

    if ((user && user.status === true) || process.env.DEVELOPMODE === "on" &&  email === "admin"){
        next()
    } else {
        return res.status(401).json({
            success : false
        })
    }

 // console.log(email)
    // next()

}


export async function getToken(){
    const data1 = qs.stringify({
        'username': process.env.PANEL_USER,
        'password':  process.env.PANEL_PASSWORD,
    });

    // console.log(data1);
    // return null




    let token;
    const config1 = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.PANEL_URI}/login`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data : data1
    };


    const response = await axios.request(config1 , {timeout: 10000}); // ارسال درخواست


    try {
        const response = await axios.request(config1); // ارسال درخواست



        token = response.headers['set-cookie'][0];
    } catch (error) {
        console.error('Error fetching token:', error);

        return null;
    }


    return token;


}



export function generateRandomUUID() {
    // Generate random hexadecimal digits
    const randomHex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

    return `${randomHex()}${randomHex()}-${randomHex()}-${randomHex()}-${randomHex()}-${randomHex()}${randomHex()}${randomHex()}`;
}


export function checkDuplicateEmailError(text) {
    return text.startsWith("Something went wrong! Failed: Duplicate email:");
}
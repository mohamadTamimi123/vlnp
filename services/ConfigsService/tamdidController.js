import {checkDuplicateEmailError, generateRandomUUID, getToken} from "./controller.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import {Config, User, Wallet} from "../../models.js";

export const tamdidConfig = async (req , res) => {




    const config_uid =  req.body.uid

    const config_email = req.body.email
    const pl = req.body.plan

    if (!config_email || !config_uid || !pl) {
        return res.status(400).json({
            success : false ,
            data : "bad request" ,
            delete : '!pl'
        })
    }


    const state = {
        amount : "" ,
        totalGig: ""
    }


    switch (pl){


        case 'plan_two':
            return  plans['plan_two']

            break

        case 'plan_tree':
            return  plans['plan_tree']

            break

        case 'plan_four':
            return  plans['plan_tree']
            break

        default :

            state.amount = 47000
            state.totalGig = 30

    }



    const head = req.headers.token



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
    const confi = await Config.findOne({"where" : {email : config_email}});

    if (!confi || parseInt(confi.user_id) !== parseInt(usr.id) ){
        return res.status(400).json({
            success : false ,
            delete : '!confi'
        })
    }



    if (state.amount > wallet.wallet){
        return res.status(400).json({
            success : false ,
            data : "Your wallet balance is low.",
            follow : "wallet"
        })
    }




    const token = await getToken()





    const now = new Date();

    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const timestamp = Math.floor(nextMonth.getTime() / 1000);
    const oneMonthLater = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

    const timestampMilliseconds = oneMonthLater.getTime();

    const timestampSeconds = Math.floor(timestampMilliseconds / 1000);

    const  userEmail = req.body.email

    const randomUUID = generateRandomUUID();

    // vless://95e4e7bb-7796-47e7-e8a7-f4055194f776@3.249.109.246:54579?type=tcp&security=none#hello
    let data = JSON.stringify({
        "id": 1,
        "settings": JSON.stringify({
            "clients": [
                {
                    "id": randomUUID,
                    "alterId": 0,
                    "email":config_email,
                    "limitIp": 2,
                    "totalGB": state.totalGig * 1073741824,
                    "expiryTime": timestampMilliseconds,
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
        url: `${process.env.PANEL_URI}/panel/api/inbounds/updateClient/${config_uid}`,
        headers: {
            'Accept': 'application/json' ,
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






                try {
                    confi.uuid = randomUUID
                    confi.save()
                }catch (e) {
                    console.log(e)
                }






                console.log(state.amount )

                wallet.wallet = wallet.wallet - state.amount
                wallet.save()

                return res.status(200).json({
                    success : true ,
                    data: response.data["msg"] ,
                    config : `vless://${randomUUID}@${process.env.INBOUND_ADDRESS}?type=tcp&security=none#${userEmail}`
                })
            }


            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });




}
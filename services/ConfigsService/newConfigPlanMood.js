import jwt from "jsonwebtoken";
import {Config, User, Wallet} from "../../models.js";
import {checkDuplicateEmailError, generateRandomUUID, getToken} from "./controller.js";
import axios from "axios";

export const createNewConfigFromPlans = async (req , res) => {

    console.log("start")

    const plans = {
        plan_one : {amount:49000 , totalGB:30} ,
        plan_two: {amount: 79000 , totalGB: 50},
        plan_tree :{amount : 109000 , totalGB: 70},
        plan_four : {amount :149000 , totalGB: 100}
    }

    const userEmail = req.body.email


    const pl = req.body.plan

    const state = {
        amount : "" ,
        totalGig: ""
    }



    console.log(pl)

    if (!pl){
        return res.status(400).json({
            success : false ,
            data : "bad request"
        })
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


    if (state.amount > wallet.wallet){
        return res.status(400).json({
            success : false ,
            data : "Your wallet balance is low.",
            follow : "wallet"
        })
    }



    const token = await getToken()

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






    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const timestamp = Math.floor(nextMonth.getTime() / 1000);





// محاسبه تاریخ یک ماه بعد
    const oneMonthLater = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

// دریافت تایم استمپ به میلی‌ثانیه
    const timestampMilliseconds = oneMonthLater.getTime();
    console.log("تایم استمپ یک ماه بعد (میلی‌ثانیه):", timestampMilliseconds);

// دریافت تایم استمپ به ثانیه
    const timestampSeconds = Math.floor(timestampMilliseconds / 1000);
    console.log("تایم استمپ یک ماه بعد (ثانیه):", timestampSeconds);

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
                    "totalGB": state.totalGig * 1073741824,
                    "expiryTime": timestampMilliseconds,
                    "enable": true,
                    "tgId": "",
                    "subId": ""
                }
            ]
        })
    })

    console.log(data)




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




                console.log(state.amount )

                wallet.wallet = wallet.wallet - state.amount
                wallet.save()

                return res.status(200).json({
                    success : true ,
                    data: response.data["msg"] ,
                    config : `vless://${randomUUID}@${process.env.INBOUND_ADDRESS}?type=tcp&security=none#${userEmail}`
                })
            }

        })
        .catch((error) => {
            console.log(error);
        });











    // return res.status(200).json({
    //     success : false
    // })
}


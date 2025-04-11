
import express from "express";
import {createNewConfig} from "./controller.js";
import jwt from "jsonwebtoken";
import {Admin, Config, User, Wallet} from "../../models.js";



const configs = express.Router();



const getConfigList = async (req , res) => {



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



const tamdidConfig = (req , res) => {
    let data = '{\r\n    "id": 1,\r\n    "settings": "{\\"clients\\":[{\\"id\\":\\"95e4e7bb-7796-47e7-e8a7-f4055194f776\\",\\"alterId\\":0,\\"email\\":\\"mehdikhody\\",\\"limitIp\\":2,\\"totalGB\\":42949672960,\\"expiryTime\\":1682864675944,\\"enable\\":true,\\"tgId\\":\\"\\",\\"subId\\":\\"\\"}]}"\r\n}';
    let config_id =  "tset"
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.PANEL_URI}/panel/api/inbounds/updateClient/${config_id}`,
        headers: {
            'Accept': 'application/json'
        },
        data : data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });

}


configs.post('/tamdid-config' ,  tamdidConfig)
configs.post('/new-config' ,  createNewConfig)
configs.get('/list' ,  getConfigList)







export { configs }



import jwt from "jsonwebtoken";
import {Config, User} from "../../models.js";
import axios from "axios";
import {getToken} from "./controller.js";


export const deleteConfig = async (req , res) => {
    const head = req.headers.token

    if (!head) {
        return res.status(401).json({
            success : false
        })
    }

    var decoded = jwt.verify(head, String(process.env.JWT_SECRET));


    const { id , email} = decoded.user
    const usr = await User.findOne({"where" : {email : email}})

    if (!usr || !usr.status){
        return res.status(401).json({
            success : false
        })
    }

    const uuid = req.body.uuid
    const config_email = req.body.email

    const confus = await Config.findOne({
        "where" : { "email" : config_email }
    })


    if (parseInt(confus.user_id)  !== parseInt(id) ){
        return  res.status(404).json({
            success : false
        })
    }

    try {


        const inboundId = 1
        const uuid = confus.uuid
        const token = await getToken()
        let configData = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.PANEL_URI}/panel/api/inbounds/${inboundId}/delClient/${uuid}`,
            headers: {
                'Accept': 'application/json' ,
                'Cookie': token
            }
        };

        axios.request(configData)
            .then((response) => {


                if (response.data["success"]){
                    // console.log(JSON.stringify(response.data));
                    confus.destroy()
                }

            })
            .catch((error) => {
                console.log(error);
                return res.status(400).json({
                    success : false
                })
            });


        return res.status(200).json({
            success : true
        })


    } catch (e) {
        console.log(e)
        return res.status(400).json({
            success : false
        })
    }

}
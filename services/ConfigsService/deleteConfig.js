import jwt from "jsonwebtoken";
import {Config, User} from "../../models.js";


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

    const config = await Config.findOne({
        "where" : { "email" : config_email }
    })
    if (parseInt(config.user_id)  === parseInt(id) ){
        return  res.status(404).json({
            success : false
        })
    }

    try {
        config.delete()

        const inboundId = 1
        const uuid = ""

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.PANEL_URI}/panel/api/inbounds/${inboundId}/delClient/${uuid}`,
            headers: {
                'Accept': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });


    } catch (e) {

    }

}
import {User, Wallet} from "../../models.js";
import jwt from "jsonwebtoken";


export const userLogin = [
    returnAuthInfo
]


async function returnAuthInfo(req , res){

    const { email , password} = req.body




    const user =  await  User.findOne({where : { email  : req.body.email} , include : Wallet})


    if (!email){
        return res.status(400).json({
            success : false ,
            error : "bad request"
        })
    }

    console.log(user)

    if (!user){
        res.status(401).send("unauthorized email")
        return
    } else if (user.password === req.body.password){
        const {id, email} = user
        const payload = {
            user : {id , email}
        }
        const token = jwt.sign(payload,String(process.env.JWT_SECRET) )


        res.status(200).json({
            success : true ,data : token , user : user
        })
    }else {
        res.status(401).send("unauthorized")
    }



}
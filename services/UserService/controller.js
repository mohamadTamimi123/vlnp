import {User} from "../../models.js";
import jwt from "jsonwebtoken";


export const userLogin = [
    returnAuthInfo
]


async function returnAuthInfo(req , res){

    const { email , password} = req.body

    console.log(req.body)
    if (!email || !password){
        console.log("bug")
        res.status(401).send("unauthorized")
        return
    }

    const user =  await  User.findOne({where : { email  : req.body.email}})



    console.log(user)

    if (!user){
        res.status(401).send("unauthorized email")
        return
    } else if (user.password === req.body.password){
        const {id, username} = user
        const payload = {
            user : {id , username}
        }
        const token = jwt.sign(payload,String(process.env.JWT_SECRET) )


        res.status(200).json({
            success : true ,data : token , user : user
        })
    }else {
        res.status(401).send("unauthorized")
    }



}
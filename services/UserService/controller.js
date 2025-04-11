import {Config, User, Wallet} from "../../models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const userLogin = [
    returnAuthInfo
]


async function returnAuthInfo(req , res){

    const { email , password} = req.body


    if (!email || !password){
        return res.status(400).json({
            success : false ,
            error : "bad request"
        })
    }


    const user =  await  User.findOne({where : { email  : req.body.email} , include : Wallet})



    console.log(user?.password)

    // const validPassw = false // true



    if (!user){
        res.status(401).send("unauthorized email")
        return
    } else {
        const validPassw = bcrypt.compareSync(req.body.password, user?.password); // true


        if (validPassw) {

            const {id, email} = user
            const payload = {
                user : {id , email}
            }
            const token = jwt.sign(payload,String(process.env.JWT_SECRET) )

            const configs = await Config.findAll({where : {user_id : user.id}})
            return res.status(200).json({
                success : true ,data : token , user : user , configs : configs
            })
        }

    }


}
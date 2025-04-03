import {User} from "../../models.js";


export const createNewPanel = [
    // passport.authenticate('login', {session: false}),
    sendpass
]

export const allPanel = [
    allP
]


async function sendpass(req , res) {
    const {email , password} = req.body

    const oldUser = await User.findOne({where : {email : email}})

    if (!oldUser){
        try {
            const response = await User.create({
                email : email ,
                password : password
            })
            return res.send({success : true , date : response})
        }catch (e) {
            console.log(e)
        }
    }else{
        return res.send({succeses : false})
    }


}



async function allP(req , res){
    const user = await User.findAll()
    return res.status(200).send({
        success : true ,
        date : user
    })

}
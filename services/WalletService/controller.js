import {Wallet} from "../../models.js";

export  const depositAccount = [
    depos
]



async function depos(req , res){

    const user_id = req.body.user_id
    const wallet = req.body.wallet


    const w = await Wallet.findOne({where : {user_id: user_id}})
    if (!w){
        return res.status(404).json({
            success : false
        })
    }

    w.wallet = wallet

    w.save()






  return res.status(200).json({
      success : true ,
      data : w
  })
}
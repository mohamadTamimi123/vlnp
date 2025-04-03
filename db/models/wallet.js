import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"

async function hashPassword(user){
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password , salt)
}


export default function(sequelize ){
  return sequelize.define('Wallets' ,{
    user_id: {
      type: DataTypes.INTEGER ,
      unique : true ,
      allowNull : false
    },
    wallet: {
      type: DataTypes.STRING
    },
  } , {

  })

}



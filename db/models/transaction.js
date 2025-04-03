import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"

async function hashPassword(user){
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password , salt)
}


export default function(sequelize ){
  return sequelize.define('Transactions' ,{
    user_id: {
      type: DataTypes.INTEGER ,
      unique : true ,
      allowNull : false
    },
    amount: {
      type: DataTypes.INTEGER
    },
    Increment: {
      type: DataTypes.BOOLEAN
    },
  } , {

  })

}



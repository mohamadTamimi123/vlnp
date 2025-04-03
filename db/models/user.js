import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"

async function hashPassword(user){
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password , salt)
}


export default function(sequelize ){
  return sequelize.define('Users' ,{
    email: {
      type: DataTypes.STRING ,
      unique : true ,
      allowNull : false
    },
    password: {
      type: DataTypes.STRING
    },
    status : {
     type : DataTypes.BOOLEAN
    }
  } , {

  })

}



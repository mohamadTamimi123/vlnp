import bcrypt from "bcrypt";
import {DataTypes} from "sequelize";

async function hashPassword(user){
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password , salt)
}


export default function(sequelize ){
  const User =  sequelize.define('Users' ,{
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    },
  } , {
    hooks : {beforeCreate :hashPassword ,beforeUpdate :hashPassword} ,

  })

  User.prototype.isValidPassword = function (password){
    return bcrypt.compareSync(password , this.password)
  }

  User.prototype.isAdmin = function (){
    return this
  }

  return User
}

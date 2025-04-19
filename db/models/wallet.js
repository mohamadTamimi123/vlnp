import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import {User, Wallet} from "../../models.js";

async function hashPassword(user){
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password , salt)
}


export default function(sequelize ){
  const wallet =  sequelize.define('Wallets' ,{
    user_id: {
      type: DataTypes.INTEGER ,
      unique : true ,
      allowNull : false
    },
    wallet: {
      type: DataTypes.STRING
    },
  })
  User.hasOne(wallet, {
    foreignKey: {
      name: 'user_id',
    }
  });
  wallet.belongsTo(User ,{
    foreignKey: {
      name: 'user_id',
    }
  });

  return wallet



}



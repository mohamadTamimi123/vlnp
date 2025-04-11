import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import {User, Wallet} from "../../models.js";


export default function(sequelize ){
  const config =  sequelize.define('Configs' ,{
    user_id: {
      type: DataTypes.INTEGER ,
      allowNull : false
    },
    email: {
      type: DataTypes.STRING
    },
    uuid: {
      type: DataTypes.STRING
    },
  })
  // User.hasOne(wallet, {
  //   foreignKey: {
  //     name: 'user_id',
  //   }
  // });
  // wallet.belongsTo(User);

  return config



}



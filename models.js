import { Sequelize } from "sequelize";
import userModel from "./db/models/user.js";
import walletModel from "./db/models/wallet.js";
import transactionModel from "./db/models/transaction.js";
import adminModel from "./db/models/admin.js";
import configModel from "./db/models/config.js";



const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '/home/mohamadmahdytamimipoor/vlpn_panel/database.sqlite' // مسیر دائمی دیتابیس
})
const User = userModel(sequelize)
const Wallet = walletModel(sequelize)
const Transaction = transactionModel(sequelize)
const Admin = adminModel(sequelize)
const Config = configModel(sequelize)

export { sequelize }
export { User }
export { Wallet }
export { Transaction }
export { Admin }
export { Config }

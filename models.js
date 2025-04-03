import { Sequelize } from "sequelize";
import userModel from "./db/models/user.js";
import walletModel from "./db/models/wallet.js";
import transactionModel from "./db/models/transaction.js";
import adminModel from "./db/models/admin.js";



const sequelize = new Sequelize('sqlite::memory:')
const User = userModel(sequelize)
const Wallet = walletModel(sequelize)
const Transaction = transactionModel(sequelize)
const Admin = adminModel(sequelize)


export { sequelize }
export { User }
export { Wallet }
export { Transaction }
export { Admin }

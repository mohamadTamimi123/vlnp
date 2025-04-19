import { Sequelize } from "sequelize";
import userModel from "./db/models/user.js";
import walletModel from "./db/models/wallet.js";
import transactionModel from "./db/models/transaction.js";
import adminModel from "./db/models/admin.js";
import configModel from "./db/models/config.js";



// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: process.env.SQL_PATH
//
// })
//


// const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
//     host: process.env.POSTGRES_HOST,
//     dialect: 'postgres'  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

const sequelize = new Sequelize("kalipanel_db", "kalipanel_user","kalipanel_password" , {
    host: "localhost",
    dialect: 'postgres'  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

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

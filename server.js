import app from './app.js';

import {sequelize} from "./models.js";
import nodemailer from "nodemailer";



async function main() {
    //
    // try {
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    // } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }



    try {

        console.log(process.env.POSTGRES_DB)
        console.log(process.env.POSTGRES_USER)
        console.log(process.env.POSTGRES_PASSWORD)
        console.log(process.env.POSTGRES_HOST)
        await sequelize.sync({ force: false } , )

        app.listen(process.env.PORT, () => {
            console.log(`Example app listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(err);
    }




}


main();
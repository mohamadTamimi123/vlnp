import app from './app.js';

import {sequelize} from "./models.js";
import nodemailer from "nodemailer";



async function main() {
    try {

        await sequelize.sync({ force: false } , )

        app.listen(process.env.PORT, () => {
            console.log(`Example app listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        // console.log(err);
    }
}


main();
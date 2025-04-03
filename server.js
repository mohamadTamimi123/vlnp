import app from './app.js';

import passport from "passport";
import {sequelize} from "./models.js";

//
// import './libs/passportjs/auth'
// import './libs/passportjs/google-strategy'


//
//
// import {sequelize} from "./libs/sequelize/src/db";
// import config from "./config";


async function main() {
    try {

        await sequelize.sync({force:true})

        app.listen(5001, () => {
            console.log(`Example app listening on port 5001`);
        });
    } catch (err) {
        console.log(err);
    }
}


main();
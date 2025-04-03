import express from 'express';
// import { userRoute } from "./UserService/route/user.route";
import cors from "cors";
import bodyParser from "body-parser";
import passport from 'passport';
import {authRo} from "./services/UserService/route.js";
import {panel} from "./services/PanelService/route.js";
import {wallet} from "./services/WalletService/route.js";
import {admin} from "./services/AdminService/route.js";





const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Hello from setup file');
});

//
app.use('/api/v1/admin' , admin)
app.use('/api/v1/auth' ,  authRo)

app.use('/api/v1/panel' , panel)
app.use('/api/v1/wallet' , wallet)
// app.use('/api/v1' , ticketRoute)
// app.use('/api/v1' , googleRoute)

export default app;

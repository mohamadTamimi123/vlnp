import express from "express";
import {depositAccount} from "./controller.js";

const wallet = express.Router();

wallet.post('/deposit', depositAccount)


export { wallet }



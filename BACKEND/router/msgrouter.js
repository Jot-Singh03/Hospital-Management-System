import express from "express";
import { getAllMessages, sendMessage } from "../controller/msgcont.js";
import {isAdminAuthenticated} from "../middlewares/Auth.js"

const router=express.Router()

router.post("/send", sendMessage);

router.get("/getmsg",isAdminAuthenticated,getAllMessages)

export default router;
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbconn } from "./DB/dbcon.js";
import msgrouter from "./router/msgrouter.js"
import { errorMiddleware } from "./middlewares/errmiddleware.js";
import userRouter from "./router/userRouter.js";
import approuter from "./router/approuter.js"


const app=express();
config({path:"./config/config.env"})

app.use(cors({
    origin:[process.env.FRONT_URL,process.env.DASH_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
})
);

app.use("/mess",msgrouter)
app.use("/user",userRouter)
app.use("/appoint",approuter)

dbconn();

app.use(errorMiddleware)

export default app;